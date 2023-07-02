import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { httpInterceptorProviders } from './interceptors';
import { ErrorsService } from './services/errors.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LandingPageComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    HttpClient,
    httpInterceptorProviders,
    ErrorsService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
