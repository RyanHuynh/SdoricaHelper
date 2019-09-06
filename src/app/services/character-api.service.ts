import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { characterEndpoint, ICharacter } from '../model/character.model';
@Injectable({
    providedIn: 'root'
})
export class CharacterAPIService {
    constructor(private http: HttpClient){}
    saveCharacter(character: ICharacter) {
        return this.http.post(characterEndpoint.saveCharacter, character);
    }
}