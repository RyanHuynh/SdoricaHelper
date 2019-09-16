import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFileUploaderModule } from "angular-file-uploader";

//Module
import { AppRoutingModule } from './app-routing.module';
import { MaterialComponentModule } from './material-component.module';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from "ng2-file-upload";

//Component 
import { AppComponent } from './app.component';
import { CharacterCreationComponent } from './components/character/character-creation/character-creation.component';
import { CharacterDetailComponent } from './components/character/character-detail/character-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamBuilderComponent } from './components/team/team-builder/team-builder.component';
import { CharacterDashboardComponent } from './components/character/character-dashboard/character-dashboard.component';
import { TeamDashboardComponent } from './components/team/team-dashboard/team-dashboard.component';
import { CharacterTileComponent } from './components/character/character-dashboard/character-tile/character-tile.component';
import { SkillRenderer } from './services/character-util.service';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCreationComponent,
    CharacterDetailComponent,
    DashboardComponent,
    TeamBuilderComponent,
    CharacterDashboardComponent,
    TeamDashboardComponent,
    CharacterTileComponent,
    SkillRenderer,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentModule,
    FormsModule,
    AngularFileUploaderModule,
    FileUploadModule
  ],
  entryComponents: [
    CharacterCreationComponent, 
    CharacterDetailComponent,
    TeamBuilderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
