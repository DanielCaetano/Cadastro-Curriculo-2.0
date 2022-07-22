import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidato } from 'src/app/model/candidato/candidato';
import { first, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CandidatoService {
  private readonly API_PATH = 'api/candidato';

  constructor(private httpClient: HttpClient) {}

  listar() {
    return this.httpClient.get<Candidato[]>(this.API_PATH).pipe(
      first(),
      tap((candidato) => console.log(candidato))
    );
  }

  cadastrar(record: Candidato) {
    return this.httpClient.post<Candidato[]>(this.API_PATH, record);
  }

  update(record: Candidato, id: string) {
    return this.httpClient.put<Candidato>(this.API_PATH + '/' + id, record);
  }

  deletar(id:String){
    return this.httpClient.delete<Candidato> (`{{this.API_PATH}}/{{id}}`)
  }

  bucarCpf(cpf: String){
    console.log(this.API_PATH+"/cpf/"+cpf);
    return this.httpClient.get<Candidato[]>(this.API_PATH+"/cpf/"+cpf)
    .pipe(
      first(),
      tap(candidato => console.log(candidato))
    );
  }

  quantidadePorStatus(status: String){
    console.log(this.API_PATH+"/status/"+status);
    return this.httpClient.get<number>(this.API_PATH+"/status/"+status)
    .pipe(
      first(),
      tap(res => console.log("resultado:", res))
    );
  }

  quantidadePorEscolaridade(escolaridade: String){
    return this.httpClient.get<number>(this.API_PATH+"/escolaridade/"+escolaridade)
    .pipe(
      first(),
      tap(res => console.log("resultado:", res))
    );
  }
}
