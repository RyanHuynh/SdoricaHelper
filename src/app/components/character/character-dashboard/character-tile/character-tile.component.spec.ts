import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTileComponent } from './character-tile.component';

describe('CharacterTileComponent', () => {
  let component: CharacterTileComponent;
  let fixture: ComponentFixture<CharacterTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
