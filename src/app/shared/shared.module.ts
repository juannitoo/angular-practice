import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TitleEventDirective } from './directives/title-event.directive';


@NgModule({
  declarations: [
    TitleEventDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[
    MaterialModule,
    TitleEventDirective
  ]
})
export class SharedModule { }
