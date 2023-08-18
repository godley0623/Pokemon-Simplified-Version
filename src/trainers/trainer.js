export class Trainer {
    constructor(trainerClass, name, difficulty, sprite, bgm, pkmnParty) {
        this.trainerClass = trainerClass;
        this.name = name;
        this.pkmnParty = pkmnParty;
        this.difficulty = difficulty;
        this.sprite = sprite;
        this.bgm = bgm;
    }

    battleTitle() {
        return `${this.trainerClass} ${this.name} wants to battle!`
    }
}