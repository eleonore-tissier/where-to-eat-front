import { TestBed } from '@angular/core/testing';

import { WhereToEatService } from './where-to-eat.service';

describe('WhereToEatServiceService', () => {
  let service: WhereToEatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhereToEatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
