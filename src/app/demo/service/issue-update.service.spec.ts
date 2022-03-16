import { TestBed } from '@angular/core/testing';

import { IssueUpdateService } from './issue-update.service';

describe('IssueUpdateService', () => {
  let service: IssueUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
