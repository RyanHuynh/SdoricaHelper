import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamBuilderComponent } from '../team-builder/team-builder.component';
import { TeamAPIService } from '../../../services/team-api.service';

@Component({
  selector: 'team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss']
})
export class TeamDashboardComponent implements OnInit {
  mode: string = "wonder";
  teams = [];
  constructor(private dialog: MatDialog, private teamServices: TeamAPIService) { }

  ngOnInit() {
    this._getTeamForMode(this.mode);
  }
  _getTeamForMode(mode: string) {
    this.teamServices.listTeam(mode).subscribe(res => {
      this.teams = res.data;
    })
  }
  _createNewTeam() {
    const dialogRef = this.dialog.open(TeamBuilderComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this._getTeamForMode(this.mode);
      }
    });    
  }
}
