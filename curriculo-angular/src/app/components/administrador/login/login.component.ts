import { Router } from '@angular/router';
import { CandidatoService } from 'src/app/services/candidato/candidato.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  private email:string = 'padawan@colmeia.com';
  private senha:string = 'qwe123';

  form = this.fb.group({
    email: ['',
      [Validators.email, Validators.required],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private candidatoService: CandidatoService, private fb: FormBuilder, private router: Router,) {}

  onSubmit(): void {
    console.log("ENVIando "+this.form.valid)
    if (this.form.valid) {

      this.router.navigate(['adm']);
      //this.candidatoService.login(this.form.value);
    }
  }
  login(log:string, senha:string):Boolean{
    if(log == this.email){
      return true;
    }
    return false;
  }
}
