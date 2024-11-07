import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFamolyDeleteComponent } from './alerts/modal-famoly-delete/modal-famoly-delete.component';
import { ModalFamilyExitComponent } from './alerts/modal-family-exit/modal-family-exit.component';
import { ModalFamilyDeleteMiembroComponent } from './alerts/modal-family-delete-miembro/modal-family-delete-miembro.component';
import { FamilyJoinComponent } from './family-join/family-join.component';
import { FamilyDashboardComponent } from './family-dashboard/family-dashboard.component';



@NgModule({
  declarations: [
    ModalFamolyDeleteComponent,
    ModalFamilyExitComponent,
    ModalFamilyDeleteMiembroComponent,
    FamilyJoinComponent,
    FamilyDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FamilyModule{ }
