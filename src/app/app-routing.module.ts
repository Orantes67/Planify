import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './credentials/auth-page/auth-page.component';
import { FamilyPageComponent } from './family/family-page/family-page.component';
import { ReminderCategoryCardsComponent } from './reminder/reminder-category-cards/reminder-category-cards.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthPageComponent },
  { path: 'family', component: FamilyPageComponent },
  { path: 'reminders', component:  ReminderCategoryCardsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
