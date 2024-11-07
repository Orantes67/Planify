import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFamolyDeleteComponent } from './modal-famoly-delete.component';

describe('ModalFamolyDeleteComponent', () => {
  let component: ModalFamolyDeleteComponent;
  let fixture: ComponentFixture<ModalFamolyDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFamolyDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFamolyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
