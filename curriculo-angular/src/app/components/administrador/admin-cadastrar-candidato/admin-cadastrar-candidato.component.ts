import { Router, ActivatedRoute } from '@angular/router';
import { CandidatoService } from './../../../services/candidato/candidato.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validacoes } from 'src/app/_util/validacoes';

@Component({
  selector: 'app-admin-cadastrar-candidato',
  templateUrl: './admin-cadastrar-candidato.component.html',
  styleUrls: ['./admin-cadastrar-candidato.component.css'],
})
export class AdminCadastrarCandidatoComponent implements OnInit {
  form: FormGroup;
  //@ViewChild('formTarefa', { static: true }) formTarefa: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private candidatoService: CandidatoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      cpf: [
        '',
        Validators.compose([Validators.required, Validacoes.ValidaCpf]),
      ],
      data_nascimento: ['', Validators.compose([Validacoes.MaiorQue18Anos])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      telefone: [
        '',
        Validators.compose([Validators.required, Validators.minLength(11)]),
      ],
      escolaridade: ['', Validators.compose([Validators.required])],
      funcao: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.status == 'INVALID') {
      this.form.get('nome')?.markAllAsTouched();
      this.form.get('cpf')?.markAllAsTouched();
      this.form.get('data_nascimento')?.markAllAsTouched();
      this.form.get('email')?.markAllAsTouched();
      this.form.get('telefone')?.markAllAsTouched();
      this.form.get('escolaridade')?.markAllAsTouched();
      this.form.get('funcao')?.markAllAsTouched();
    } else {
      this.candidatoService.cadastrar(this.form.value).subscribe(
        (result) => this.onSuccess(),
        (error) => this.onError()
      );
    }
  }

  onCancel() {
    this.router.navigate(['adm']);
  }

  private onSuccess() {
    this.snackBar.open('Candidato cadastrado com sucesso!', '', {
      duration: 5000,
    });
    setTimeout(() => {
      this.onCancel();
    }, 500);
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}
