import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesPageComponent } from './activities-page/activities-page.component';
import { ActivitiesSuggestionComponent } from './activities-suggestion/activities-suggestion.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ModalFromUpdateActivitiesComponent } from './alerts/modal-from-update-activities/modal-from-update-activities.component';
import { ModalFromAddActivitiesComponent } from './alerts/modal-from-add-activities/modal-from-add-activities.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActivitiesPageComponent,
    ActivitiesSuggestionComponent,
    ActivitiesListComponent,
    ModalFromUpdateActivitiesComponent,
    ModalFromAddActivitiesComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    ActivitiesPageComponent,
    ActivitiesSuggestionComponent,
    ActivitiesListComponent,
    ModalFromUpdateActivitiesComponent,
    ModalFromAddActivitiesComponent
  ]
})
export class ActivitiesModule { }
