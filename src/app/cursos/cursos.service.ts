import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { delay, tap, take } from 'rxjs/operators'

import { Curso, Cursos } from './curso';
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
        delay(2000),
        tap(console.log)
      )
  }

  listarPorID(id: number) {
    return this.http.get<Curso>(`${this.API}/${id}`)
      .pipe(
        take(1)
      )
  }

  criar(curso: Curso) {
    return this.http.post(this.API, curso)
      .pipe(
        take(1)
      )
  }
}
