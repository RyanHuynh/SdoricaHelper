const CharacterModel = require('../model/character.model');
const data = {};
let id = 0;
class CharacterService {
    static create(data) {console.log(4);
        let character = new CharacterModel(data.name, data.description, data.position, data.skillSet, data.icon);
        const uid = ++id ; 
        data[uid] = character;
        return true;
    }
}
module.exports = CharacterService;