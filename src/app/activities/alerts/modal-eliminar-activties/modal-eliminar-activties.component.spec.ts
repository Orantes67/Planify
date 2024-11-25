import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarActivtiesComponent } from './modal-eliminar-activties.component';

describe('ModalEliminarActivtiesComponent', () => {
  let component: ModalEliminarActivtiesComponent;
  let fixture: ComponentFixture<ModalEliminarActivtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEliminarActivtiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEliminarActivtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
