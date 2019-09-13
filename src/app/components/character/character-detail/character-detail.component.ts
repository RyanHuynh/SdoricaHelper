import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CharacterAPIService } from '../../../services/character-api.service';
import { CharacterUtilService } from '../../../services/character-util.service';

@Component({
  selector: 'character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CharacterDetailComponent implements OnInit {
  character = null;
  dialogData = null;
  level: number = 1;
  exceed: number = 0;
  selectedTier: string = "N";
  stat = {
    attack: 0,
    hp: 0
  }

  constructor(
    private characterService: CharacterAPIService,
    private dialogRef: MatDialogRef<CharacterDetailComponent>,
    private characterUtil: CharacterUtilService,
    @Inject(MAT_DIALOG_DATA) data
    ) {
      this.dialogData = data;
     }

  ngOnInit() {
    this.characterService.getCharacter(this.dialogData).subscribe(res => {
      if (res.success) {
        this.character = res.data;
        this._levelUpdated(1);
      }
    });
  } 
  onNoClick(): void {
    this.dialogRef.close();
  }
  _selectTier(tier) {
    this.selectedTier = tier.value;
  }
  _levelUpdated(newLevel) {
    this.level = newLevel;
    this.stat = this.characterUtil.getCurrentStat(this.character.baseStat, newLevel, this.exceed, this.selectedTier);
  }
  _exceedUpdated(newExceed) {
    this.exceed = newExceed;
    this.stat = this.characterUtil.getCurrentStat(this.character.baseStat, this.level, newExceed, this.selectedTier);
  }
}
