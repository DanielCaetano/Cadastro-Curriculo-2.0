import { Router, ActivatedRoute } from '@angular/router';
import { CandidatoService } from './../../../services/candidato/candidato.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validacoes } from 'src/app/_util/validacoes';
import { GraficoPie } from 'src/app/_util/dashboard/graficoPie';

declare var google: any;
@Component({
  selector: 'app-admin-cadastrar-candidato',
  templateUrl: './admin-cadastrar-candidato.component.html',
  styleUrls: ['./admin-cadastrar-candidato.component.css']
})

export class AdminCadastrarCandidatoComponent implements OnInit {

  form: FormGroup;
  //@ViewChild('formTarefa', { static: true }) formTarefa: NgForm;
  private dados: any;

  constructor(
    private formBuilder: FormBuilder,
    private candidatoService: CandidatoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private graficoPie: GraficoPie
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required, Validacoes.ValidaCpf])],
      data_nascimento: [null],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      telefone: [null],
      escolaridade: [null],
      funcao: [null],
    });
  }

  ngOnInit(): void {
    this.graficoPie.obterDados().subscribe(
  		dados => {
  			this.dados = dados;
  			this.init();
  		});

  }

  init(): void {
  }

  onSubmit() {
    //if (this.formTarefa.form.valid) {
      this.candidatoService.cadastrar(this.form.value).subscribe(
        result => this.onSuccess(), error => this.onError());
      this.router.navigate(['candidato']);
   // }
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
