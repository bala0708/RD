import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfcontentComponent } from './pdfcontent.component';

describe('PdfcontentComponent', () => {
  let component: PdfcontentComponent;
  let fixture: ComponentFixture<PdfcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
