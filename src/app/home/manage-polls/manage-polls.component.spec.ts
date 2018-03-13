import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePollsComponent } from './manage-polls.component';

describe('ManagePollsComponent', () => {
  let component: ManagePollsComponent;
  let fixture: ComponentFixture<ManagePollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
