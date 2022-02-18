import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatauploadComponent } from './dataupload.component';

describe('DatauploadComponent', () => {
  let component: DatauploadComponent;
  let fixture: ComponentFixture<DatauploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatauploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatauploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
