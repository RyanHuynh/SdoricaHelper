const CharacterModel = require('../model/character.model');
const DATASET = {
    white: [],
    black: [],
    gold: [],
};

class CharacterService {
    static create(data) {
        let character = new CharacterModel(
            data.name, 
            data.description,
            data.position,
            data.availableTier,
            data.skillSet, 
            data.icon
        );
        DATASET[character.position].push(character);       
        return true;
    }
    static list(position) {
        if (position === "all") {
            return {
                success: true,
                data: [
                    ...DATASET["white"],
                    ...DATASET["black"],
                    ...DATASET["gold"],
                ]
            }
        }
        return {
            data: DATASET[position],
            success: true
        } 
    }
}
module.exports = CharacterService;