export namespace characterEndpoint {
    export const saveCharacter = 'api/character/save';
    export const getCharacter = 'api/character/get';
    export const listCharacter = 'api/character/list';
    export const uploadImages = 'api/character/upload';
}

export namespace characterMetaData {
    export const positionOptions = [{
        name: "White",
        value: "White",
    },{
        name: "Black",
        value: "Black"
    },{
        name: "Gold",
        value: "Gold",
    }];
    export const skillOptions = ["one", "two", "four", "passive", "advisor"];
    export const tierList = ["N", "R", "SR", "SSR", "Alt"];
}

export interface ISkill {
    type: string;
    name: string;
    description: string;
}

export interface ICharacter {
    id?: string,
    name: string;
    position: string;  
    baseStat: {
        attack: number,
        hp: number,
        revive: number
    },
    availableTier: string[],
    titles: {},
    skillSet: {
        N: ISkill[],
        R: ISkill[],
        SR: ISkill[],
        SSR: ISkill[],
        Alt: ISkill[],
    },
    tags: string[]
}