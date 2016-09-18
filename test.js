/**
 * @fileoverview Tests
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */

var assert = require('chai').assert;
var bitset = require('./index');

describe('bitset.js', function() {
  describe('getStateObject', function() {
    it('Creates an object contained all enlisted states as keys and powers of 2 as values', function() {
      var state = bitset.getStateObject('FIRST', 'SECOND', 'THIRD', 'FOURTH');
      var cleanKeys = Object.keys(state).filter(function(key) {
        return ['ALL', 'NONE'].indexOf(key) === -1;
      });

      var stateValues = cleanKeys.map(function(key) {
        return state[key];
      });

      assert.sameMembers(stateValues, [0x01, 0x02, 0x04, 0x08]);
    });

    it('Appends shortcuts to accessing all and none states', function() {
      var state = bitset.getStateObject();
      assert(Object.keys(state).length === 2);
      assert.sameMembers(Object.keys(state), ['ALL', 'NONE']);
      assert(state.ALL === 255);
      assert(state.NONE === 0);
    });
  });

  describe('hasState', function() {
    it('Returns true if state includes given bitmask', function() {
      assert(bitset.hasState(0x01 | 0x02, 0x01));
      assert(bitset.hasState(0xFF, 0x04));
    });

    it('Returns false if state doesn\'t include given bitmask', function() {
      assert(!bitset.hasState(0x02, 0x01));
      assert(!bitset.hasState(0x04, 0x02));
      assert(!bitset.hasState(0x00, 0xFF));
    });
  });

  describe('addState', function() {
    it('Returns new state with given bitmask included', () => {
      assert(bitset.addState(0x00, 0x01) === 0x01);
      assert(bitset.addState(0x00, 0x02) === 0x02);
      assert(bitset.addState(0x01, 0x04) === 0x05);
      assert(bitset.hasState(bitset.addState(0x01, 0x04), 0x01));
      assert(bitset.hasState(bitset.addState(0x01, 0x04), 0x04));
    });

    it('Adds multiple states', function() {
      assert(bitset.addState(0x00, 0x01, 0x02, 0x04) === 0x07);
    });
  });

  describe('deleteState', function() {
    it('Returns new state with given bitmask excluded', function() {
      assert(bitset.deleteState(0x05, 0x01) === 0x04);
      assert(bitset.deleteState(0x02, 0x02) === 0x00);
    });

    it('If bitmask hasn\'t been included before deletion state doesn\'t change', function() {
      assert(bitset.deleteState(0x08, 0x02) === 0x08);
    });
  });

  describe('toggleState', function() {
    it('Switches state', function() {
      var initialState = 0x01;
      var updatedState = bitset.toggleState(initialState, 0x02);
      var restoredState = bitset.toggleState(updatedState, 0x02);

      assert(updatedState === 0x03);
      assert(restoredState === 0x01);
    });
  });
});
