import { AbstractControl } from "@angular/forms";


export class Validacoes {
  static ValidaCpf(controle: AbstractControl) {
    const cpf = controle.value;
    console.log("CPF: "+cpf)
    let soma: number = 0;
    let resto: number;
    let valido: boolean;

    const regex = new RegExp('[0-9]{11}');

    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      !regex.test(cpf)
    )
      valido = false;
    else {
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) valido = false;

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) valido = false;
      valido = true;
    }

    if (valido) return null;

    return { cpfInvalido: true };
  }

  static MaiorQue18Anos(controle: AbstractControl) {
    const nascimento = controle.value;
    console.log("DATA: "+nascimento)
    const dia = nascimento[0]+nascimento[1]
    const mes = nascimento[2]+nascimento[3]
    const ano = nascimento[4]+nascimento[5]+nascimento[6]+nascimento[7]
    console.log("DIA "+dia+" mes: "+mes+" ano: "+ano)
    const hoje = new Date();
    const dataNascimento = new Date(ano, mes, dia, 1, 1, 1);
    const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 100; //18 anos em mili segundos...
    //const tempoLimite = 1000 * 60 * 60 * 24 * 365 * 18;
    //console.log("Tempo hoje: "+hoje.getTime())
    //console.log("Data Nascimento: "+dataNascimento.getTime())
    //console.log("Tempo do teste "+tempoParaTeste)
    //console.log("Tempo hoje: "+(hoje.getTime() - dataNascimento.getTime()))

    if ((hoje.getTime() - dataNascimento.getTime() >= -2657837769) && (hoje.getTime() - dataNascimento.getTime() <= tempoParaTeste)){
    //console.log("IDADE: "+(hoje.getTime() - dataNascimento.getTime()))
      return null;
    }
    return { menorDeIdade: true };
  }
}
