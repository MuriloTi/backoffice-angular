import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentosService } from 'src/app/services/departamentos.service';

@Component({
  selector: 'app-departamentos-create',
  templateUrl: './departamentos-create.component.html',
  styleUrls: ['./departamentos-create.component.css']
})
export class DepartamentosCreateComponent {

  colaboradores: any;

  @Input() titulo = '';
  @Input() responsavelId = 0;

  errors = 0;
  errorMessage: any;

  constructor(public activeModal: NgbActiveModal, private departamentoService: DepartamentosService){}

  postObject(){
    const departamento = {
      titulo: this.titulo,
      responsavelId: this.responsavelId,
    };

    this.departamentoService.post(departamento)
      .subscribe(() => {
        this.activeModal.close("Created");
      }, error => {
        console.log(error.error);
        this.errors++;
        this.errorMessage = error.error;
      });
  }

  save(){
    this.postObject();
  }

}
