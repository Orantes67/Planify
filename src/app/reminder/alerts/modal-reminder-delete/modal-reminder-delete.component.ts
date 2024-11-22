import { Component,Input,Output,EventEmitter } from '@angular/core';
import { RecordatoriosService } from '../../recordatorios.service';
import { Recordatorio } from '../../interfaces/recordatorio';

@Component({
  selector: 'app-modal-reminder-delete',
  templateUrl: './modal-reminder-delete.component.html',
  styleUrl: './modal-reminder-delete.component.css'
})
export class ModalReminderDeleteComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Input() recordatorioCreado!: Recordatorio;
  constructor( private recordatoriosService:RecordatoriosService){}
  deleteRecordatorio(){
    console.log('Recordatorio eliminado', this.recordatorioCreado);
    this.recordatoriosService.deleteRecordatorio(this.recordatorioCreado.recordatorio_id).subscribe(() => {
      this.cerrar.emit(); 
      });
  }
}
