export namespace characterEndpoint {
    export const saveCharacter = 'api/character/save';
    export const getCharacter = 'api/character/get';
}

export namespace characterMetaData {
    export const positionOptions = [{
        name: "Gold",
        value: "gold",
    },{
        name: "Black",
        value: "black"
    },{
        name: "White",
        value: "white",
    }];
    export const skillOptions = ["Passive", "One Orb", "Two Orb", "Four Orb", "Advisor"]
}

export interface ISkill {
    type: string;
    description: string;
}

export interface ICharacter {
    name: string;
    position: string;
    description: string;
    icon?: string, 
    skillSet: ISkill[];
}