import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWorkspaceComponent } from './data-workspace.component';

describe('DataWorkspaceComponent', () => {
  let component: DataWorkspaceComponent;
  let fixture: ComponentFixture<DataWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
