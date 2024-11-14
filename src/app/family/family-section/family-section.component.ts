import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FamilyService } from '../services/family.service';
import { UserI } from '../../credentials/interfaces/user-i';
import { FamilyI } from '../interfaces/family-i';

@Component({
  selector: 'app-family-section',
  templateUrl: './family-section.component.html',
})
export class FamilySectionComponent {
  @Input() user: UserI | null | undefined;

  @Input() family: FamilyI | null = null;
  @Output() familyUpdated = new EventEmitter<void>();

  constructor(private familyService: FamilyService) {}

  createFamily(familyName: string) {
    if (this.user && this.user.usuario_id !== undefined) {
      this.familyService
        .createFamily({ nombre: familyName }, this.user.usuario_id)
        .subscribe({
          next: () => this.familyUpdated.emit(),
          error: (err) => console.error('Error al crear familia:', err),
        });
    }
  }

  joinFamily(familyIdInput: string) {
    const familyId = parseInt(familyIdInput, 10);
    if (this.user && !isNaN(familyId) && this.user.usuario_id !== undefined) {
      this.familyService
        .updateFamilyId(this.user.usuario_id, familyId)
        .subscribe({
          next: () => this.familyUpdated.emit(),
          error: (err) => console.error('Error al unirse a la familia:', err),
        });
    } else {
      console.error(
        'El usuario no está definido o el ID de la familia no es válido.'
      );
    }
  }
}
