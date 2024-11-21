import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderCategoryCardsComponent } from './reminder-category-cards/reminder-category-cards.component';
import { NavigationModule } from "../navigation/navigation.module";
import { ReminderDashboardComponent } from './reminder-dashboard/reminder-dashboard.component';
import { ReminderPageComponent } from './reminder-page/reminder-page.component';
import { IncomingActivitiesComponent } from './incoming-activities/incoming-activities.component';
import { ModalFormAddComponent } from './alerts/modal-form-add/modal-form-add.component';

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    ReminderCategoryCardsComponent,
    ReminderDashboardComponent,
    ReminderPageComponent,
    IncomingActivitiesComponent,
    ModalFormAddComponent
  ],
  imports: [
    CommonModule,
    NavigationModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule
],
  exports: [
    ReminderCategoryCardsComponent,
    ReminderPageComponent,
  ]
})
export class ReminderModule { }
