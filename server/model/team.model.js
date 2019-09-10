const uuidv1 = require('uuid/v1');
class TeamModel {
    constructor(mode, name, team, description) {  
        this.mode = mode;   
        this.name = name;    
        this.team = team;
        this.description = description;
        this.id = uuidv1();
    }
}
module.exports = TeamModel;