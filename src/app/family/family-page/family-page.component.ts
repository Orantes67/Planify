import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../services/family.service';
import { UserI } from '../../credentials/interfaces/user-i';
import { FamilyI } from '../interfaces/family-i';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
})
export class FamilyPageComponent implements OnInit {
  user: UserI | null = null;
  familyMembers: UserI[] = [];
  selectedFamily: FamilyI | null = null;

  constructor(
    private storageService: StorageService,
    private familyService: FamilyService
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.obtenerUsuario();
  }

  selectFamily(family: FamilyI | null): void {
    this.selectedFamily = family;
    if (family) {
      this.loadFamilyMembers(family.id_familia);
    } else this.familyMembers = [];
  }

  loadFamilyMembers(familyId: number | null): void {
    if (familyId)
      this.familyService.getUsersByFamily(familyId).subscribe({
        next: (members) => {
          this.familyMembers = members;
        },
        error: (err) =>
          console.error('Error al cargar miembros de la familia:', err),
      });
  }

  reloadUserData(): void {
    if (this.user?.usuario_id) {
      this.familyService.getUserById(this.user.usuario_id).subscribe({
        next: (updatedUser) => {
          this.user = { ...updatedUser };
          console.log(this.user);
        },
        error: (err) =>
          console.error('Error al recargar datos del usuario:', err),
      });
    }
  }
}
