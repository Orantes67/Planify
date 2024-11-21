import { Component } from '@angular/core';
import { faSearch} from '@fortawesome/free-solid-svg-icons';;


@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrl: './activities-page.component.css'
})
export class ActivitiesPageComponent {
  faSearch = faSearch;

}
