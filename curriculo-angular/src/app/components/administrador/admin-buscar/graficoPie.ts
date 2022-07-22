import { CandidatoService } from 'src/app/services/candidato/candidato.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GraficoPie {
	readonly dados:any = [];


    readonly labelsPie = [
      ['Aguardando', 33],
        ['Aprovado', 68],
        ['Reprovado', 49]
    ];

	constructor(private candidatoService: CandidatoService) {}

	/**
	 * Retorna um observable contendo os dados a serem
	 * exibidos no gráfico.
	 *
	 * @return Observable<any>
	 */
	obterDados(): Observable<any> {
		return new Observable(observable => {
			observable.next(this.dados);
			observable.complete();
		});
	}

  public startPie(label:string[]){
    label.forEach((e) =>
      this.candidatoService.quantidadePorStatus(e).subscribe((res) => {
        this.dados.push([e, res]);
      })
    );
  }

}
