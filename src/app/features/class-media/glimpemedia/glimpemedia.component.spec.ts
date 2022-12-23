import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlimpemediaComponent } from './glimpemedia.component';

describe('GlimpemediaComponent', () => {
  let component: GlimpemediaComponent;
  let fixture: ComponentFixture<GlimpemediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlimpemediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlimpemediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
