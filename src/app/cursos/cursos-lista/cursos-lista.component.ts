import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos.service';
import { Cursos } from '../curso';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Cursos
  cursos$: Observable<Cursos>

  constructor(
    private cursoService: CursosService
  ) { }

  ngOnInit(): void {
    // this.cursoService.listar()
    //  .subscribe(response => this.cursos = response)

    this.cursos$ = this.cursoService.listar()
  }

}
