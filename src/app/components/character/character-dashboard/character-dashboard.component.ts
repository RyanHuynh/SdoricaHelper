import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CharacterCreationComponent } from '../character-creation/character-creation.component';
import { CharacterAPIService } from '../../../services/character-api.service';
@Component({
  selector: 'character-dashboard',
  templateUrl: './character-dashboard.component.html',
  styleUrls: ['./character-dashboard.component.scss']
})
export class CharacterDashboardComponent implements OnInit {
  searchString: string;
  characterList = {
    White: [],
    Black: [],
    Gold: [],
  }; 
  editMode: boolean = false;
  constructor(private dialog: MatDialog, private characterServies: CharacterAPIService) { }

  ngOnInit() {
    this._getCharacterList();
  }
  _getCharacterList() {
    this.characterServies.getCharacterList("all").subscribe(res => {
      if (res.success) {
        this.characterList = res.data;
      }
    });
  }
  _createNew() {
    const dialogRef = this.dialog.open(CharacterCreationComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this._getCharacterList();
      }
    });
  }
  _changeEditMode() {
    this.editMode = !this.editMode;
  }
}
