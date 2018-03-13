import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpContentComponent } from './hcp-content.component';

describe('HcpContentComponent', () => {
  let component: HcpContentComponent;
  let fixture: ComponentFixture<HcpContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcpContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
