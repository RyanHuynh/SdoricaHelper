import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

import { characterMetaData } from '../../model/character.model';
import { CharacterAPIService } from '../../services/character-api.service';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss']
})
export class CharacterCreationComponent implements OnInit {

  positionOptions = characterMetaData.positionOptions;
  skillOptions = characterMetaData.skillOptions;
  characterForm: FormGroup;

  constructor(private charService: CharacterAPIService, private fb: FormBuilder) { } 
  ngOnInit() {  
    this.characterForm = this._createForm();
    this.skillOptions.forEach(s => {
      (<FormArray>this.characterForm.controls.skillSet).push(this.fb.group({
        type: s,
        description: "",
      }))
    })
  }

  _createForm(): FormGroup {
    return this.fb.group({
      name: [''],
      position: [''],
      description: [''],
      skillSet: this.fb.array([])
    })
  }  
  _submitForm() {    
    this.charService.saveCharacter(this.characterForm.value).subscribe((res) => {
      console.log(res);
    })
  }
}
