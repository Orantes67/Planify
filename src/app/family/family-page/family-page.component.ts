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
  isLeader: boolean = false;
  family: FamilyI | null = null;

  constructor(
    private familyService: FamilyService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.obtenerUsuario();
    if (this.user) {
      this.isLeader = this.user.rol === 'líder';
      this.loadFamilyData(this.user.familia_id);
    }
  }

  loadFamilyData(familiaId: number) {
    this.familyService.getFamilyById(familiaId).subscribe((family) => {
      this.family = family;
    });
    this.familyService.getUsersByFamily(familiaId).subscribe((members) => {
      this.familyMembers = members;
    });
  }
}
