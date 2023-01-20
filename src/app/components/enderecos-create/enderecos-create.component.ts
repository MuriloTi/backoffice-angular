import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { ViaCEPService } from 'src/app/services/via-cep.service';

@Component({
  selector: 'app-enderecos-create',
  templateUrl: './enderecos-create.component.html',
  styleUrls: ['./enderecos-create.component.css']
})
export class EnderecosCreateComponent {

  @Input() pessoaId = 0;
  @Input() cep = '';
  @Input() estado = '';
  @Input() cidade = '';
  @Input() bairro = '';
  @Input() logradouro = '';
  @Input() numero = '';
  @Input() complemento = '';

  errors = 0;
  errorMessage = '';
  cepErrorMessage = '';

  constructor(public activeModal: NgbActiveModal, private enderecoService: EnderecosService, private viaCEPService: ViaCEPService) { }

  postObject() {
    const endereco = {
      pessoaId: this.pessoaId,
      cep: this.cep,
      estado: this.estado,
      cidade: this.cidade,
      bairro: this.bairro,
      logradouro: this.logradouro,
      numero: this.numero,
      complemento: this.complemento
    };

    this.enderecoService.post(endereco)
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

  handlePesquisarCEP() {
    this.viaCEPService.get(this.cep)
      .subscribe({
        next: (data) => {
          this.cep = data.cep;
          this.estado = data.uf;
          this.cidade = data.localidade;
          this.bairro = data.bairro;
          this.logradouro = data.logradouro;
          this.cepErrorMessage = '';
        }, error: (error) => {
          console.log(error);
          this.cepErrorMessage = "CEP Inválido !";
        }
      });
  }

}
