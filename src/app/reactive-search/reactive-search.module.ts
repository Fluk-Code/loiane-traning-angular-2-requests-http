import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveSearchRoutingModule } from './reactive-search-routing.module';
import { ReactiveSearchComponent } from './reactive-search/reactive-search.component';


@NgModule({
  declarations: [ReactiveSearchComponent],
  imports: [
    CommonModule,
    ReactiveSearchRoutingModule
  ]
})
export class ReactiveSearchModule { }
