import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule} from '@angular/material/snack-bar';


import { HomeComponent } from './home';
import { CandidatoBuscarComponent } from './candidato/candidato-buscar/candidato-buscar.component';
import { CandidatoCadastroComponent } from './candidato/candidato-cadastro/candidato-cadastro.component';
import { HeaderComponent } from './header';
import { NavComponent } from './nav';
import { FooterComponent } from './footer';
import { AppRoutingModule } from '../app-routing.module';
import { AdminBuscarComponent } from './administrador/admin-buscar/admin-buscar.component';
import { AdminEditarCandidatoComponent } from './administrador/admin-editar-candidato/admin-editar-candidato.component';
import { AdminCadastrarCandidatoComponent } from './administrador/admin-cadastrar-candidato/admin-cadastrar-candidato.component';
import { GraficoPorTipo } from '../_util/dashboard/graficoPorTipo';
import { LoginComponent } from './administrador/login/login.component';


@NgModule({
  declarations: [
    HomeComponent,
    CandidatoBuscarComponent,
    CandidatoCadastroComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    AdminBuscarComponent,
    AdminEditarCandidatoComponent,
    AdminCadastrarCandidatoComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskModule.forChild(),
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    HomeComponent,
    CandidatoBuscarComponent,
    CandidatoCadastroComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    LoginComponent
  ],
  providers:[
    GraficoPorTipo
  ]
})
export class ComponentsModule {}
