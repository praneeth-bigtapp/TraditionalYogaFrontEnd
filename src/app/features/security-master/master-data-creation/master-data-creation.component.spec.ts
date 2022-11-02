import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataCreationComponent } from './master-data-creation.component';

describe('MasterDataCreationComponent', () => {
  let component: MasterDataCreationComponent;
  let fixture: ComponentFixture<MasterDataCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDataCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
