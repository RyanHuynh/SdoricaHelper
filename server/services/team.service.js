const TeamModel = require('../model/team.model');
const DATASET = {};

class TeamService {
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
        let team = new TeamModel(
            data.mode,
            data.name,           
            data.team,
            data.description,           
        );
        if (!Object.prototype.hasOwnProperty.call(DATASET, data.mode)) {
            DATASET[team.mode] = [];console.log(1);
        }
        console.log(DATASET);
        DATASET[team.mode].push(team);        console.log(DATASET);
        return true;
    }
    static list(mode) {         
        return {
            data: DATASET[mode],
            success: true
        } 
    }
}
module.exports = TeamService;