import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CharacterDetailComponent } from '../../character-detail/character-detail.component';
import { ICharacter } from '../../../../models/character.model';

@Component({
  selector: 'character-tile',
  templateUrl: './character-tile.component.html',
  styleUrls: ['./character-tile.component.scss']
})
export class CharacterTileComponent implements OnInit {
  @Input() data: ICharacter;
  iconURL;
  constructor(
    private dialog: MatDialog,
    private sanitization: DomSanitizer
    ) { }

  ngOnInit() {
    this.iconURL = this.sanitization.bypassSecurityTrustStyle(`url('./assets/img/characters/${this.data.id}/icon.png'`);
  }
  _getCharacterDetail() {
    const config = new MatDialogConfig();
    config.data = this.data.id;
    this.dialog.open(CharacterDetailComponent, config);
  }
}
