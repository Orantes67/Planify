import { Component, Input } from '@angular/core';
import { FamilyService } from '../services/family.service';
import { UserI } from '../../credentials/interfaces/user-i';

@Component({
  selector: 'app-family-dashboard',
  templateUrl: './family-dashboard.component.html',
})
export class FamilyDashboardComponent {
  @Input() familyMembers: UserI[] = [];
  @Input() isLeader: boolean = false;

  constructor(private familyService: FamilyService) {}

  removeMember(memberId: number) {
    if (this.isLeader) {
      this.familyService.removeMember(memberId).subscribe({
        next: () => {},
        error: (err: any) => console.error('Error al eliminar miembro', err),
      });
    }
  }
}
