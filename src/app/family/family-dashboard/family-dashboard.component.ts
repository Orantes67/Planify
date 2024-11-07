import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalFamolyDeleteComponent } from '../alerts/modal-famoly-delete/modal-famoly-delete.component'

@Component({
  selector: 'app-family-dashboard',
  templateUrl: './family-dashboard.component.html',
  styleUrl: './family-dashboard.component.css'
})
export class FamilyDashboardComponent {
  constructor(private dialog: MatDialog) {}

  openDeleteDialog(): void {
    this.dialog.open(ModalFamolyDeleteComponent, {
      width: '300px',
      data: { }
    });
  }
}
