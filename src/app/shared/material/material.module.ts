import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    // MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ]
})
export class MaterialModule { }
