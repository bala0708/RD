import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepContentsComponent } from './rep-contents.component';

describe('RepContentsComponent', () => {
  let component: RepContentsComponent;
  let fixture: ComponentFixture<RepContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
