export default class Player {
    id;
    dice;
    currentGame;

    constructor(id) {
        this.id = id;
        this.dice = [0, 0, 0, 0, 0];
    }

    /**
     * Player dices values reset
     */
    rollDice() {
        this.dice = this.dice.map(x => Math.floor(Math.random() * 6) + 1);
    }

    loseDie() {
        this.dice.pop();
    }

    gainDie() {
        this.dice.push();
    }

}