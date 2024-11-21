import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderCategoryCardsComponent } from './reminder-category-cards/reminder-category-cards.component';
import { NavigationModule } from "../navigation/navigation.module";
import { ReminderDashboardComponent } from './reminder-dashboard/reminder-dashboard.component';
import { ReminderPageComponent } from './reminder-page/reminder-page.component';
import { IncomingActivitiesComponent } from './incoming-activities/incoming-activities.component';



@NgModule({
  declarations: [
    ReminderCategoryCardsComponent,
    ReminderDashboardComponent,
    ReminderPageComponent,
    IncomingActivitiesComponent
  ],
  imports: [
    CommonModule,
    NavigationModule
],
  exports: [
    ReminderCategoryCardsComponent,
    ReminderPageComponent,
  ]
})
export class ReminderModule { }
