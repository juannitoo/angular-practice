import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonPlaceHolderModule } from './json-place-holder/json-place-holder.module';
import { JsonServerModule } from './json-server/json-server.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NodeModule } from './node/node.module';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

export const routes: Routes = [

  { path: 'jsonplaceholder', loadChildren: () => import('./json-place-holder/json-place-holder.module')
                                            .then( m => JsonPlaceHolderModule), 
                                            title: 'Json-place-holder landing page' },

  { path: 'json-server', loadChildren: () => import('./json-server/json-server.module')
                                            .then( m => JsonServerModule), 
                                            title: 'Json-server landing page' },

  { path: 'nodeJs', loadChildren: () => import('./node/node.module')
                                            .then( m => NodeModule), 
                                            title: 'NodeJs landing page' },

  { path: '', component: LandingPageComponent, title: "Exercices pour m'exercer avec Angular" },

  { path: '**', component: PageNotFoundComponent }                                        
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
