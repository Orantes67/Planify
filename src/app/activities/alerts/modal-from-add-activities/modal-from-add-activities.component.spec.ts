import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFromAddActivitiesComponent } from './modal-from-add-activities.component';

describe('ModalFromAddActivitiesComponent', () => {
  let component: ModalFromAddActivitiesComponent;
  let fixture: ComponentFixture<ModalFromAddActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFromAddActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFromAddActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
