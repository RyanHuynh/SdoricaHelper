import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { CharacterAPIService } from '../../../services/character-api.service';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.scss']
})
export class TeamBuilderComponent implements OnInit {

  constructor(
    private charService: CharacterAPIService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TeamBuilderComponent>
  ) { }
  
  teamForm: FormGroup;
  whiteCharacterOptions: Object[];
  blackCharacterOptions: Object[];
  goldCharacterOptions: Object[];
  allCharacterOptions: Object[];

  ngOnInit() {
    this.teamForm = this._createForm();
    this.charService.getCharacterList("white").subscribe(res => {
      this.whiteCharacterOptions = res.data;
    });
    this.charService.getCharacterList("black").subscribe(res => {
      this.blackCharacterOptions = res.data;
    });
    this.charService.getCharacterList("gold").subscribe(res => {
      this.goldCharacterOptions = res.data;
    });
    this.charService.getCharacterList("all").subscribe(res => {
      this.allCharacterOptions = res.data;
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
        white: "",
        black: "",
        gold: "",
        advisor: "",
        guildAdvisor: ""   
      }),
      description: [""],
    })
  }
  _submitForm() {

  }
}
