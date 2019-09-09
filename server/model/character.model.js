const uuidv1 = require('uuid/v1');
class CharacterModel {
    constructor(name, description, position, availableTier, skillSet, icon) {     
        this.name = name;
        this.description = description;
        this.position = position;
        this.availableTier = availableTier;
        this.skillSet = skillSet;
        this.icon = icon;
        this.id = uuidv1();
    }
}
module.exports = CharacterModel;