import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { tap } from 'rxjs/operators'

import { Cursos } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = ' http://localhost:3000/cursos';

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
