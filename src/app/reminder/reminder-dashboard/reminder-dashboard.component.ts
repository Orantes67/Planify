import { Component,OnInit,Input } from '@angular/core';
import { Recordatorio } from '../interfaces/recordatorio';
import { RecordatoriosService } from '../recordatorios.service';
import { iif } from 'rxjs';
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

modalAbiertoEditar = false;
modalAbiertoDelete = false;
recordatorioSeleccionado!: Recordatorio;
  abrirModal(recordatorio:Recordatorio,id:number) {
    this.recordatorioSeleccionado = { ...recordatorio };
    if(id==1){
      this.modalAbiertoEditar = true;
    }else if(id==2){
      this.modalAbiertoDelete = true;
    }
  }

  cerrarModal() {
    this.cargarRecordatorios();
    this.modalAbiertoEditar = false;
    this.modalAbiertoDelete = false;
  }
}
