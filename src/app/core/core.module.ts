import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    HeaderComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [HttpClient],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
