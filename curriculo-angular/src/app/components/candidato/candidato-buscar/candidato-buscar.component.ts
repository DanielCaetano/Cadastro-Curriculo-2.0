import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidato } from './../../../model/candidato/candidato';
import { catchError, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatoService } from 'src/app/services/candidato/candidato.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErroDialogComponent } from './../../../shared/components/dialog/erro/erro.component';
import { Validacoes } from 'src/app/_util/validacoes';

@Component({
  selector: 'app-candidato-buscar',
  templateUrl: './candidato-buscar.component.html',
  styleUrls: ['./candidato-buscar.component.css'],
})
export class CandidatoBuscarComponent implements OnInit {
  candidatos: Observable<Candidato[]>;
  displayedColumns = ['nome', 'status', 'actions'];

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private candidatoService: CandidatoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar

  ) {
    this.candidatos = this.candidatoService.listar().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar lista de candidatos');
        return of([]);
      })
    );

    this.form = this.formBuilder.group({
      cpf: [
        '',
          Validators.compose([Validacoes.ValidaCpf])
      ],
    });
  }

  onError(errorMsg: String) {
    this.dialog.open(ErroDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['cadastro'], { relativeTo: this.route });
  }

  onBuscar(){
    console.log(this.form.value);
    candidatoCPF: Observable<Candidato[]>;
    const candidatoCPF  = this.candidatoService.bucarCpf(this.form.value.cpf);
    if(candidatoCPF){
      this.candidatos = candidatoCPF
      this.candidatos.forEach(element => {
        console.log("Element: "+element)
      });
    }else{
      this.snackBar.open('Cadidato não encontrado', '', { duration: 5000 });
    }


  }

  ngOnInit(): void {
  }
}
