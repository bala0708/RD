import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHcpComponent } from './manage-hcp.component';

describe('ManageHcpComponent', () => {
  let component: ManageHcpComponent;
  let fixture: ComponentFixture<ManageHcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
