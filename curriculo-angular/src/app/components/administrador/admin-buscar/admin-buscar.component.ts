import { catchError, Observable, of, take, map, Subscription } from 'rxjs';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Candidato } from 'src/app/model/candidato/candidato';
import { CandidatoService } from 'src/app/services/candidato/candidato.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErroDialogComponent } from './../../../shared/components/dialog/erro/erro.component';

import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-buscar',
  templateUrl: './admin-buscar.component.html',
  styleUrls: ['./admin-buscar.component.css']
})
export class AdminBuscarComponent implements OnInit {

  candidatos: Observable<Candidato[]>;
  displayedColumns = ['nome', 'status', 'actions'];
  dataSource: MatTableDataSource<Candidato> | undefined;

  carregando = false;
  pageEvent!: PageEvent;
  dadosStatus: number[] = [];
  dadosEscolaridade!: number[];

  constructor(
    private candidatoService: CandidatoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    //this.candidatoService = new CandidatoServiceService();
    this.candidatos = this.candidatoService.listar().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar lista de candidatos');
        return of([]);
      })
    );
  }

  ngOnInit(): void {

  }

  carregarEscolaridade(escolaridade: string) {
    this.candidatoService
      .quantidadePorEscolaridade(escolaridade)
      .subscribe((res) => {
        this.dadosEscolaridade.push(res);
      });
  }

  onError(errorMsg: String) {
    this.dialog.open(ErroDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  //DELETAR
  onDelete(id: string) {
    this.candidatoService.deletar(id).subscribe(
      (res) => {
        console.log(res);
        this.onSuccess();
      },
      (error) => {
        console.log(error);
      }
    );
    this.candidatos = this.candidatoService.listar().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar lista de candidatos');
        return of([]);
      })
    );
  }
  private onSuccess() {
    this.snackBar.open('Candidato Remodido com sucesso!', '', {
      duration: 5000,
    });
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['adm']);
  }
}
