import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalFamolyDeleteComponent } from '../alerts/modal-famoly-delete/modal-famoly-delete.component'
import { ModalFamilyExitComponent } from '../alerts/modal-family-exit/modal-family-exit.component';
import { ModalFamilyDeleteMiembroComponent } from '../alerts/modal-family-delete-miembro/modal-family-delete-miembro.component';
import { FamilyService } from '../services/family.service';
import { CredentialsService } from '../../credentials/services/credentials.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-family-dashboard',
  templateUrl: './family-dashboard.component.html',
  styleUrl: './family-dashboard.component.css'
})
export class FamilyDashboardComponent implements OnInit {
  usuarios: Usuario[]=[]
  constructor(private dialog: MatDialog,private family:FamilyService,private credentialsService:CredentialsService) {}
ngOnInit(): void {
  this.cargarUsuarios()
}
cargarUsuarios(){
  this.family.getAllFAMILY()
  this.credentialsService.getUsuarios().subscribe(data=>{
    this.usuarios=data
  })
}

  openDeletMiembroDialog(usuario: Usuario): void {
    this.dialog.open(ModalFamilyDeleteMiembroComponent, {
      width: '700px',
      data: { }
    });
  }
}
