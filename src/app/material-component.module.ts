import { NgModule } from '@angular/core';
import { 
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonModule
} from '@angular/material';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialComponentModule { }
