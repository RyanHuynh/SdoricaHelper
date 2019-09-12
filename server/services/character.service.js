const CharacterModel = require('../model/character.model');
const DATASET = [];

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
            data.tags,
            data.icon
        );
        DATASET.push(character);       
        return true;
    }
    static list(position) {
        if (position === "all") {
            return {
                success: true,
                data: {
                    white: DATASET.filter(c => c.position === "white"),
                    black: DATASET.filter(c => c.position === "black"),
                    gold: DATASET.filter(c => c.position === "gold")
                },
            }
        }
        return {
            data: { position:DATASET.filter(c => c.position === position) },
            success: true
        } 
    }
    static get(id) {
        const character = DATASET.find(c => c.id === id);
        if (character) {
            return {
                data: character,
                success: true,
            } 
        }
        return {
            success: false
        }
    }
}
module.exports = CharacterService;