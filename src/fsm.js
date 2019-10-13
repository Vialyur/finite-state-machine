const config = {
    initial: 'normal',
    states: {
        normal: {
            transitions: {
                study: 'busy',
            }
        },
        busy: {
            transitions: {
                get_tired: 'sleeping',
                get_hungry: 'hungry',
            }
        },
        hungry: {
            transitions: {
                eat: 'normal'
            },
        },
        sleeping: {
            transitions: {
                get_hungry: 'hungry',
                get_up: 'normal',
            },
        },
    }
};



class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {return throwError ('The config is not passed.')};
        this._config = config;
        this._state = config.initial;
        this._historyArr = [];
        this._historyElemIndex = -1;
        
    }

  


 
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this._config.states.hasOwnProperty(state) ? 
        this._state = state : (throwError (`The state ${state} isn't exist`));
         
        
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */

    trigger(event) {

        let influenceEvent =  this._config.states[this._state].transitions[event];
        this.changeState(influenceEvent);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this._config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let tempArr = Object.keys(this._config.states);

        return (!event) ? tempArr : tempArr.filter(elem => this._config.states[elem].transitions[event]);
   
    }




    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */





    undo() {

        if (this._historyElemIndex === -1) {
            return false
        };
        
        this._historyElemIndex--;

      return true;

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
