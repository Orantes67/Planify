import { Component, Input } from '@angular/core';
import { FamilyService } from '../services/family.service';
import { UserI } from '../../credentials/interfaces/user-i';
import { FamilyI } from '../interfaces/family-i';

@Component({
  selector: 'app-family-dashboard',
  templateUrl: './family-dashboard.component.html',
})
export class FamilyDashboardComponent {
  @Input() familyMembers: UserI[] = [];
  @Input() isLeader: boolean = false;
  @Input() family: FamilyI | null = null;

  constructor(private familyService: FamilyService) {}

  removeMember(memberId: number) {}
}
