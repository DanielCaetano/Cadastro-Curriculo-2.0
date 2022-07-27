import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, Observable, of} from 'rxjs';
import {
  Component,
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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validacoes } from 'src/app/_util/validacoes';
import { GraficoPorTipo } from 'src/app/_util/dashboard/graficoPorTipo';

declare var google: any;

@Component({
  selector: 'app-admin-buscar',
  templateUrl: './admin-buscar.component.html',
  styleUrls: ['./admin-buscar.component.css'],
})

export class AdminBuscarComponent implements OnInit {
  candidatos: Observable<Candidato[]>;
  displayedColumns = ['nome', 'cpf', 'telefone', 'status', 'actions'];
  dataSource= MatTableDataSource<Candidato>;


  form: FormGroup;

  carregando = false;
  pageEvent!: PageEvent;
  dadosStatus: number[] = [];
  dadosEscolaridade!: number[];

  private dadosPia: any;
  private dadosBar: any;

  private graficoPia = new GraficoPorTipo(this.candidatoService)
  private graficoBar = new GraficoPorTipo(this.candidatoService)

  constructor(
    private candidatoService: CandidatoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {


    this.candidatos = this.candidatoService.listar().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar lista de candidatos');
        return of([]);
      })
    );

    this.form = this.formBuilder.group({
      cpf: [''],
    });


  }

  ngOnInit() {
    this.graficoPia.start(['Aguardando', 'Aprovado', 'Reprovado'], 'status');
    this.graficoPia.obterDados().subscribe((dados) => {
      this.dadosPia = dados;
      this.init();
    });

    this.graficoBar.start([
      'Analfabeto',
      'Fundamental Completo',
      'Médio Incompleto',
      'Médio Completo',
      'Superior Incompleto',
      'Superior Completo',
      'Mestrado',
      'Doutorado',
    ], 'escolaridade');
    this.graficoBar.obterDados().subscribe((dados) => {
      this.dadosBar = dados;
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
    this.exibirBarChart();
  }

  exibirPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);
    chart.draw(this.obterDataTablePie('Status', 'Quantidade'), this.obterOpcoesPie(400, 400, 'status'));
  }

  exibirBarChart(): void {
    const el = document.getElementById('bar_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.obterDataTableBar('Escolaridade', 'Quantidade'),
    this.obterOpcoes(400, 500, 'escolaridade'));
  }

  obterDataTablePie(c1:string, c2:string): any {
    const data = new google.visualization.DataTable();
    data.addColumn('string', c1);
    data.addColumn('number', c2);
    data.addRows(this.dadosPia);
    return data;
  }

  obterDataTableBar(c1:string, c2:string): any {
    const data = new google.visualization.DataTable();
    data.addColumn('string', c1);
    data.addColumn('number', c2);
    data.addRows(this.dadosBar);
    return data;
  }

  obterOpcoesPie(altura:number, comprimento:number, tipo:string): any {
    return {
      title: "Quantidade de cadastros por "+tipo,
      width: comprimento,
      height: altura,
      'is3D':true,
    };
  }

  obterOpcoes(altura:number, comprimento:number, tipo:string): any {
    return {
      title: "Quantidade de cadastros por "+tipo,
      width: comprimento,
      height: altura,
    };
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
        console.log("Não deu certo");
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
    this.candidatos = this.candidatoService.bucarCpf(this.form.value.cpf);
  }
}
