import { TestBed } from '@angular/core/testing';

import { DataWorkspaceService } from './data-workspace.service';

describe('DataWorkspaceService', () => {
  let service: DataWorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataWorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
