import { TestBed } from '@angular/core/testing';

import { WriteService } from './write.service';

describe('WriteService', () => {
  let service: WriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
