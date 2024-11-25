import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './credentials/auth-page/auth-page.component';
import { FamilyPageComponent } from './family/family-page/family-page.component';
import { ReminderCategoryCardsComponent } from './reminder/reminder-category-cards/reminder-category-cards.component';
import { ReminderPageComponent } from './reminder/reminder-page/reminder-page.component';
import { ActivitiesPageComponent } from './activities/activities-page/activities-page.component';
import { MiProfilePageComponent } from './mi-profile-module/mi-profile-page/mi-profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthPageComponent },
  { path: 'family', component: FamilyPageComponent },
  { path: 'reminders', component: ReminderPageComponent },
  { path: 'activities', component: ActivitiesPageComponent },
  { path: 'profile', component: MiProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
