import { NgModule } from '@angular/core';
import { 
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatExpansionModule,
  MatRadioModule,
} from '@angular/material';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatExpansionModule,
  MatRadioModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialComponentModule { }
