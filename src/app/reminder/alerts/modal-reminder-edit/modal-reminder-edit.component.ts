import { Component,Output,EventEmitter,Input } from '@angular/core';
import { Recordatorio } from '../../interfaces/recordatorio';
import { RecordatoriosService } from '../../recordatorios.service';
@Component({
  selector: 'app-modal-reminder-edit',
  templateUrl: './modal-reminder-edit.component.html',
  styleUrl: './modal-reminder-edit.component.css'
})
export class ModalReminderEditComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Input() recordatorioCreado!: Recordatorio;
  correos: string = '';
  constructor( private recordatoriosService:RecordatoriosService){}
  editarRecordatorio(){
    const fechaISO = new Date(this.recordatorioCreado.fecha_hora).toISOString();
    this.recordatorioCreado.fecha_hora = fechaISO;
    console.log('Recordatorio editado', this.recordatorioCreado);
    this.recordatoriosService.updateRecordatorio(this.recordatorioCreado).subscribe(() => {
      this.cerrar.emit(); 
      });
  }


}
