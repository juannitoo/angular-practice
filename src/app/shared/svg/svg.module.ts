import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChevronRightFaComponent } from './chevron-right-fa/chevron-right-fa.component';


@NgModule({
  declarations: [
    ChevronRightFaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ChevronRightFaComponent
  ],
})
export class SvgModule { }
