import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import _ from 'lodash';

import { characterMetaData } from '../../../models/character.model';
import { CharacterAPIService } from '../../../services/character-api.service';

@Component({
  selector: 'character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CharacterCreationComponent implements OnInit {

  positionOptions = characterMetaData.positionOptions;
  skillOptions = characterMetaData.skillOptions;
  tierList = characterMetaData.tierList;
  characterForm: FormGroup;
  selectedTier: string = "N";
  level: number = 1;
  exceed: number = 0;
  selectedTab: number = 0;
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "1",
    uploadAPI:  {
      url:"https://example-file-upload-api",      
    },
    theme: "dragNDrop",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };
  constructor(
    private charService: CharacterAPIService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CharacterCreationComponent>
  ){}
  ngOnInit() {  
    this.characterForm = this._createForm();
    this.tierList.forEach(t => {
      this.skillOptions.forEach(s => {
        (<FormArray>(<FormGroup>this.characterForm.get('skillSet')).controls[t]).push(this.fb.group({
          type: s,
          description: "",
        }))
      })      
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  _createForm(): FormGroup {
    const skillSet = _.fromPairs(this.tierList.map(tier => [tier, this.fb.array([])]));
    return this.fb.group({
      name: [''],
      position: [''],
      icon: [''],
      baseStat: this.fb.group({
        hp: [0],
        attack: [0],
        orb: [0],
      }),
      availableTier: [[...this.tierList]],
      skillSet: this.fb.group({...skillSet})
    })
  } 
  _updateAvailableTier(tier) {
    const tierName = tier.source.name;
    const tierIndex = this.tierList.indexOf(tierName);
    const control = this.characterForm.get('availableTier');
    const currentAvailableTier = control.value;
    const selected = tier.checked;
    if (selected) {
      let insertIndex = 0;
      for(let i = 0; i < currentAvailableTier.length; i+=1) {
        const currentTierIndex = this.tierList.indexOf(currentAvailableTier[i]);
        if (tierIndex < currentTierIndex) {
          break;
        }
        insertIndex = i + 1;
      }
      currentAvailableTier.splice(insertIndex, 0, tierName);
    } else {
      currentAvailableTier.splice(currentAvailableTier.indexOf(tierName), 1);
    }
    control.setValue(currentAvailableTier);
    this.selectedTier = currentAvailableTier[0];
  }
  _selectTier(tier) {
    this.selectedTier = tier.value;
  }
  _updateSkill(event) {
    const { name, value } = event.target;
    const skillSetControl =  <FormGroup>this.characterForm.get('skillSet');
    const tierControl = <FormArray>skillSetControl.controls[this.selectedTier];
    const skillControl = tierControl.controls[name];
    const currentValue = skillControl.value;
    skillControl.setValue({
      ...currentValue,
      description: value
    })
  }
  _submitForm() {
    const payload = this.characterForm.value;
    this.charService.saveCharacter(payload).subscribe((res) => {
      if (res.success) {
        this.dialogRef.close(true);
      }
    })
  }
}
