import { TestBed } from '@angular/core/testing';

import { InactiveService } from './inactive.service';

describe('InactiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InactiveService = TestBed.get(InactiveService);
    expect(service).toBeTruthy();
  });
});
