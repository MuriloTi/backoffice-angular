import { Component, OnInit } from '@angular/core';
import { PessoasService } from 'src/app/services/pessoas.service';
import { TipoPessoa, GetTipo } from 'src/app/utilities/TipoPessoaEnum';
import { PessoasCreateComponent } from '../pessoas-create/pessoas-create.component';
import { PessoasEditComponent } from '../pessoas-edit/pessoas-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pessoas-list',
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.css']
})

export class PessoasListComponent implements OnInit {

  pessoas: any;
  filteredPessoas: any;
  nome = '';
  tipoPessoaEnum = TipoPessoa;
  sucesso = 0;
  sucessoMessage = '';
  errors = 0;
  errorMessage = '';
  count = 0;

  constructor(private pessoaService: PessoasService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getObjects();
  }

  getObjects(): void {
    this.pessoaService.getAll()
      .subscribe(data => {
        this.pessoas = data;
        this.filteredPessoas = data;
        this.count = data.length;
        this.errors = 0;
      }, error => {
        console.log(error);
        this.errors++;
        this.errorMessage = "Ocorreu um erro ao buscar os itens da API";
      });
  }

  atualizarLista(): void {
    this.getObjects();
  }

  showCreatePessoa(tipo: any): void {
    const result = this.modalService.open(PessoasCreateComponent);
    result.componentInstance.tipo = tipo;
    result.closed.subscribe(result => {
      if (result === "Created"){
        this.sucesso++;
        this.sucessoMessage = "Pessoa criada com sucesso!";
        this.atualizarLista();
      }
    });
  }

  showEditPessoa(pessoa: any): void {
    const result = this.modalService.open(PessoasEditComponent);
    result.componentInstance.id = pessoa.id;
    result.componentInstance.tipo = pessoa.tipo;
    result.componentInstance.nome = pessoa.nome;
    result.componentInstance.apelido = pessoa.apelido;
    result.componentInstance.cpf = pessoa.cpf;
    result.componentInstance.cnpj = pessoa.cnpj;
    result.componentInstance.cliente = pessoa.cliente;
    result.componentInstance.fornecedor = pessoa.fornecedor;
    result.componentInstance.colaborador = pessoa.colaborador;
    result.closed.subscribe(result => {
      if (result === "Updated"){
        this.sucesso++;
        this.sucessoMessage = "Pessoa atualizada com sucesso!";
        this.atualizarLista();
      }
    });
  }

  handleSearch(): void{
    this.filteredPessoas = this.pessoas.filter((item: any) => item.nome.toUpperCase().includes(this.nome.toUpperCase()));
    this.count = this.filteredPessoas.length;
  }

  getTipoPessoa(tipo: any): string{
    return GetTipo(tipo);
  }

  handleDelete(id: any): void{
    this.pessoaService.delete(id)
      .subscribe(() => {
        this.sucesso++;
        this.sucessoMessage = "Pessoa removida com sucesso!";
        this.atualizarLista();
      }, error => {
        this.errors++;
        this.errorMessage = error.error;
      });
  }

}
