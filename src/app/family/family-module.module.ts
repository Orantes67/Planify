import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog'; // Asegúrate de importar MatDialogModule
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule si usas botones de Angular Material
import { ModalFamolyDeleteComponent } from './alerts/modal-famoly-delete/modal-famoly-delete.component';
import { ModalFamilyExitComponent } from './alerts/modal-family-exit/modal-family-exit.component';
import { ModalFamilyDeleteMiembroComponent } from './alerts/modal-family-delete-miembro/modal-family-delete-miembro.component';
import { FamilyJoinComponent } from './family-join/family-join.component';
import { FamilyDashboardComponent } from './family-dashboard/family-dashboard.component';

import { FamilyPageComponent } from './family-page/family-page.component';


=======
import { FamilySectionComponent } from './family-section/family-section.component';


@NgModule({
  declarations: [
    ModalFamolyDeleteComponent,
    ModalFamilyExitComponent,
    ModalFamilyDeleteMiembroComponent,
    FamilyJoinComponent,
    FamilyDashboardComponent,

    FamilyPageComponent
=======
    FamilySectionComponent

  ],
  imports: [
    CommonModule,
    MatDialogModule,     
    MatButtonModule,     
    MatCommonModule
  ],
  exports: [
    ModalFamolyDeleteComponent,
    ModalFamilyExitComponent,
    ModalFamilyDeleteMiembroComponent,
    FamilyJoinComponent,
    FamilyDashboardComponent,
    MatCommonModule
  ]
})
export class FamilyModule { }
