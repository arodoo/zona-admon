import { TestBed } from '@angular/core/testing';

import { BuldDataService } from './buld-data.service';

describe('BuldDataService', () => {
  let service: BuldDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuldDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
