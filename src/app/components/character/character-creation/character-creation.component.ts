import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import _ from 'lodash';

import { characterMetaData, characterEndpoint } from '../../../models/character.model';
import { CharacterAPIService } from '../../../services/character-api.service';
import { CharacterUtilService } from '../../../services/character-util.service';

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
  selectedTier: string = "SSR";
  currentTitle: string = "";
  level: number = 1;
  exceed: number = 0;
  selectedTab: string = 'info'; 
  selectedUltimateType= "four";
  uploader:FileUploader = new FileUploader({});
  dialogData = null;

  constructor(
    private charService: CharacterAPIService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CharacterCreationComponent>,
    private characterUtil: CharacterUtilService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data
    ){
      this.dialogData = data;
    }
  ngOnInit() {  
    this.characterForm = this._createForm();
    this.tierList.forEach(t => {
      this.skillOptions.forEach(s => {
        (<FormArray>(<FormGroup>this.characterForm.get('skillSet')).controls[t]).push(this.fb.group({
          type: s,
          description: "",
          name: "",
        }))
      })      
    }) 
    //Edit Mode
    if (this.dialogData) {
      this.charService.getCharacter(this.dialogData).subscribe((res) => {
        if (res.success) {
          this.characterForm.patchValue(res.data);
        }
      }) 
    }
  }
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  _toggleTab() {
    this.selectedTab = this.selectedTab === 'info' ? 'image' : 'info';
  }
  _createForm(): FormGroup {
    const skillSet = _.fromPairs(this.tierList.map(tier => [tier, this.fb.array([])]));
    const titles = _.fromPairs(this.tierList.map(tier => [tier, [""]]));
    return this.fb.group({
      name: [''],
      position: [''],
      baseStat: this.fb.group({
        hp: [0],
        attack: [0],
        revive: [0],
      }),
      availableTier: [[...this.tierList]],
      titles: this.fb.group({...titles}),
      skillSet: this.fb.group({...skillSet}),
      ultimateType: this.fb.group({
        normal: ['four'],
        alt: ['four']
      }),
      tags: [[]],
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
    this.currentTitle = (<FormGroup>this.characterForm.get('titles')).value[this.selectedTier];
    this.selectedUltimateType = this.characterForm.get('ultimateType').value[this.selectedTier === "Alt" ? "alt" : "normal"];
  }
  _updateTitle(event) {    
    const { value } = event.target;
    this.currentTitle = value;
    const titlesControl =  <FormGroup>this.characterForm.get('titles');
    const tierControl = titlesControl.controls[this.selectedTier];
    tierControl.setValue(value);
  }
  _updateSkillDescription(event) {
    const { name, value } = event.target;
    this._updateTag(value);
    const skillSetControl =  <FormGroup>this.characterForm.get('skillSet');
    const tierControl = <FormArray>skillSetControl.controls[this.selectedTier];
    const skillControl = tierControl.controls[name];
    const currentValue = skillControl.value;
    skillControl.setValue({
      ...currentValue,
      description: value
    })    
  }
  _updateSkillName(event) {
    const { name, value } = event.target;
    const skillSetControl =  <FormGroup>this.characterForm.get('skillSet');
    const tierControl = <FormArray>skillSetControl.controls[this.selectedTier];
    const skillControl = tierControl.controls[name];
    const currentValue = skillControl.value;
    skillControl.setValue({
      ...currentValue,
      name: value
    })    
  }
  _cloneSkill(index) {
    const availableTiers = this.characterForm.get('availableTier').value;
    const skillSetControl =  <FormGroup>this.characterForm.get('skillSet');
    const tierControl = <FormArray>skillSetControl.controls[this.selectedTier];
    const skillControl = tierControl.controls[index];
    const currentValue = skillControl.value;
    for (let i = 0; i < availableTiers.length; i += 1) {
      const tier = availableTiers[i];
      if (tier === "SSR" || tier === "Alt") {
        continue;
      }
      const currentSkillControl = (<FormArray>skillSetControl.controls[tier]).controls[index];
      currentSkillControl.setValue(currentValue);
    }
  }
  _updateTag(skill) {
    const newTags = this.characterUtil.getTagFromSkill(skill);
    const control = this.characterForm.get('tags');
    const value = control.value;
    control.setValue(_.uniq(value.concat(newTags)));
  }
  _updateUltimateSkillType({ value }) {
    this.selectedUltimateType = value;
    (<FormGroup>this.characterForm.get('ultimateType')).controls[this.selectedTier === "Alt" ? "alt" : "normal"].setValue(value);
  }
  _submitForm() {
    const payload = this.characterForm.value;
    this.charService.saveCharacter(payload).subscribe((res) => {
      if (res.success) {        
        //Upload Images
        const options = {
          url: characterEndpoint.uploadImages,
          additionalParameter: {
            dirName: res.data
          }
        }
        this.uploader.setOptions(options);
        this.uploader.uploadAll();
        this.dialogRef.close(true);
      }
    })

    
  }
}
