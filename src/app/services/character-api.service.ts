import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { characterEndpoint, ICharacter } from '../models/character.model';
import { IResponseObject } from '../models/common.model';

@Injectable({
    providedIn: 'root'
})
export class CharacterAPIService {
    constructor(private http: HttpClient){}
    saveCharacter(character: ICharacter) {
        return this.http.post(characterEndpoint.saveCharacter, character);
    }
    getCharacterList(position: string){
        return this.http.get<IResponseObject>(characterEndpoint.listCharacter , {
            params: {position}
        });
    }
}