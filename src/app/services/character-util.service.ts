import { Injectable } from '@angular/core';
import _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
import { ISkill } from '../models/character.model';

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
    dev: "Vulnerability",
    det: "Tear",
    dep: "Poison",
    dee: "Exhaust",
    des: "Stun",
}
const statusDescription = {
    // BUFF
    be: "Increase skill power by 30% for each stack. 3 stacks max.",
    bc: "Increase all allies' skill power by 30% for each stack. 3 stacks max.",
    br: "Increase skill power by 30% for each stack. 3 stacks max. Upon incoming damage skill, grant self 1 stack.",
    bw: "Increase skill power by 30% for each stack. 3 stacks max. Upon cast skill, grant self 1 stack.",        
    bt: "Become primary target.",
    bd: "Upon incoming damage skill, decrease skill power by 30% for each stack. 3 stacks max.",
    bre: "Upon the end of self-turn, heal self 10% max HP for each stack. 3 stacks max. Remove upon incoming damage skill.",
    ba: "Upon the end of self-turn, grant self HP equal to 30% of current Armor for each stack. 3 stacks max.",      
    bta: "Upon incoming damage skill, grant self Armor equal to 10% max Armor for each stack. 3 stacks max.",      
    bv: "Upon incoming damage skill, 30% chance to evade damage for each stack. 3 stacks max.",      
 
    // DEBUFF
    dev: "Upon incoming damage skill, increase skill power by 30% for each stack. 3 stacks max.",
    det: "Upon cast skill, lose 10% current HP for each stack. 3 stacks max.",
    dep: "Upon the end of self-turn, lose 10% current HP for each stack. 3 stacks max. Remove upon receive Heal.",
    dee: "Decrease skill power by 30% for each stack. 3 stacks max.",
    des: "Can't cast skill. Remove upon incoming damage skill.",
}
const skillType = {
    one: "1-orb skill",
    two: "2-orb skill",
    four: "4-orb skill, squared",
    passive: "Passive skill",
    advisor: "Advisor skill"
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

//Armor pen <aa>1.5</aa> then <at>2</at> then <an>5</an> then heal <dh>2.5</dh> then grant <be></be> and finally <bre></bre> with <dep></dep> after gain <da>1.5</da> armor
@Pipe({ name: 'skillRenderer' })
export class SkillRenderer implements PipeTransform {    
    constructor() {}

    transform(skill: string, stat: any, skillInfo: ISkill) {
        if (!skill) {
            return;
        }
        let m;
        let result = skill;
        const statusUsed = [];
        while ((m = skillRegex.exec(skill)) !== null) {

            if (m.index === skillRegex.lastIndex) {
                skillRegex.lastIndex++;
            }
            const match = m[0]
            const tag = m[1];
            const tagName = statusDictionary[tag];
            const multiplier = m[2];
            if (tagName) {
                if (multiplier) {
                    result = result.replace(match, `( <b class='${tag}'>${Math.floor(multiplier * stat.attack)}</b> )`); 
                } else {
                    result = result.replace(match, `<div class='status ${tag}'></div>`);
                    statusUsed.push(tag);
                }
            }            
        } 
        result = `<b>[ ${skillType[skillInfo.type]} ] ${skillInfo.name}</b></br>` + result;
        //Add status description
        _.uniq(statusUsed).forEach(s => {
            result += `<div class="status-description"><b>${statusDictionary[s]}: </b><span>${statusDescription[s]}</span></div>`;
        })
        return result;
    }
}