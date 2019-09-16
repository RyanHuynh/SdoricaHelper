const uuidv1 = require('uuid/v1');
class CharacterModel {
    constructor(name, position, baseStat, availableTier, titles, skillSet, tags) {     
        this.name = name;    
        this.position = position;
        this.baseStat = baseStat;
        this.availableTier = availableTier;
        this.titles = titles
        this.skillSet = skillSet;
        this.tags = tags;   
        this.id = uuidv1();
    }
}
module.exports = CharacterModel;