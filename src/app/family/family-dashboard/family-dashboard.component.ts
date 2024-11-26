import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FamilyService } from '../services/family.service';
import { UserI } from '../../credentials/interfaces/user-i';
import { FamilyI } from '../interfaces/family-i';
import { ImageService } from '../../services/image.service';
import { PerteneceI } from '../interfaces/pertenece-i';

@Component({
  selector: 'app-family-dashboard',
  templateUrl: './family-dashboard.component.html',
})
export class FamilyDashboardComponent implements OnInit, OnChanges {
  @Input() user: UserI | null = null;
  @Input() familyMembers: UserI[] = [];
  @Input() isLeader: boolean = false;
  @Input() family: FamilyI | null = null;
  @Input() familyRol: string | undefined;
  @Output() updatedFamilyMembers = new EventEmitter<boolean>();
  selectedMember: UserI | null = null;

  constructor(
    private familyService: FamilyService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    console.log('Initial familyRol:', this.familyRol);
    this.updateLeaderStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['familyRol']) {
      console.log('familyRol changed:', changes['familyRol'].currentValue);
      this.updateLeaderStatus();
    }
  }

  selectMember(member: UserI): void {
    this.selectedMember =
      this.selectedMember?.usuario_id === member.usuario_id ? null : member;
  }

  updateLeaderStatus(): void {
    this.isLeader = this.familyRol === 'lider';
    console.log('isLeader status:', this.isLeader);
  }

  getImageUrl(imageId: string): string {
    return this.imageService.getImageById(imageId);
  }

  removeMember(memberId: number): void {
    let relationshipsOfThisFamily: PerteneceI[] = [];
    this.familyService
      .getRelationshipByFamilyId(this.family?.id_familia)
      .subscribe((relationships) => {
        relationshipsOfThisFamily = relationships;
        relationshipsOfThisFamily.forEach((relationship) => {
          if (relationship.usuario_id === memberId)
            this.familyService
              .removeMember(relationship.id)
              .subscribe(() => this.updatedFamilyMembers.emit(true));
        });
      });
  }
}
