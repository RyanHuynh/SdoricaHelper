import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Module
import { AppRoutingModule } from './app-routing.module';
import { MaterialComponentModule } from './material-component.module';
import { FormsModule } from '@angular/forms';

//Component 
import { AppComponent } from './app.component';
import { CharacterCreationComponent } from './components/character/character-creation/character-creation.component';
import { CharacterDetailComponent } from './components/character/character-detail/character-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamBuilderComponent } from './components/team/team-builder/team-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCreationComponent,
    CharacterDetailComponent,
    DashboardComponent,
    TeamBuilderComponent
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
  entryComponents: [CharacterCreationComponent, TeamBuilderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
