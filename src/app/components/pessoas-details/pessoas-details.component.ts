import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PessoasService } from 'src/app/services/pessoas.service';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { PessoasEditComponent } from '../pessoas-edit/pessoas-edit.component';
import { EnderecosCreateComponent } from '../enderecos-create/enderecos-create.component';
import { EnderecosEditComponent } from '../enderecos-edit/enderecos-edit.component';
import { TipoPessoa, GetTipo } from 'src/app/utilities/TipoPessoaEnum';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pessoas-details',
  templateUrl: './pessoas-details.component.html',
  styleUrls: ['./pessoas-details.component.css']
})
export class PessoasDetailsComponent implements OnInit {

  pessoa: any;

  tipoPessoaEnum = TipoPessoa;

  activeNav = 1;
  countEnderecos = 0;
  countDepartamentos = 0;

  errors = 0;
  errorMessage = '';
  sucesso = 0;
  sucessoMessage = '';

  constructor(
    private pessoaService: PessoasService,
    private enderecoService: EnderecosService,
    private modalService: NgbModal,
    private navService: NgbNavModule,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPessoa(this.route.snapshot.params["id"]);
  }

  getPessoa(id: any) {
    this.pessoaService.get(id)
      .subscribe({
        next: (data) => {
          this.pessoa = data;
          this.countEnderecos = data.enderecos.length;
          this.countDepartamentos = data.departamentos.length;
        }, error: (error) => {
          console.log(error);
          this.errors++;
          this.errorMessage = "Erro ao buscar os dados da Pessoa";
        }
      });
  }

  atualizarObjeto(): void {
    this.getPessoa(this.route.snapshot.params["id"]);
  }

  showEditPessoa(): void {
    const result = this.modalService.open(PessoasEditComponent);
    result.componentInstance.id = this.pessoa.id;
    result.componentInstance.tipo = this.pessoa.tipo;
    result.componentInstance.nome = this.pessoa.nome;
    result.componentInstance.apelido = this.pessoa.apelido;
    result.componentInstance.cpf = this.pessoa.cpf;
    result.componentInstance.cnpj = this.pessoa.cnpj;
    result.componentInstance.cliente = this.pessoa.cliente;
    result.componentInstance.fornecedor = this.pessoa.fornecedor;
    result.componentInstance.colaborador = this.pessoa.colaborador;
    result.closed.subscribe(result => {
      if (result === "Updated") {
        this.sucesso++;
        this.sucessoMessage = "Pessoa atualizada com sucesso!";
        this.atualizarObjeto();
      }
    });
  }

  showCreateEndereco(): void {
    const result = this.modalService.open(EnderecosCreateComponent);
    result.componentInstance.pessoaId = this.pessoa.id;
    result.closed.subscribe(result => {
      if (result === "Created") {
        this.sucesso++;
        this.sucessoMessage = "Endereço criado com sucesso!";
        this.atualizarObjeto();
      }
    });
  }

  showEditEndereco(endereco: any): void {
    const result = this.modalService.open(EnderecosEditComponent);
    result.componentInstance.id = endereco.id;
    result.componentInstance.cep = endereco.cep;
    result.componentInstance.estado = endereco.estado;
    result.componentInstance.cidade = endereco.cidade;
    result.componentInstance.bairro = endereco.bairro;
    result.componentInstance.logradouro = endereco.logradouro;
    result.componentInstance.numero = endereco.numero;
    result.componentInstance.complemento = endereco.complemento;
    result.closed.subscribe(result => {
      if (result === "Updated") {
        this.sucesso++;
        this.sucessoMessage = "Endereço atualizado com sucesso!";
        this.atualizarObjeto();
      }
    });
  }

  getTipoPessoa(tipo: any): string {
    return GetTipo(tipo);
  }

  handleDelete(id: any): void {
    this.enderecoService.delete(id)
      .subscribe({
        next: () => {
          this.sucesso++;
          this.sucessoMessage = "Endereço removido com sucesso!";
          this.atualizarObjeto();
        }, error: (error) => {
          this.errors++;
          this.errorMessage = error.error;
        }
      });
  }

  formatDate(date: any): string {
    return date === null ? "" : new Date(date).toLocaleString();
  }

  getEnderecoCompleto(endereco: any): string {
    return endereco.cep + ", " + endereco.logradouro + ", " + endereco.numero + ", " + endereco.complemento + ", " + endereco.bairro + ", " + endereco.cidade + ", " + endereco.estado;
  }

}
