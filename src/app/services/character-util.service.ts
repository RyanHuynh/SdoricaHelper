import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

const skillRegex = /<([^>]*)>([^<]*)<\/[^>]*>/gm;
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
const resonanceMultiplier = {
    N: 1,
    R: 1.08,
    SR: 1.2,
    SSR: 1.35,
    Alt: 1.35
}
const extraStat = {
    attack: 50,
    hp: 300,
}
@Injectable({
    providedIn: 'root'
})
export class CharacterUtilService {    
    constructor(){}

    getTagFromSkill(skill) {
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

    getCurrentStat(baseStat, level, exceed, tier) {
        let R = resonanceMultiplier[tier];
        let EM = 1;
        if(exceed <= 5) {
            EM = 1;
        }
        else if (exceed > 5 && exceed <= 9) {
            EM = Math.pow(1.01, exceed - 5);           
        }
        else if (exceed > 9 && exceed <= 15) {
            EM = Math.pow(1.01, 5) * Math.pow(1.03, exceed - 10);           
        }

        console.log('EM: ' + EM);

        const B_ATTACK = baseStat.attack;
        const ES_ATTACK = extraStat.attack;
        const currentAttack = Math.floor(( B_ATTACK * Math.pow(1.06, level - 1) * R * EM ) + (exceed * ES_ATTACK));

        const B_HP = baseStat.hp;
        const ES_HP = extraStat.hp;
        const currentHP = Math.floor(( B_HP * Math.pow(1.06, level - 1) * R * EM ) + (exceed * ES_HP));

        return {
            attack: currentAttack,
            hp: currentHP
        }
    }
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