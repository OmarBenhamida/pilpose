import { TestBed } from '@angular/core/testing';

import { SofappsHomeService } from './sofapps-home.service';

describe('SofappsHomeService', () => {
  let service: SofappsHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SofappsHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
