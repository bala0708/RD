import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRepComponent } from './manage-rep.component';

describe('ManageRepComponent', () => {
  let component: ManageRepComponent;
  let fixture: ComponentFixture<ManageRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
