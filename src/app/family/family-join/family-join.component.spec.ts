import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyJoinComponent } from './family-join.component';

describe('FamilyJoinComponent', () => {
  let component: FamilyJoinComponent;
  let fixture: ComponentFixture<FamilyJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyJoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
