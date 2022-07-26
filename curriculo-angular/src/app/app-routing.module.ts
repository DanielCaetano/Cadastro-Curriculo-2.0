import { AdminEditarCandidatoComponent } from './components/administrador/admin-editar-candidato/admin-editar-candidato.component';
import { AdminCadastrarCandidatoComponent } from './components/administrador/admin-cadastrar-candidato/admin-cadastrar-candidato.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CandidatoBuscarComponent,
  CandidatoCadastroComponent,
  HomeComponent
} from './components';
import { AdminBuscarComponent } from './components/administrador';
import { LoginComponent } from './components/administrador/login/login.component';

const routes: Routes = [
  {
		path: "",
		component: HomeComponent
	},
  {
		path: "candidato",
		component: CandidatoBuscarComponent
	},
	{
		path: "candidato/cadastro",
		component: CandidatoCadastroComponent
	},
  {
    path:"adm",
    component: AdminBuscarComponent
  },
  {
    path:"adm/login",
    component: LoginComponent
  },
  {
    path:"adm/candidato",
    component: AdminCadastrarCandidatoComponent
  },
  {
    path:"adm/editar/:id",
    component: AdminEditarCandidatoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
