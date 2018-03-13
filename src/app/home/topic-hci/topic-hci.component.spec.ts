import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicHciComponent } from './topic-hci.component';

describe('TopicHciComponent', () => {
  let component: TopicHciComponent;
  let fixture: ComponentFixture<TopicHciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicHciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicHciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
