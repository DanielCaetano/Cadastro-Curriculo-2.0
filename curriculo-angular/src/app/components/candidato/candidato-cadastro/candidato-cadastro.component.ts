import { Router, ActivatedRoute } from '@angular/router';
import { CandidatoService } from './../../../services/candidato/candidato.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validacoes } from 'src/app/_util/validacoes';

@Component({
  selector: 'app-candidato-cadastro',
  templateUrl: './candidato-cadastro.component.html',
  styleUrls: ['./candidato-cadastro.component.css'],
})
export class CandidatoCadastroComponent implements OnInit {
  form: FormGroup;

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
    this.router.navigate(['candidato']);
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}
