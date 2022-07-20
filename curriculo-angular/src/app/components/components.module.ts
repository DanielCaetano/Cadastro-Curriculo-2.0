import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'

import { HomeComponent } from './home';
import { CandidatoBuscarComponent } from './candidato/candidato-buscar/candidato-buscar.component';
import { CandidatoCadastroComponent } from './candidato/candidato-cadastro/candidato-cadastro.component';
import { HeaderComponent } from './header';
import { NavComponent } from './nav';
import { FooterComponent} from './footer'
import { AppRoutingModule } from '../app-routing.module';
import { AdminBuscarComponent } from './administrador/admin-buscar/admin-buscar.component';
import { AdminEditarCandidatoComponent } from './administrador/admin-editar-candidato/admin-editar-candidato.component';
import { AdminCadastrarCandidatoComponent } from './administrador/admin-cadastrar-candidato/admin-cadastrar-candidato.component';

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

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule
   ],
  exports: [
    HomeComponent,
    CandidatoBuscarComponent,
    CandidatoCadastroComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
  ],
})
export class ComponentsModule {}
