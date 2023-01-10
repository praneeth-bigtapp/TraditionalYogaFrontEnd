import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldWideApplicationsComponent } from './world-wide-applications.component';

describe('WorldWideApplicationsComponent', () => {
  let component: WorldWideApplicationsComponent;
  let fixture: ComponentFixture<WorldWideApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldWideApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldWideApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
