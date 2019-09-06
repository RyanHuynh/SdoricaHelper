import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";

//Module
import { AppRoutingModule } from './app-routing.module';
import { MaterialComponentModule } from './material-component.module';
import { FormsModule } from '@angular/forms';

//Component 
import { AppComponent } from './app.component';
import { CharacterCreationComponent } from './character/character-creation/character-creation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterDetailComponent } from './character/character-detail/character-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCreationComponent,
    CharacterDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
