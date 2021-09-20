import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField: FormControl
  readonly SERCH_URL: string
  results$: Observable<any>
  fields: Array<string>
  total: number
  
  constructor(
    private http: HttpClient
  ) { 
    this.queryField = new FormControl()
    this.SERCH_URL = 'https://api.cdnjs.com/libraries'
    this.fields = ['name','filename','version']
  }

  ngOnInit(): void {
  }

  onSearch() {
    let value = this.queryField.value?.trim()

    // const params = {
    //   search: value,
    //   fields: this.fields.join(',')
    // }

    let params = new HttpParams()
    params = params.set('search', value)
    params = params.append('fields', this.fields.join(','))

    if (value){
      this.results$ = this.http.get(this.SERCH_URL,{ params })
      .pipe(
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      )
    }

  }
}
