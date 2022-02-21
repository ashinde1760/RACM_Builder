import { TestBed } from '@angular/core/testing';

import { WalkthroughServiceService } from './walkthrough.service';

describe('WalkthroughServiceService', () => {
  let service: WalkthroughServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalkthroughServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
