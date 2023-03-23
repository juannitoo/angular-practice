import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonPlaceHolderModule } from './json-place-holder/json-place-holder.module';
import { JsonServerModule } from './json-server/json-server.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NodeModule } from './node/node.module';

const routes: Routes = [
  { path: 'jsonplaceholder', loadChildren: () => import('./json-place-holder/json-place-holder.module')
                                           .then( m => JsonPlaceHolderModule) },
  { path: 'json-server', loadChildren: () => import('./json-server/json-server.module')
                                           .then( m => JsonServerModule) },
  { path: 'nodeJs', loadChildren: () => import('./node/node.module')
                                           .then( m => NodeModule) },
  { path: '', component: LandingPageComponent },
  { path: '**', component: LandingPageComponent }                                        
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
