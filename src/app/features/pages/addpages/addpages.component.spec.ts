import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpagesComponent } from './addpages.component';

describe('AddpagesComponent', () => {
  let component: AddpagesComponent;
  let fixture: ComponentFixture<AddpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
