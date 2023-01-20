import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PessoasDetailsComponent } from './components/pessoas-details/pessoas-details.component';
import { PessoasListComponent } from './components/pessoas-list/pessoas-list.component';
import { DepartamentosListComponent } from './components/departamentos-list/departamentos-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pessoas', component: PessoasListComponent },
  { path: 'pessoas/:id', component: PessoasDetailsComponent },
  { path: 'departamentos', component: DepartamentosListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
