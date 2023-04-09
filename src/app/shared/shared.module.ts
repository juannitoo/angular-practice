import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TitleEventDirective } from './directives/title-event.directive';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    TitleEventDirective,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[
    MaterialModule,
    TitleEventDirective,
    ErrorComponent
  ]
})
export class SharedModule { }
