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
  selectedFamilyRol: 'lider' | 'miembro' | undefined = 'miembro'; // Resolución combinada, usando string

  constructor(
    private storageService: StorageService,
    private familyService: FamilyService
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.obtenerUsuario();
  }

  asignSelectedFamilyRol(rol: 'lider' | 'miembro' | undefined): void {
    this.selectedFamilyRol = rol;
  }

  selectFamily(family: FamilyI | null): void {
    this.selectedFamily = family;
    if (family) {
      this.loadFamilyMembers(family.id_familia);
    } else {
      this.familyMembers = [];
      this.selectedFamilyRol = 'miembro';
    }
  }

  loadFamilyMembers(familyId: number | null | undefined): void {
    if (familyId) {
      this.familyService.getUsersByFamily(familyId).subscribe({
        next: (members) => {
          this.familyMembers = members;
        },
        error: (err) =>
          console.error('Error al cargar miembros de la familia:', err),
      });
    }
  }

  updatedFamily() {
    this.loadFamilyMembers(this.selectedFamily?.id_familia);
  }

  reloadUserData(): void {
    if (this.user?.usuario_id) {
      this.familyService.getUserById(this.user.usuario_id).subscribe({
        next: (updatedUser) => {
          this.user = { ...updatedUser };
        },
        error: (err) =>
          console.error('Error al recargar datos del usuario:', err),
      });
    }
  }
}
