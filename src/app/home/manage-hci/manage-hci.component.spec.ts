import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHciComponent } from './manage-hci.component';

describe('ManageHciComponent', () => {
  let component: ManageHciComponent;
  let fixture: ComponentFixture<ManageHciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
