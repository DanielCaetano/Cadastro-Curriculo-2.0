import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatoBuscarComponent, CandidatoCadastroComponent, HomeComponent } from './components';

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
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
