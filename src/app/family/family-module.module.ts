import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FamilyDashboardComponent } from './family-dashboard/family-dashboard.component';
import { FamilyPageComponent } from './family-page/family-page.component';
import { FamilySectionComponent } from './family-section/family-section.component';
import { ModalFamilyManageComponent } from './alerts/modal-family-manage/modal-family-manage.component';

import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { FamilyService } from './services/family.service';

@NgModule({
  declarations: [
    FamilyDashboardComponent,
    FamilyPageComponent,
    FamilySectionComponent,
    ModalFamilyManageComponent,
    EventsDashboardComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [FamilyService],
})
export class FamilyModule {}
