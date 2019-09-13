import { Pipe, PipeTransform } from '@angular/core';

export const statusDictionary = {
    // ATK
    an: "Normal Attack",   
    aa: "Armor Penetration",  
    at: "True Damage", 

    // DEFENSE
    dh: "Heal",  
    da: "Armor",

    // BUFF
    be: "Enhance",
    bc: "Charisma",
    br: "Rage",
    bw: "Warcry",        
    bt: "Taunt",
    bd: "Damage Reduction",
    bre: "Regen",
    ba: "Armor Shift",      
    bta: "Tank Up",      
    bv: "Vigilance",      

    // DEBUFF
    dev: "Vulnerable",
    det: "Tear",
    dep: "Poison",
    dee: "Exhaust",
    des: "Stun",
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

//armor pen <ap>1.5</ap> then <at>2</at> then <an>5</an> then heal <dh>2.5</dh> then grant <be></be> 
@Pipe({ name: 'skillRenderer' })
export class SkillRenderer implements PipeTransform {    
    constructor() {}

    transform(skill: string, stat: any) {
        let m;
        let result = skill;
        while ((m = skillRegex.exec(skill)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === skillRegex.lastIndex) {
                skillRegex.lastIndex++;
            }
            const match = m[0]
            const tag = m[1];
            const tagName = statusDictionary[tag];
            const multiplier = m[2];
            if (tagName) {
                if (multiplier) {
                    result = result.replace(match, `<b class='${tag}'>${Math.floor(multiplier * stat.attack)}</b>`); 
                }
                result = result.replace(match, `<div class='status ${tag}'></div>`); 
            } 
        } 
        return result;
    }
}