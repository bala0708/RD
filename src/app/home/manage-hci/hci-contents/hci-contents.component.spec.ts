import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HciContentsComponent } from './hci-contents.component';

describe('HciContentsComponent', () => {
  let component: HciContentsComponent;
  let fixture: ComponentFixture<HciContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HciContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HciContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
