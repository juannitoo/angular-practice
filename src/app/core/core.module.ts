import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LandingPageComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [HttpClient],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
