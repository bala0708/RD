import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBrandsComponent } from './manage-brands.component';

describe('ManageBrandsComponent', () => {
  let component: ManageBrandsComponent;
  let fixture: ComponentFixture<ManageBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
