import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class FamilySectionComponent implements OnChanges {
  @Input() user: UserI | null = null;
  @Output() selectedFamily = new EventEmitter<FamilyI | null>();
  @Output() updatedFamilies = new EventEmitter<boolean>();
  @Output() selectedFamilyRol = new EventEmitter<
    'lider' | 'miembro' | undefined
  >(); // Combinando el tipo string

  familias: FamilyI[] = [];
  familiesData: FamiliesDataI[] = [];
  isDropdownOpen = false;
  selectedFamilyIn: FamilyI | null = null;
  contextMenuOpen: FamilyI | null = null;

  constructor(
    private familyService: FamilyService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFamilies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      console.log('User changed:', changes['user'].currentValue);
      this.cdr.detectChanges();
      this.loadFamilies();
      console.log(this.familias);
    }
  }

  loadFamilies(): void {
    if (!this.user?.roles) return;

    console.log(this.user);

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
          this.cdr.detectChanges(); // Forzar la detección de cambios
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
    this.selectedFamilyIn = family;
    this.selectedFamily.emit(family);
    const role = this.getRoleForFamily(family.id_familia);
    this.selectedFamilyRol.emit(role); // Emitiendo el rol como string
    this.cdr.detectChanges();
    this.isDropdownOpen = false;
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

  getRoleForFamily(
    familyId: number | null | undefined
  ): 'lider' | 'miembro' | undefined {
    // Cambié a string para combinar ambas versiones
    if (familyId === null) {
      return 'miembro';
    }
    const familyData = this.familiesData.find(
      (data) => data.family.id_familia === familyId
    );
    return familyData ? familyData.rol : 'miembro';
  }

  joinFamily(familyIdInput: string) {
    const familyId = parseInt(familyIdInput, 10);
    if (this.user && !isNaN(familyId) && this.user.usuario_id !== undefined) {
      this.familyService
        .joinFamily(familyId, this.user.usuario_id, 'miembro')
        .subscribe({
          next: () => {
            console.log('Usuario añadido a la familia');
            this.updatedFamilies.emit();
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
                    this.updatedFamilies.emit();
                    this.loadFamilies();
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

  toggleContextMenu(family: FamilyI | null): void {
    if (family)
      this.contextMenuOpen = this.contextMenuOpen === family ? null : family;
  }

  renameFamily(family: FamilyI | null): void {
    if (!family) return;

    const dialogData: DialogDataI = {
      title: `Renombrar Familia: ${family.nombre}`,
      placeholder: 'Nuevo nombre de la familia',
    };

    const dialogRef = this.dialog.open(ModalFamilyManageComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((newName) => {
      if (newName && family.id_familia) {
        this.familyService
          .updateFamilyById(family.id_familia, {
            nombre: newName,
            id_familia: family.id_familia,
          })
          .subscribe({
            next: (updatedFamily) => {
              console.log('Familia renombrada:', updatedFamily);
              this.updatedFamilies.emit(true);
              this.resetSelectedItems();
              this.loadFamilies();
            },
            error: (err) => {
              console.error('Error al renombrar la familia:', err);
            },
          });
      }
    });
  }

  confirmDeleteFamily(family: FamilyI | null): void {
    if (family)
      if (family.id_familia)
        this.familyService.getUsersByFamily(family.id_familia).subscribe({
          next: (members) => {
            console.log(members);
            
            if (
              members.length === 1 &&
              members[0].usuario_id === this.user?.usuario_id
            ) {
              if (
                confirm(
                  `¿Estás seguro de eliminar la familia ${family.nombre}?`
                )
              ) {
                this.deleteFamily(family);
              }
            } else {
              alert(
                'No puedes eliminar esta familia porque tiene más miembros.'
              );
            }
          },
          error: (err) => console.error('Error al verificar miembros:', err),
        });
  }

  deleteFamily(family: FamilyI): void {
    if (family.id_familia) {
      this.familyService.deleteFamily(family.id_familia).subscribe({
        next: () => {
          console.log(`Familia ${family.nombre} eliminada.`);
          this.resetSelectedItems();
          this.loadFamilies();
        },
        error: (err) => console.error('Error al eliminar familia:', err),
      });
    }
  }

  resetSelectedItems(): void {
    this.selectedFamilyIn = null;
    this.isDropdownOpen = false;
    this.selectedFamily.emit(null);
  }
}
