import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITeam, teamEndpoint } from '../models/team.model';
import { IResponseObject } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class TeamAPIService {
  constructor(private http: HttpClient){}
  saveTeam(team: ITeam) {
    return this.http.post<IResponseObject>(teamEndpoint.saveTeam, team);
  }
  listTeam(mode: string) {
    return this.http.get<IResponseObject>(teamEndpoint.listTeam, {
      params: { mode }
    });
  }
}
