import { TestBed } from '@angular/core/testing';

import { StatisticalDataService } from './statistical-data.service';

describe('StatisticalDataService', () => {
  let service: StatisticalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
