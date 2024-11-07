import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFamilyExitComponent } from './modal-family-exit.component';

describe('ModalFamilyExitComponent', () => {
  let component: ModalFamilyExitComponent;
  let fixture: ComponentFixture<ModalFamilyExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFamilyExitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFamilyExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
