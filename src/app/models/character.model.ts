export namespace characterEndpoint {
    export const saveCharacter = 'api/character/save';
    export const getCharacter = 'api/character/get';
    export const listCharacter = 'api/character/list';
}

export namespace characterMetaData {
    export const positionOptions = [{
        name: "White",
        value: "white",
    },{
        name: "Black",
        value: "black"
    },{
        name: "Gold",
        value: "gold",
    }];
    export const skillOptions = ["one", "two", "four", "passive", "advisor"];
    export const tierList = ["N", "R", "SR", "SSR", "Alt"];
}

export interface ISkill {
    type: string;
    description: string;
}

export interface ICharacter {
    name: string;
    position: string;  
    baseStat: {
        attack: number,
        hp: number,
        orb: number
    },
    icon?: string, 
    availableTier: string[],
    skillSet: {
        N: ISkill[],
        R: ISkill[],
        SR: ISkill[],
        SSR: ISkill[],
        Alt: ISkill[],
    }
}