import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { tap } from 'rxjs/operators'

import { Cursos } from './curso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get<Cursos>(this.API)
      .pipe(
        tap(console.log)
      )
  }
}
