import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesPageComponent } from './activities-page/activities-page.component';
import { ActivitiesSuggestionComponent } from './activities-suggestion/activities-suggestion.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ModalFromUpdateActivitiesComponent } from './alerts/modal-from-update-activities/modal-from-update-activities.component';
import { ModalFromAddActivitiesComponent } from './alerts/modal-from-add-activities/modal-from-add-activities.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ModalEliminarActivtiesComponent } from './alerts/modal-eliminar-activties/modal-eliminar-activties.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
,
  declarations: [
    ActivitiesPageComponent,
    ActivitiesSuggestionComponent,
    ActivitiesListComponent,
    ModalFromUpdateActivitiesComponent,
    ModalFromAddActivitiesComponent,
    ModalEliminarActivtiesComponent
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
    ModalFromAddActivitiesComponent,
    ModalEliminarActivtiesComponent
  ]
})
export class ActivitiesModule { }
