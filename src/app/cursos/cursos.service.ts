import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../shared/services/crud.service';

import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends CrudService<Curso>{

  constructor(
    protected http: HttpClient
  ) { 
    super(http, 'cursos')
  }
}
 