import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export const mechanicDictionary = {
    // ATK
    an: {
        name: "Normal Attack",
        class: "a-n"
    },
    ap: {
        name: "Armor Penetration",
        class: "a-a"
    },
    at: {
        name: "True Damage",
        class: "a-t"
    },

    // DEFENSE
    dh: {
        name: "Heal",
        class: "d-h",
    },
    da: {
        name: "Armor",
        class: "d-a"
    },

    // BUFF
    "+e": {
        name: "Enhance",
        class: "b-e"
    },
    "+c": {
        name: "Charisma",
        class: "b-c"
    },
    "+r": {
        name: "Rage",
        class: "b-r"
    },
    "+w": {
        name: "Warcry",
        class: "b-w"
    }, 
    "+t": {
        name: "Taunt",
        class: "b-t",
    },
    "+d": {
        name: "Damage Reduction",
        class: "b-d"
    },
    "+re": {
        name: "Regen",
        class: "b-re"
    },
    "+a": {
        name: "Armor Shift",
        class: "b-a"
    },
    "+ta": {
        name: "Tank Up",
        class: "b-ta"
    },
    "+v": {
        name: "Vigilance",
        class: "b-v"
    },

    // DEBUFF
    "-v": {
        name: "Vulnerable",
        class: "de-v"
    },
    "-t": {
        name: "Tear",
        class: "de-t"
    },
    "-p": {
        name: "Poison",
        class: "de-p"
    }, 
    "-e": {
        name: "Exhaust",
        class: "de-e"
    },
    "-s": {
        name: "Stun",
        class: "de-s"
    }
}

//Extract tags from skill
const skillRegex = /<([^>]*)>([^<]*)<\/[^>]*>/gm;
export const getTagFromSkill = skill => {
    const result = [];
    let m;
    while ((m = skillRegex.exec(skill)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === skillRegex.lastIndex) {
            skillRegex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                result.push(match);
            }
        });
    }
    return result;
}

@Pipe({ name: 'skillRenderer' })
export class SkillRenderer implements PipeTransform {    
    constructor(private sanitizer: DomSanitizer) {}

    transform(skill: string, stat: any) {
        let result = skill;
        let m;
        while ((m = skillRegex.exec(skill)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === skillRegex.lastIndex) {
                skillRegex.lastIndex++;
            }
            const match = m[0]
            const tag = mechanicDictionary[m[1]];
            const multiplier = m[2];
            if (tag) {
                result = result.replace(match, `<span class='${tag.class}'>${multiplier ? Math.floor(multiplier * stat.attack) : ""}</span>`);          
            } 
        } 
        return result
    }
}