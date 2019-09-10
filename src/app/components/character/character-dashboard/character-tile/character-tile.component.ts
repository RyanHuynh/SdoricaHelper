import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'character-tile',
  templateUrl: './character-tile.component.html',
  styleUrls: ['./character-tile.component.scss']
})
export class CharacterTileComponent implements OnInit {
  @Input() data: object;

  constructor() { }

  ngOnInit() {
  }
test() {
  debugger;
}
}
