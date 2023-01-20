import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPessoa, GetTipo } from 'src/app/utilities/TipoPessoaEnum';
import { PessoasService } from 'src/app/services/pessoas.service';

@Component({
  selector: 'app-pessoas-create',
  templateUrl: './pessoas-create.component.html',
  styleUrls: ['./pessoas-create.component.css']
})
export class PessoasCreateComponent {

  @Input() tipo = TipoPessoa.Fisica;
  @Input() nome = '';
  @Input() apelido = '';
  @Input() cpf = '';
  @Input() cnpj = '';
  @Input() cliente = false;
  @Input() fornecedor = false;
  @Input() colaborador = false;

  tipoPessoaEnum = TipoPessoa;
  errors = 0;
  errorMessage: any;

  constructor(public activeModal: NgbActiveModal, private pessoasService: PessoasService) { }

  getTipoPessoa() {
    return GetTipo(this.tipo);
  }

  postObject() {
    const pessoa = {
      tipo: this.tipo,
      nome: this.nome,
      apelido: this.apelido,
      cpf: this.cpf,
      cnpj: this.cnpj,
      cliente: this.cliente,
      fornecedor: this.fornecedor,
      colaborador: this.colaborador
    };

    this.pessoasService.post(pessoa)
      .subscribe({
        next: () => {
          this.activeModal.close("Created");
        }, error: (error) => {
          console.log(error.error);
          this.errors++;
          this.errorMessage = error.error;
        }
      });
  }

  save() {
    this.postObject();
  }

}
