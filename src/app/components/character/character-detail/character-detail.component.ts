import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { CharacterAPIService } from '../../../services/character-api.service';
import { CharacterUtilService } from '../../../services/character-util.service';
import { ICharacter }from '../../../models/character.model';
import { CharacterCreationComponent } from '../character-creation/character-creation.component';

@Component({
  selector: 'character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CharacterDetailComponent implements OnInit {
  character: ICharacter = null;
  dialogData = null;
  level: number = 1;
  exceed: number = 0;
  selectedTier: string = "N";
  stat = {
    attack: 0,
    hp: 0
  }
  selectedUltimateType = "four";
  constructor(
    private characterService: CharacterAPIService,
    private dialogRef: MatDialogRef<CharacterDetailComponent>,
    private characterUtil: CharacterUtilService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data
    ) {
      this.dialogData = data;
     }

  ngOnInit() {
    this.characterService.getCharacter(this.dialogData).subscribe(res => {
      if (res.success) {
        this.character = res.data;
        this.selectedTier = this.character.availableTier[0];
        this.selectedUltimateType = this.character.ultimateType[this.selectedTier === "Alt" ? "alt" : "normal"];
        this._levelUpdated(1);
      }
    });
  } 
  onNoClick(): void {
    this.dialogRef.close();
  }
  _selectTier(tier) {
    this.selectedTier = tier.value;
    this.selectedUltimateType = this.character.ultimateType[this.selectedTier === "Alt" ? "alt" : "normal"];
  }
  _levelUpdated(newLevel) {
    this.level = newLevel;
    this.stat = this.characterUtil.getCurrentStat(this.character.baseStat, newLevel, this.exceed, this.selectedTier);
  }
  _exceedUpdated(newExceed) {
    this.exceed = newExceed;
    this.stat = this.characterUtil.getCurrentStat(this.character.baseStat, this.level, newExceed, this.selectedTier);
  }
  _editMode() {
    this.dialogRef.close();
    setTimeout(() => {
      const config = new MatDialogConfig();
      config.data = this.character.id;
      this.dialog.open(CharacterCreationComponent, config);
    }, 100);
  }
}
