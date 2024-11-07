import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySectionComponent } from './family-section.component';

describe('FamilySectionComponent', () => {
  let component: FamilySectionComponent;
  let fixture: ComponentFixture<FamilySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
