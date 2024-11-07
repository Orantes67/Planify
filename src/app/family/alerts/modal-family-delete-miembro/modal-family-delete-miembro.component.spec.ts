import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFamilyDeleteMiembroComponent } from './modal-family-delete-miembro.component';

describe('ModalFamilyDeleteMiembroComponent', () => {
  let component: ModalFamilyDeleteMiembroComponent;
  let fixture: ComponentFixture<ModalFamilyDeleteMiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFamilyDeleteMiembroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFamilyDeleteMiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
