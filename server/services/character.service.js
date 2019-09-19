const CharacterModel = require('../model/character.model');
const DATASET = [];

class CharacterService {   
    static create(data) {
        let character = new CharacterModel(
            data.name,           
            data.position,
            data.baseStat,
            data.availableTier,
            data.titles,
            data.skillSet,
            data.ultimateType,
            data.tags        
        );
        return new Promise(resolve => {
            db
            .collection('characters')
            .insertOne(character)
            .then(result => {              
                if (result.err) return console.log(err);        
                resolve({
                    data: character.id,
                    success: true
                })
            })
        });     
    }
    static list(position) {
        if (position === "all") {
            return new Promise((resolve, reject) => {
                db
                .collection('characters')
                .find({})
                .toArray((err, items) => {
                    if(err) {
                        reject(err);
                    } else {                   
                        resolve({
                            success: true,
                            data: {
                                White: items.filter(c => c.position === "White"),
                                Black: items.filter(c => c.position === "Black"),
                                Gold: items.filter(c => c.position === "Gold")
                            },
                        });
                    }
                })
            })    
        }
        return new Promise((resolve, reject) => {
            db
            .collection('characters')
            .find({position})
            .toArray((err, items) => {
                if(err) {
                    reject(err);
                } else {                   
                    resolve({
                        success: true,
                        data: {
                           [position]: items
                        },
                    });
                }
            })
        })    
    }
    static get(id) {
        return new Promise((resolve, reject) => {
            db
            .collection('characters')
            .findOne({id})
            .then(result => {
                if (!result) {
                    reject({
                        success: false,
                        message: "Error finding character."
                    });
                } else {
                    resolve({
                        data: result,
                        success: true
                    });
                }                
            })
        })     
    }
}
module.exports = CharacterService;