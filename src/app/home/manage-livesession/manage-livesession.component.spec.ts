import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLivesessionComponent } from './manage-livesession.component';

describe('ManageLivesessionComponent', () => {
  let component: ManageLivesessionComponent;
  let fixture: ComponentFixture<ManageLivesessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLivesessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLivesessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
