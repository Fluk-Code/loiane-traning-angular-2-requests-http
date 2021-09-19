import { HttpClient } from "@angular/common/http";

import { delay, take, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

export class CrudService<T> {

  private API_URL: string = environment.API

  constructor(
    protected http: HttpClient, private route
  ) {
    this.API_URL += route 
  }

  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(2000),
        tap(console.log)
      )
    
  }

  listById(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`)
      .pipe(
        take(1)
      )
  }

  private create(record: T) {
    return this.http.post(this.API_URL, record)
      .pipe(
        take(1)
      )
  }

  private update(record) {
    return this.http.put(`${this.API_URL}/${record.id}`, record)
      .pipe(
        take(1)
      )
  }

  save(record) {
    if(record.id) {
      return this.update(record)
    }
    return this.create(record)
  }

  remove(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`)
    .pipe(
      take(1)
    )
  }
}