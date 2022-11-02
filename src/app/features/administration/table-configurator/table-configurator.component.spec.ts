import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConfiguratorComponent } from './table-configurator.component';

describe('TableConfiguratorComponent', () => {
  let component: TableConfiguratorComponent;
  let fixture: ComponentFixture<TableConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableConfiguratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
