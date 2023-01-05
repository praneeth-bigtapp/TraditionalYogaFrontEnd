import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliesGurujiComponent } from './replies-guruji.component';

describe('RepliesGurujiComponent', () => {
  let component: RepliesGurujiComponent;
  let fixture: ComponentFixture<RepliesGurujiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepliesGurujiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepliesGurujiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
