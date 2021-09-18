import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup
  submitted: boolean = false 

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private alertModalService: AlertModalService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }

  hasError(field: string) {
    return this.form.get(field).errors
  }

  onSubmit() {
    this.submitted = true

    const curso = this.form.value
    if (this.form.valid) {
      this.cursosService.criar(curso).subscribe(
        success => this.alertModalService.showAlertSuccess(`Curso ${success.nome} criado com sucesso`),
        error => this.alertModalService.showAlertDanger('Não conseguimos criar esse curso, tente novamente !'),
        () => console.log('request completo')
      )
    }
  }

  onCancel() {
    this.submitted = false
    this.form.reset()
  }

}
