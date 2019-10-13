class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {return throwError};
        this.config = config;
        this.initial = config.initial;
    }
 
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.config.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.config.states.hasOwnProperty(state) ? 
        this.config.initial = state : (throwError (`The state ${state} isn't exist`));
         
        
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */

    trigger(event) {

        let influenceEvent =  this.config.states[`${this.config.initial}`].transitions[event];
        this.changeState(influenceEvent);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let tempArr = Object.keys(this.config.states);

        return (!event) ? tempArr : tempArr.filter(elem => this.config.states[elem].transitions[event]);
   
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
