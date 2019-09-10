import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedView: string = "team";

  constructor() { }

  ngOnInit() {
  }

  _switchDashboardView(view) {
    this.selectedView = view.value;
  }
}