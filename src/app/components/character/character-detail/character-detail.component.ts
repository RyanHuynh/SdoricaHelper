import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CharacterAPIService } from '../../../services/character-api.service';

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
    @Inject(MAT_DIALOG_DATA) data
    ) {
      this.dialogData = data;
     }

  ngOnInit() {
    this.characterService.getCharacter(this.dialogData).subscribe(res => {
      if (res.success) {
        this.character = res.data;
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
    this.stat.attack = newLevel * this.character.baseStat.attack;
    this.stat.hp = newLevel * this.character.baseStat.hp;
  }
  _exceedUpdated(newExceed) {
    this.exceed = newExceed;
    this.stat.attack = this.level * this.character.baseStat.attack + newExceed;
    this.stat.hp = this.level * this.character.baseStat.hp + newExceed;
  }
}
