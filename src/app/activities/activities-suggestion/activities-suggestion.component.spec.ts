import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesSuggestionComponent } from './activities-suggestion.component';

describe('ActivitiesSuggestionComponent', () => {
  let component: ActivitiesSuggestionComponent;
  let fixture: ComponentFixture<ActivitiesSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivitiesSuggestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
