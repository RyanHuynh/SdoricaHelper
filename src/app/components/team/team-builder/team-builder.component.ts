import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { CharacterAPIService } from '../../../services/character-api.service';
import { TeamAPIService } from '../../../services/team-api.service';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.scss']
})
export class TeamBuilderComponent implements OnInit {

  constructor(
    private charService: CharacterAPIService, 
    private teamService: TeamAPIService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TeamBuilderComponent>
  ) { }
  
  teamForm: FormGroup;
  characterList = {
    white: [],
    black: [],
    gold: [],
  }

  ngOnInit() {
    this.teamForm = this._createForm();
    this.charService.getCharacterList("all").subscribe(res => {
      this.characterList = res.data;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  _createForm(): FormGroup {
    return this.fb.group({
      name: [""],
      mode: ["wonder"],
      team: this.fb.group({
        white: [""],
        black: [""],
        gold: [""],
        advisor: [""],
        guildAdvisor: [""]   
      }),
      description: [""],
    })
  }
  _submitForm() {
    this.teamService.saveTeam(this.teamForm.value).subscribe(res => {
      if (res.success) {
        this.dialogRef.close(true);
      }
    })
  }
}
