class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        if (typeof config == 'undefined') throw new Error("throws an exception if config isn\'t passed");
        this.config = config;
        this.state = this.config['initial'];
        this.historyStates = [];
        this.currentStepHistory = 0;
        this.triggerRealize = false;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        // console.log(this.config);
        let answer;
        answer = this.state;

        return answer;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        let arr = Object.keys(this.config['states']);
        if (arr.indexOf(state) < 0) throw new Error("throws an exception if state isn\'t exist");

/*         console.log('********* changeState1 *********');
        console.log(this.historyStates);
        console.log(this.currentStepHistory);  */
        
        this.historyStates.length = this.currentStepHistory+1;
        if(this.historyStates[this.currentStepHistory] !== this.state) this.historyStates.push(this.state);
        this.currentStepHistory++;
        this.state = state; // get value from config

/*         console.log('********* changeState2 *********');
        console.log(this.historyStates);
        console.log(this.currentStepHistory);  */
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.triggerRealize = false;
        let possibleWay = this.config['states'];
        let newState = possibleWay[this.state]['transitions'][event];

/*         console.log('********* trigger 1 *********');
        console.log(this.historyStates);
        console.log(this.currentStepHistory);  */

        if (typeof newState !== 'undefined') {
            // this.previouslyState = this.state;
            if(this.historyStates[this.currentStepHistory] !== this.state) this.historyStates.push(this.state);
            this.currentStepHistory++;
            this.state = newState;
            this.triggerRealize = true;

/*             console.log('********* trigger 2 *********');
            console.log(this.historyStates);
            console.log(this.currentStepHistory);  */
        }
        else throw new Error("throws an exception if event in current state isn\'t exist");
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {

        this.state = this.config['initial'];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let answer;
        let arr = [];

        if (typeof event == 'undefined') arr = Object.keys(this.config['states']);

        let possibleWay = this.config['states'];

        for (let key in possibleWay) {
            for (let key2 in possibleWay[key]['transitions']) {
                if (key2 == event) arr.push(key);
            }
        }

        answer = arr;
        return answer;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        let answer;

        if (this.currentStepHistory == 0) answer = false;
        else {
/*             console.log('********* undo 1 *********');
            console.log('this.currentStepHistory');
            console.log(this.currentStepHistory);
            console.log('this.historyStates');
            console.log(this.historyStates);
            console.log('this.state');
            console.log(this.state);  */
            
            if(this.historyStates[this.currentStepHistory] !== this.state) this.historyStates.push(this.state);
            // this.historyStates.push(this.state);
            this.state = this.historyStates[this.historyStates.length - 2];
            this.currentStepHistory--;
            answer = true;

/*             console.log('********* undo 2 *********');
            console.log(this.historyStates);
            console.log(this.currentStepHistory);
            console.log('this.state');
            console.log(this.state);  */
        }

        return answer;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        let answer;
        if (this.historyStates.length == 0) answer = false;
         else  answer = true;

/*         console.log('********* redo 1 *********');
        console.log(this.historyStates);
        console.log(this.currentStepHistory);
        console.log('this.state');
        console.log(this.state); */

        // console.log('this.currentStepHistory = ' + this.currentStepHistory);
        //console.log('this.historyStates.length = ' + this.historyStates.length);  

        if(this.currentStepHistory + 1 < this.historyStates.length ) {
        this.state = this.historyStates[this.currentStepHistory + 1];
        this.currentStepHistory++;} else answer = false;


/*         console.log('********* redo 2 *********');
        console.log(this.historyStates);
        console.log(this.currentStepHistory);
        console.log('this.state');
        console.log(this.state); */

        return answer;
    }

    /**
     * Clears transition history
     */
    clearHistory() { 
        
        this.historyStates = [];
        this.currentStepHistory = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
