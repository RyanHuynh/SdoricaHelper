const CharacterModel = require('../model/character.model');
const DATASET = {
    white: [],
    black: [],
    gold: [],
};

class CharacterService {
    static mock() {
        const numberCharPerPosition = 15;
        const position = ["white","black","gold"];
        for (let p = 0; p < position.length; p += 1) {
            for (let i = 0; i < numberCharPerPosition; i += 1) {
                DATASET[position[p]].push({
                    id: position[p] + i,
                    name: "name" + position[p] + i,
                    position: position[p],
                    baseStat: {
                        attack: 10,
                        hp: 10
                    },
                    availableTier: ["N", "R", "SR", "SSR", "Alt"],
                    skillSet: {
                        N: [{
                            "Passive": "Some passive"
                        }, {
                            "Four Orb": "Some Four Orb" 
                        }],
                        SSR: [{
                            "Passive": "Some passive"
                        }, {
                            "Four Orb": "Some Four Orb" 
                        }]
                    }
                })
            }
        }
    }
    static create(data) {
        let character = new CharacterModel(
            data.name,           
            data.position,
            data.baseStat,
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
                data: DATASET,
            }
        }
        return {
            data: { position: DATASET[position] },
            success: true
        } 
    }
}
module.exports = CharacterService;