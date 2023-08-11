export class Trainer {
    constructor(trainerClass, name, difficulty, sprite, pkmnParty) {
        this.trainerClass = trainerClass;
        this.name = name;
        this.pkmnParty = pkmnParty;
        this.difficulty = difficulty;
        this.sprite = sprite;
    }

    battleTitle() {
        return `${this.trainerClass} ${this.name} wants to battle!`
    }
}