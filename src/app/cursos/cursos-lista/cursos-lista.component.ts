import { Component, OnInit } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CursosService } from '../cursos.service';
import { Cursos } from '../curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Cursos
  cursos$: Observable<Cursos>
  error$ = new Subject<boolean>()

  constructor(
    private cursoService: CursosService
  ) { }

  ngOnInit(): void {
    // this.cursoService.listar()
    //  .subscribe(response => this.cursos = response)

    this.onRefresh()
  }

  onRefresh(): void {
    this.cursos$ = this.cursoService.listar()
      .pipe(
        catchError( error => {
          console.log(error)
          this.error$.next(true)
          return of()
        })
      )

    // this.cursoService.listar().subscribe(
    //   cursos => console.log(cursos),
    //   error => console.error(error),
    //   () => console.log('Observable completo')
    // )
  }

}
