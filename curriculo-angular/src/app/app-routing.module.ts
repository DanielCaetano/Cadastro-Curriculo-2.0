import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatoBuscarComponent, CandidatoCadastroComponent, HomeComponent } from './components';
import { AdminBuscarComponent } from './components/administrador';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
