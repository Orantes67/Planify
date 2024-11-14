import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyDashboardComponent } from './family-dashboard/family-dashboard.component';

import { FamilyPageComponent } from './family-page/family-page.component';
import { FamilySectionComponent } from './family-section/family-section.component';
import { FamilyService } from './services/family.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    FamilyDashboardComponent,

    FamilyPageComponent,
    FamilySectionComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  providers: [FamilyService],
})
export class FamilyModule {}
