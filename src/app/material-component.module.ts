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
} from '@angular/material';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatDialogModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialComponentModule { }
