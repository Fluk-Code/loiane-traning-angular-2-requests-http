import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveSearchRoutingModule } from './reactive-search-routing.module';
import { ReactiveSearchComponent } from './reactive-search/reactive-search.component';
import { LibSearchComponent } from './lib-search/lib-search.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReactiveSearchComponent, LibSearchComponent],
  imports: [
    CommonModule,
    ReactiveSearchRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveSearchModule { }
