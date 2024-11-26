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
import { ModalFamilyInviteComponent } from '../modal-family-invite/modal-family-invite.component';
import { Recordatorio } from '../../reminder/interfaces/recordatorio';

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
  >();

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
    if (this.user) {
      this.loadFamilies();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.loadFamilies();
    }
  }

  loadFamilies(): void {
    if (!this.user || !this.user.roles || this.user.roles.length === 0) {
      this.familias = [];
      this.familiesData = [];
      this.cdr.detectChanges();
      return;
    }

    // Reiniciar datos antes de cargar nuevas familias
    this.familias = [];
    this.familiesData = [];

    this.user.roles.forEach((rol) => {
      this.familyService.getFamilyById(rol.familia_id).subscribe({
        next: (family) => {
          if (family) {
            this.familias.push(family);
            this.familiesData.push({ family, rol: rol.rol });
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(
            `Error al cargar la familia con ID ${rol.familia_id}:`,
            err
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
    this.selectedFamilyRol.emit(role);
    this.isDropdownOpen = false;
  }

  openInputDialog(action: 'create' | 'join'): void {
    const dialogData: DialogDataI =
      action === 'create'
        ? {
            title: 'Crear familia',
            placeholder: 'Escribe el nombre de la familia',
          }
        : { title: 'Unirse a una familia', placeholder: 'Escribe el código' };

    const dialogRef = this.dialog.open(ModalFamilyManageComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'create') {
          this.createFamily(result);
        } else if (action === 'join') {
          this.joinFamily(result);
        }
      }
    });
  }

  getRoleForFamily(
    familyId: number | null | undefined
  ): 'lider' | 'miembro' | undefined {
    const familyData = this.familiesData.find(
      (data) => data.family.id_familia === familyId
    );
    return familyData?.rol;
  }

  joinFamily(familyIdInput: string): void {
    const familyId = parseInt(familyIdInput, 10);
    if (this.user && !isNaN(familyId)) {
      this.familyService
        .joinFamily(familyId, this.user.usuario_id, 'miembro')
        .subscribe({
          next: () => {
            console.log('Unido a la familia correctamente.');
            this.updatedFamilies.emit();
            this.loadFamilies();
          },
          error: (err) => console.error('Error al unirse a la familia:', err),
        });
    } else {
      console.error(
        'El usuario no está definido o el ID de la familia no es válido.'
      );
    }
  }

  createFamily(familyName: string): void {
    if (this.user) {
      this.familyService
        .createFamily(
          { nombre: familyName, id_familia: null },
          this.user.usuario_id
        )
        .subscribe({
          next: (family) => {
            if (family.id_familia && this.user) {
              this.familyService
                .joinFamily(family.id_familia, this.user.usuario_id, 'lider')
                .subscribe({
                  next: () => {
                    console.log('Familia creada y usuario añadido como líder.');
                    this.updatedFamilies.emit();
                    this.loadFamilies();
                  },
                  error: (err) =>
                    console.error('Error al unirse como líder:', err),
                });
            }
          },
          error: (err) => console.error('Error al crear la familia:', err),
        });
    }
  }

  toggleContextMenu(family: FamilyI | null): void {
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
            next: () => {
              console.log('Familia renombrada correctamente.');
              this.updatedFamilies.emit(true);
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
    if (!family || !family.id_familia) return;

    this.familyService.getUsersByFamily(family.id_familia).subscribe({
      next: (members) => {
        if (
          members.length === 1 &&
          members[0].usuario_id === this.user?.usuario_id
        ) {
          const confirmed = confirm(
            `¿Estás seguro de eliminar la familia ${family.nombre}?`
          );
          if (confirmed) {
            this.deleteFamily(family);
          }
        } else {
          alert('No puedes eliminar esta familia porque tiene más miembros.');
        }
      },
      error: (err) =>
        console.error('Error al verificar los miembros de la familia:', err),
    });
  }

  deleteFamily(family: FamilyI): void {
    if (!family.id_familia) return;

    this.familyService.deleteFamily(family.id_familia).subscribe({
      next: () => {
        console.log(`Familia ${family.nombre} eliminada.`);
        this.loadFamilies();
        this.resetSelectedItems();
      },
      error: (err) => console.error('Error al eliminar la familia:', err),
    });
  }

  inviteToFamily(email: string): void {
    const invite: Recordatorio = {
      notificacion_id: 0,
      titulo: `Invitación a la familia ${this.selectedFamilyIn?.nombre}`,
      contenido: `Codigo de la familia: ${this.selectedFamilyIn?.id_familia} unete con él`,
      fecha_hora: new Date(new Date().getTime() + 1 * 30 * 1000).toISOString(),
      evento_id: null,
      familia_id: null,
      usuario_id: 0,
      categoria: '',
      correo_destinatario: [email],
    };

    if (!email) {
      console.error('El correo es inválido.');
      return;
    }

    if (!this.selectedFamilyIn) {
      console.error(
        'No hay una familia seleccionada para enviar la invitación.'
      );
      return;
    }

    const familyId = this.selectedFamilyIn.id_familia;

    // Llama al servicio para enviar el correo
    this.familyService.sendFamilyInvite(email, familyId).subscribe({
      next: () => {
        console.log(`Invitación enviada a ${email}.`);
        alert(`Se ha enviado una invitación a ${email}.`);
      },
      error: (err) => {
        console.error('Error al enviar la invitación:', err);
        alert('Ocurrió un error al enviar la invitación.');
      },
    });
  }

  openInviteDialog(): void {
    const dialogRef = this.dialog.open(ModalFamilyInviteComponent, {
      width: '400px',
      data: { familyName: this.selectedFamilyIn?.nombre || 'la familia' },
    });

    dialogRef.afterClosed().subscribe((email) => {
      if (email) {
        this.inviteToFamily(email);
      }
    });
  }

  resetSelectedItems(): void {
    this.selectedFamilyIn = null;
    this.isDropdownOpen = false;
    this.selectedFamily.emit(null);
  }
}
