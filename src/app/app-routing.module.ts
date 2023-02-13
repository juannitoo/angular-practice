import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonPlaceHolderModule } from './json-place-holder/json-place-holder.module';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: 'jsonplaceholder', loadChildren: () => import('./json-place-holder/json-place-holder.module')
                                           .then( m => JsonPlaceHolderModule) },
  { path: '', component: LandingPageComponent }                                        
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
