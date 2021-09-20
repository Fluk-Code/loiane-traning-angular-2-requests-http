import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField: FormControl
  readonly SERCH_URL: string
  results$: Observable<any>
  FIELDS: Array<string>
  total: number
  
  constructor(
    private http: HttpClient
  ) { 
    this.queryField = new FormControl()
    this.SERCH_URL = 'https://api.cdnjs.com/libraries'
    this.FIELDS = ['name','filename','version']
  }

  ngOnInit(): void {

    this.results$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1),
        debounceTime(200),
        distinctUntilChanged(),
        tap(value => console.log(value)),
        switchMap(value => this.http.get(this.SERCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS.join(',')
          }
        })),
        tap((res:any) => this.total = res.total),
        map((res: any) => res.results)
      )

  }

  onSearch() {
    let value = this.queryField.value?.trim()

    // const params = {
    //   search: value,
    //   fields: this.FIELDS.join(',')
    // }

    let params = new HttpParams()
    params = params.set('search', value)
    params = params.append('fields', this.FIELDS.join(','))

    if (value){
      this.results$ = this.http.get(this.SERCH_URL,{ params })
      .pipe(
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      )
    }

  }
}
