/**
 * @fileoverview Functions to work with bitsets in JavaScript
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */

'use strict';

module.exports = {
  /**
   * Returns an object with given values as keys and corresponding powers of two
   * as values. Also adds two shortcut states which allows to add, remove
   * or check all existing states
   * @param {...string} var_names
   * @return {Object.<string, number>}
   */
  getStateObject: function(var_names) {
    var names = [].slice.call(arguments, 0);
    var objToExport = {
      'NONE': 0x00,
      'ALL': 0xFF
    };

    names.forEach(function (name, i) {
      objToExport[name] = Math.pow(2, i);
    });

    return objToExport;
  },

  /**
   * @param {number} componentState
   * @param {number} state
   * @return {boolean}
   */
  hasState: function (componentState, state) {
    return Boolean(componentState & state);
  },

  /**
   * @param {number} currentState
   * @param {...number} var_stateToAdd
   * @return {number}
   */
  addState: function (currentState, var_stateToAdd) {
    return [].slice.call(arguments, 1).reduce(function (prevState, state) {
      return prevState | state;
    }, currentState);
  },

  /**
   * @param {number} currentState
   * @param {number} stateToDelete
   * @return {number}
   */
  deleteState: function (currentState, stateToDelete) {
    return currentState & ~stateToDelete;
  },

  /**
   * @param {number} currentState
   * @param {number} stateToSwitch
   * @return {number}
   */
  toggleState: function (currentState, stateToSwitch) {
    return currentState ^ stateToSwitch;
  }
};
