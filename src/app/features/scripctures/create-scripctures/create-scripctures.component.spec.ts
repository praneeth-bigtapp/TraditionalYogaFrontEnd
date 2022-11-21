import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScripcturesComponent } from './create-scripctures.component';

describe('CreateScripcturesComponent', () => {
  let component: CreateScripcturesComponent;
  let fixture: ComponentFixture<CreateScripcturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateScripcturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScripcturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
