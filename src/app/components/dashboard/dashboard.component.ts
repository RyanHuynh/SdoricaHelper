import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CharacterCreationComponent } from '../character/character-creation/character-creation.component';
import { TeamBuilderComponent } from '../team/team-builder/team-builder.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  modes=[{
    name: "W"
  }]
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  _addCharacter(){
    this.dialog.open(CharacterCreationComponent)
  }
  _addTeam(){
    this.dialog.open(TeamBuilderComponent)
  }
}