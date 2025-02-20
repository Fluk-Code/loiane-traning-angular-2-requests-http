import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map, switchMap } from 'rxjs/operators';

import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';

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
    private alertModalService: AlertModalService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // this.activatedRoute.params.subscribe(
    //   (params: any) => {
    //     const id = params['id']
    //     const curso$ = this.cursosService.litarPorID(id)
    //     curso$.subscribe(
    //       curso => this.updateForm(curso)
    //     )
    //   }
    // )

    // this.activatedRoute.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.cursosService.listarPorID(id)) 
    //     // switchMap -> Se importa somente com a ultima req
    //     // concatMap -> Ordem das reqs importa
    //     // mergeMap -> Ordem das reqs nao importa
    //     // exhaustMap -> casos de login (aguarda a resp da req para execuar a proxima req)
    //   )
    //   .subscribe((curso: Curso) => this.updateForm(curso))

    const curso = this.activatedRoute.snapshot.data['curso']

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }

  // updateForm(curso): void {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  hasError(field: string) {
    return this.form.get(field).errors
  }

  onSubmit() {
    this.submitted = true

    const curso = this.form.value
    // if (this.form.valid) {
    //   if (this.form.value.id){ 
    //     this.cursosService.atualizar(this.form.value)
    //       .subscribe(
    //         succes => this.alertModalService.showAlertSuccess('Cruso alterado com sucesso'),
    //         error => this.alertModalService.showAlertDanger('Não foi possivel realizar a alteração, tente novamente !'),
    //         () => console.log('Update Completo')
    //       )
    //   }
    //   else {
    //     this.cursosService.criar(curso).subscribe(
    //       (curso: Curso) => {
    //         this.alertModalService.showAlertSuccess(`Curso ${curso.nome} criado com sucesso`)
    //         this.location.back()
    //       },
    //       error => this.alertModalService.showAlertDanger('Não conseguimos criar esse curso, tente novamente !'),
    //       () => console.log('request completo')
    //     )
    //   }
    // }

    if (this.form.valid) {

      const curso: Curso = this.form.value

      let msgSuccess = `Curso ${curso.nome} foi criado com sucesso.`
      let msgError = `Não foi possivel criar o curso ${curso.nome}, tente novamente !`
      if (curso.id){
        msgSuccess = `Curso ${curso.nome} foi atualizado com sucesso.`
        msgError = `Não foi possivel atualizar o curso ${curso.nome}, tente novamente !`
      }

      this.cursosService.save(curso)
        .subscribe(
          sucesso => {
            this.alertModalService.showAlertSuccess(msgSuccess)
            this.location.back()
          },
          error => this.alertModalService.showAlertDanger(msgError),
          () => console.log('Req salvar completa')
        )
    }
  }

  onCancel() {
    this.submitted = false
    this.form.reset()
  }

}
