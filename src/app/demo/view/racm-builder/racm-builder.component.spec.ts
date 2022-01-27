import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacmBuilderComponent } from './racm-builder.component';

describe('RacmBuilderComponent', () => {
  let component: RacmBuilderComponent;
  let fixture: ComponentFixture<RacmBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacmBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacmBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
