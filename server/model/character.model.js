const uuidv1 = require('uuid/v1');
class CharacterModel {
    constructor(name, position, baseStat, availableTier, skillSet, tags, icon) {     
        this.name = name;    
        this.position = position;
        this.baseStat = baseStat;
        this.availableTier = availableTier;
        this.skillSet = skillSet;
        this.tags = tags;
        this.icon = icon;
        this.id = uuidv1();
    }
}
module.exports = CharacterModel;