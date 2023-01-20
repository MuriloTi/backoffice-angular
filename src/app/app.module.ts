import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PessoasListComponent } from './components/pessoas-list/pessoas-list.component';
import { PessoasCreateComponent } from './components/pessoas-create/pessoas-create.component';
import { PessoasEditComponent } from './components/pessoas-edit/pessoas-edit.component';
import { PessoasDetailsComponent } from './components/pessoas-details/pessoas-details.component';
import { HomeComponent } from './components/home/home.component';
import { DepartamentosListComponent } from './components/departamentos-list/departamentos-list.component';
import { DepartamentosCreateComponent } from './components/departamentos-create/departamentos-create.component';
import { DepartamentosEditComponent } from './components/departamentos-edit/departamentos-edit.component';
import { EnderecosCreateComponent } from './components/enderecos-create/enderecos-create.component';
import { EnderecosEditComponent } from './components/enderecos-edit/enderecos-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoasListComponent,
    PessoasCreateComponent,
    PessoasEditComponent,
    PessoasDetailsComponent,
    HomeComponent,
    DepartamentosListComponent,
    DepartamentosCreateComponent,
    DepartamentosEditComponent,
    EnderecosCreateComponent,
    EnderecosEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbNavModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PessoasCreateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
