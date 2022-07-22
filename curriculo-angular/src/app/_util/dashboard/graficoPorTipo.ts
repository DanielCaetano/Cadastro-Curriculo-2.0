import { CandidatoService } from 'src/app/services/candidato/candidato.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GraficoPorTipo {
	readonly dados:any = [];

	constructor(private candidatoService: CandidatoService) {}

	obterDados(): Observable<any> {
		return new Observable(observable => {
			observable.next(this.dados);
			observable.complete();
		});
	}

  public start(label:string[], tipo: string){
    for (let e in label){
      this.candidatoService.quantidadePor(label[e], tipo).subscribe((res) => {
        this.dados.push([label[e], res]);
      })
    }
  }

}
