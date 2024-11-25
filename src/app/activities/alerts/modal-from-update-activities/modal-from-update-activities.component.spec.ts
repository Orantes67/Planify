import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFromUpdateActivitiesComponent } from './modal-from-update-activities.component';

describe('ModalFromUpdateActivitiesComponent', () => {
  let component: ModalFromUpdateActivitiesComponent;
  let fixture: ComponentFixture<ModalFromUpdateActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFromUpdateActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFromUpdateActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
