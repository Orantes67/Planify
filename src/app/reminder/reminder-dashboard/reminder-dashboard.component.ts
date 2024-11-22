import { Component,OnInit,Input } from '@angular/core';
import { Recordatorio } from '../interfaces/recordatorio';
import { RecordatoriosService } from '../recordatorios.service';
@Component({
  selector: 'app-reminder-dashboard',
  templateUrl: './reminder-dashboard.component.html',
  styleUrl: './reminder-dashboard.component.css'
})
export class ReminderDashboardComponent implements OnInit  {
  recordatorios: Recordatorio[]=[]
  mostrarFormulario: boolean = false;
  constructor(private recordatorioservice:RecordatoriosService){}


 ngOnInit(): void {
  this.cargarRecordatorios()
}
cargarRecordatorios(){
this.recordatorioservice.getRecordatorios().subscribe(data=>{
  this.recordatorios=data
  console.log(data)
}
)}


toggleFormulario(): void {
  this.mostrarFormulario = !this.mostrarFormulario;
}

modalAbierto = false;
recordatorioSeleccionado!: Recordatorio;
  abrirModal(recordatorio:Recordatorio) {
    this.recordatorioSeleccionado = { ...recordatorio }; 
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.cargarRecordatorios();
    this.modalAbierto = false;
  }
}
