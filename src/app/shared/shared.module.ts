import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { SvgModule } from './svg/svg.module';
import { ChevronRightFaComponent } from './svg/chevron-right-fa/chevron-right-fa.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    SvgModule
  ],
  exports:[
    MaterialModule,
    SvgModule
  ]
})
export class SharedModule { }
