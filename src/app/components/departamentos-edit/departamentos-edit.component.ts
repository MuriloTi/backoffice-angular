import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentosService } from 'src/app/services/departamentos.service';

@Component({
  selector: 'app-departamentos-edit',
  templateUrl: './departamentos-edit.component.html',
  styleUrls: ['./departamentos-edit.component.css']
})
export class DepartamentosEditComponent {

  colaboradores: any;

  @Input() id = 0;
  @Input() titulo = '';
  @Input() responsavelId = 0;

  errors = 0;
  errorMessage: any;

  constructor(public activeModal: NgbActiveModal, private departamentoService: DepartamentosService){}

  updateObject(){
    const departamento = {
      titulo: this.titulo,
      responsavelId: this.responsavelId,
    };

    this.departamentoService.update(this.id, departamento)
      .subscribe(() => {
        this.activeModal.close("Updated");
      }, error => {
        console.log(error.error);
        this.errors++;
        this.errorMessage = error.error;
      });
  }

  save(){
    this.updateObject();
  }

}
