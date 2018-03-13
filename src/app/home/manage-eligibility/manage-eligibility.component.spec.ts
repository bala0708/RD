import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEligibilityComponent } from './manage-eligibility.component';

describe('ManageEligibilityComponent', () => {
  let component: ManageEligibilityComponent;
  let fixture: ComponentFixture<ManageEligibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEligibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
