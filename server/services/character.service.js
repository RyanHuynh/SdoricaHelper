const CharacterModel = require('../model/character.model');
const DATASET = [];

class CharacterService {
    static mock() {     
        DATASET.push({
            name: "Angelia",
            position: "white",
            id: 1,
            skillSet: {
                SSR: [{
                    type: "one",
                    description: "Grant front row ally <da>0.6</da> Armor, trigger 1-orb skill."
                }, {
                    type: "two",
                    description: "Grant all player characters <da>0.72</da> Armor, grant <bd></bd> Damage Reduction."
                },{
                    type: "four",
                    description: "Heal <dh>1.8</dh> front row ally, grant <dee></dee> Exhaust, trigger 4-orb skill."
                },{
                    type: "passive",
                    description: "Upon cast Armor, if target has <dee></dee> Exhaust/<dev></dev> Icon Vulnerability, increase skill power by 100%."
                },{
                    type: "advisor",
                    description: "Grant selected ally <da>0.72</da> Armor. [CD: 1]"
                }]     
            },
            availableTier: ["N", "R", "SR", "SSR", "Alt"],
            tags: ["da", "bd", "dh", "dee"],
            baseStat: {
                attack: 68,
                hp: 240,
                revive: 8
            },
            icon: "angelia"
        })
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
            data: { [position]: DATASET.filter(c => c.position === position) },
            success: true
        } 
    }
    static get(id) {
        const character = DATASET.find(c => c.id == id);console.log(id);
        if (character) {console.log(2);
            return {
                data: character,
                success: true,
            } 
        }
        console.log(3);
        return {
            success: false
        }
    }
}
module.exports = CharacterService;