import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField: FormControl

  constructor() { 
    this.queryField = new FormControl()
  }

  ngOnInit(): void {
  }

  onSearch() {
    console.log(this.queryField.value)
  }
}
