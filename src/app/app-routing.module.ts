import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './credentials/auth-page/auth-page.component';
import { FamilyPageComponent } from './family/family-page/family-page.component';
import { ReminderPageComponent } from './reminder/reminder-page/reminder-page.component';
import { ActivitiesPageComponent } from './activities/activities-page/activities-page.component';
import { MiProfilePageComponent } from './mi-profile-module/mi-profile-page/mi-profile-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthPageComponent },
  { path: 'family', component: FamilyPageComponent, canActivate: [AuthGuard] },
  {
    path: 'reminders',
    component: ReminderPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'activities',
    component: ActivitiesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: MiProfilePageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
