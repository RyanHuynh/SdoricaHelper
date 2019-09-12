import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CharacterDetailComponent } from '../../character-detail/character-detail.component';
import { ICharacter } from '../../../../models/character.model';

@Component({
  selector: 'character-tile',
  templateUrl: './character-tile.component.html',
  styleUrls: ['./character-tile.component.scss']
})
export class CharacterTileComponent implements OnInit {
  @Input() data: ICharacter;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  _getCharacterDetail() {
    const config = new MatDialogConfig();
    config.data = this.data.id;
    this.dialog.open(CharacterDetailComponent, config);
  }
}
