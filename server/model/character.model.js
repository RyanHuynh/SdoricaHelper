const uuidv1 = require('uuid/v1');
class CharacterModel {
    constructor(name, position, baseStat, availableTier, titles, skillSet, ultimateType, tags) {     
        this.name = name;    
        this.position = position;
        this.baseStat = baseStat;
        this.availableTier = availableTier;
        this.titles = titles
        this.skillSet = skillSet;
        this.ultimateType = ultimateType;
        this.tags = tags;   
        this.id = uuidv1();
    }
}
module.exports = CharacterModel;