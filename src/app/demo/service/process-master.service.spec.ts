import { TestBed } from '@angular/core/testing';

import { ProcessMasterService } from './process-master.service';

describe('ProcessMasterService', () => {
  let service: ProcessMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
