import { TestBed } from '@angular/core/testing';

import { DatareqServiceService } from './datareq-service.service';

describe('DatareqServiceService', () => {
  let service: DatareqServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatareqServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
