import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { Validacoes } from 'src/app/_util/validacoes';
import { GraficoPie } from 'src/app/components/administrador/admin-buscar/graficoPie';

declare var google: any;

@Component({
  selector: 'app-admin-buscar',
  templateUrl: './admin-buscar.component.html',
  styleUrls: ['./admin-buscar.component.css'],
})
export class AdminBuscarComponent implements OnInit {
  candidatos: Observable<Candidato[]>;
  displayedColumns = ['nome', 'status', 'actions'];
  dataSource: MatTableDataSource<Candidato> | undefined;

  form: FormGroup;

  carregando = false;
  pageEvent!: PageEvent;
  dadosStatus: number[] = [];
  dadosEscolaridade!: number[];

  private dados: any;
  private graficoPie: GraficoPie = new GraficoPie(this.candidatoService);

  constructor(
    private candidatoService: CandidatoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {
    //this.candidatoService = new CandidatoServiceService();
    this.candidatos = this.candidatoService.listar().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar lista de candidatos');
        return of([]);
      })
    );

    this.form = this.formBuilder.group({
      cpf: ['', Validators.compose([Validacoes.ValidaCpf])],
    });

    this.graficoPie.startPie(['Aguardando', 'Aprovado', 'Reprovado']);
  }

  ngOnInit() {
    this.graficoPie.obterDados().subscribe((dados) => {
      this.dados = dados;
      this.init();
    });
  }

  init(): void {
    if (typeof google !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  exibirGraficos(): void {
    this.exibirPieChart();
  }

  exibirPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  obterDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  obterOpcoes(): any {
    return {
      title: 'Quantidade de cadastros primeiro semestre',
      width: 400,
      height: 300,
    };
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
    this.router.navigate(['candidato'], { relativeTo: this.route });
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

  onBuscar() {
    console.log(this.form.value);
    this.candidatos = this.candidatoService.bucarCpf(this.form.value.cpf);
  }
}
