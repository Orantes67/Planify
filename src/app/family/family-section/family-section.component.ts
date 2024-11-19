import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FamilyService } from '../services/family.service';
import { UserI } from '../../credentials/interfaces/user-i';
import { DialogDataI } from '../interfaces/dialogData-i';
import { FamilyI } from '../interfaces/family-i';
import { MatDialog } from '@angular/material/dialog';
import { ModalFamilyManageComponent } from '../alerts/modal-family-manage/modal-family-manage.component';
import { FamiliesDataI } from '../interfaces/familiesData-i';

@Component({
  selector: 'app-family-section',
  templateUrl: './family-section.component.html',
})
export class FamilySectionComponent {
  @Input() user: UserI | null = null;
  @Output() selectedFamily = new EventEmitter<FamilyI>();

  familias: FamilyI[] = [];
  familiesData: FamiliesDataI[] = [];
  isDropdownOpen = false; // Estado del dropdown
  selectedFamilyIn: FamilyI | null = null; // Familia seleccionada
  contextMenuOpen: FamilyI | null = null; // Familia con menú contextual abierto

  constructor(
    private familyService: FamilyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFamilies();
  }

  loadFamilies(): void {
    if (!this.user?.roles) return;

    this.familias = [];
    this.familiesData = [];

    this.user.roles.forEach((rol) => {
      this.familyService.getFamilyById(rol.familia_id).subscribe({
        next: (family) => {
          this.familias.push(family);
          const familyData: FamiliesDataI = {
            family: family,
            rol: rol.rol,
          };
          this.familiesData.push(familyData);
        },
        error: (error) => {
          console.error(
            `Error al cargar la familia con ID ${rol.familia_id}:`,
            error
          );
        },
      });
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectFamily(family: FamilyI): void {
    this.selectedFamilyIn = family; // Actualiza la familia seleccionada
    this.selectedFamily.emit(family); // Emite la familia seleccionada al componente padre
    this.isDropdownOpen = false; // Cierra el dropdown
  }

  openInputDialog(action: 'create' | 'join'): void {
    let dialogData: DialogDataI;

    if (action === 'create') {
      dialogData = {
        title: 'Crear familia',
        placeholder: 'Escribe el nombre de la familia',
      };
    } else {
      dialogData = {
        title: 'Unirse a una familia',
        placeholder: 'Escribe el código',
      };
    }

    const dialogRef = this.dialog.open(ModalFamilyManageComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && action === 'create') {
        this.createFamily(result);
      } else if (result && action === 'join') {
        this.joinFamily(result);
      }
    });
  }

  getRoleForFamily(familyId: number | null): string {
    if (familyId === null) {
      return 'Sin rol';
    }
    const familyData = this.familiesData.find(
      (data) => data.family.id_familia === familyId
    );
    return familyData ? familyData.rol : 'Sin rol';
  }

  joinFamily(familyIdInput: string) {
    const familyId = parseInt(familyIdInput, 10);
    if (this.user && !isNaN(familyId) && this.user.usuario_id !== undefined) {
      this.familyService
        .joinFamily(familyId, this.user.usuario_id, 'miembro')
        .subscribe({
          next: () => {
            console.log('Usuario añadido a la familia');
            this.loadFamilies();
          },
          error: (err) => console.error('Error al unirse a la familia', err),
        });
    } else {
      console.error(
        'El usuario no está definido o el ID de la familia no es válido.'
      );
    }
  }

  createFamily(familyName: string) {
    if (this.user && this.user.usuario_id !== undefined) {
      this.familyService
        .createFamily(
          { nombre: familyName, id_familia: null },
          this.user.usuario_id
        )
        .subscribe({
          next: (family) => {
            if (family.id_familia && this.user?.usuario_id) {
              this.familyService
                .joinFamily(family.id_familia, this.user.usuario_id, 'lider')
                .subscribe({
                  next: () => {
                    console.log('Familia creada y usuario añadido como líder');
                    this.loadFamilies;
                  },
                  error: (err) =>
                    console.error('Error al unirse como líder:', err),
                });
            }
          },
          error: (err) => console.error('Error al crear familia:', err),
        });
    }
  }

  toggleContextMenu(family: FamilyI): void {
    this.contextMenuOpen = this.contextMenuOpen === family ? null : family;
  }

  renameFamily(family: FamilyI): void {
    // Emite la familia para ser renombrada (tu lógica aquí)
    console.log(`Renombrar familia: ${family.nombre}`);
  }

  confirmDeleteFamily(family: FamilyI): void {
    if (family.id_familia)
      this.familyService.getUsersByFamily(family.id_familia).subscribe({
        next: (members) => {
          if (
            members.length === 1 &&
            members[0].usuario_id === this.user?.usuario_id
          ) {
            // Solo eliminar si el líder es el único miembro
            if (
              confirm(`¿Estás seguro de eliminar la familia ${family.nombre}?`)
            ) {
              this.deleteFamily(family);
            }
          } else {
            alert('No puedes eliminar esta familia porque tiene más miembros.');
          }
        },
        error: (err) => console.error('Error al verificar miembros:', err),
      });
  }

  deleteFamily(family: FamilyI): void {
    if (family.id_familia)
      this.familyService.removeMember(family.id_familia).subscribe({
        next: () => {
          this.familias = this.familias.filter(
            (f) => f.id_familia !== family.id_familia
          );
          console.log(`Familia ${family.nombre} eliminada.`);
        },
        error: (err) => console.error('Error al eliminar familia:', err),
      });
  }
}
