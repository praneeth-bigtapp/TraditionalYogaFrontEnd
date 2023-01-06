import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortvideomediaComponent } from './shortvideomedia.component';

describe('ShortvideomediaComponent', () => {
  let component: ShortvideomediaComponent;
  let fixture: ComponentFixture<ShortvideomediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortvideomediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortvideomediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
