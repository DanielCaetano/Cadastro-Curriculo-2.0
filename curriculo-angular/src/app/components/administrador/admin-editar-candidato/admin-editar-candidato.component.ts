import { Validacoes } from './../../../_util/validacoes';
import { Candidato } from 'src/app/model/candidato/candidato';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatoService } from 'src/app/services/candidato/candidato.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-editar-candidato',
  templateUrl: './admin-editar-candidato.component.html',
  styleUrls: ['./admin-editar-candidato.component.css'],
})
export class AdminEditarCandidatoComponent implements OnInit {
  form: FormGroup;
  isLoggedIn: boolean = true;

  candidato: Candidato = {
    _id: '',
    nome: '',
    cpf: '',
    data_nascimento: '',
    email: '',
    telefone: '',
    escolaridade: '',
    funcao: '',
    status: '',
  };

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
      status: ['', Validators.compose([Validators.required])],
    });
  }
  get cpf() {
    return this.form.get('cpf');
  }

  ngOnInit(): void {
    this.candidato._id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.candidatoService.bucarId(this.candidato._id).subscribe((res) => {
      this.candidato = res;
      this.form.patchValue({
        nome: this.candidato.nome,
        cpf: this.candidato.cpf,
        data_nascimento: this.candidato.data_nascimento,
        email: this.candidato.email,
        telefone: this.candidato.telefone,
        escolaridade: this.candidato.escolaridade,
        funcao: this.candidato.funcao,
        status: this.candidato.status,
      });
    });
  }

  atualizar() {
    if (this.form.status == 'INVALID') {
      this.form.get('nome')?.markAllAsTouched();
      this.form.get('cpf')?.markAllAsTouched();
      this.form.get('data_nascimento')?.markAllAsTouched();
      this.form.get('email')?.markAllAsTouched();
      this.form.get('telefone')?.markAllAsTouched();
      this.form.get('escolaridade')?.markAllAsTouched();
      this.form.get('funcao')?.markAllAsTouched();
    } else {
      this.candidatoService
        .update(this.form.value, this.candidato._id)
        .subscribe(
          (res) => {
            console.log(res);
            this.onSuccess();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  onCancel() {
    this.router.navigate(['adm']);
  }

  private onSuccess() {
    this.snackBar.open('Candidato atualizado com sucesso!', '', {
      duration: 5000,
    });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }

  verificaValidTouched(campo: any) {
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched;
  }
}
