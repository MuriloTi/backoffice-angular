import { Component } from '@angular/core';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { PessoasService } from 'src/app/services/pessoas.service';
import { DepartamentosCreateComponent } from '../departamentos-create/departamentos-create.component';
import { DepartamentosEditComponent } from '../departamentos-edit/departamentos-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-departamentos-list',
  templateUrl: './departamentos-list.component.html',
  styleUrls: ['./departamentos-list.component.css']
})
export class DepartamentosListComponent {

  departamentos: any;
  filteredDepartamentos: any;
  colaboradores: any;
  titulo = '';
  sucesso = 0;
  sucessoMessage = '';
  errors = 0;
  errorMessage = '';
  count = 0;

  constructor(private departamentoService: DepartamentosService, private pessoaService: PessoasService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getObjects();
  }

  getObjects(): void {
    this.departamentoService.getAll()
      .subscribe({
        next: (data) => {
          const result = data.sort((a: any, b: any) => a.titulo.localeCompare(b.title))
          this.departamentos = result;
          this.filteredDepartamentos = result;
          this.count = result.length;
          this.pessoaService.getAll()
            .subscribe({
              next: (data) => {
                const result = data.filter((item: any) => item.colaborador === true).sort((a: any, b: any) => a.nome.localeCompare(b.nome));
                this.colaboradores = result;
                this.errors = 0;
              }, error: (error) => {
                console.log(error);
                this.errors++;
                this.errorMessage = "Ocorreu um erro ao buscar os itens da API";
              }
            });
        }, error: (error) => {
          console.log(error);
          this.errors++;
          this.errorMessage = "Ocorreu um erro ao buscar os itens da API";
        }
      });
  }

  atualizarLista(): void {
    this.getObjects();
  }

  showCreateDepartamento(): void {
    const result = this.modalService.open(DepartamentosCreateComponent);
    result.componentInstance.colaboradores = this.colaboradores;
    result.closed.subscribe(result => {
      if (result === "Created") {
        this.sucesso++;
        this.sucessoMessage = "Departamento criado com sucesso!";
        this.atualizarLista();
      }
    });
  }

  showEditDepartamento(departamento: any): void {
    const result = this.modalService.open(DepartamentosEditComponent);
    result.componentInstance.id = departamento.id;
    result.componentInstance.titulo = departamento.titulo;
    result.componentInstance.responsavelId = departamento.responsavelId;
    result.componentInstance.colaboradores = this.colaboradores;
    result.closed.subscribe(result => {
      if (result === "Updated") {
        this.sucesso++;
        this.sucessoMessage = "Departamento atualizado com sucesso!";
        this.atualizarLista();
      }
    });
  }

  handleSearch(): void {
    this.filteredDepartamentos = this.departamentos.filter((item: any) => item.titulo.toUpperCase().includes(this.titulo.toUpperCase()));
    this.count = this.filteredDepartamentos.length;
  }

  handleDelete(id: any): void {
    this.departamentoService.delete(id)
      .subscribe({
        next: () => {
          this.sucesso++;
          this.sucessoMessage = "Departamento removido com sucesso!";
          this.atualizarLista();
        }, error: (error) => {
          this.errors++;
          this.errorMessage = error.error;
        }
      });
  }

}
