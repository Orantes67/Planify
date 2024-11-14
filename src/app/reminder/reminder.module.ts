import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderCategoryCardsComponent } from './reminder-category-cards/reminder-category-cards.component';
import { NavigationModule } from "../navigation/navigation.module";



@NgModule({
  declarations: [
    ReminderCategoryCardsComponent
  ],
  imports: [
    CommonModule,
    NavigationModule
],
  exports: [
    ReminderCategoryCardsComponent
  ]
})
export class ReminderModule { }
