import { TestBed } from '@angular/core/testing';

import { RacmBuilderService } from './racm-builder.service';

describe('RacmBuilderService', () => {
  let service: RacmBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacmBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
