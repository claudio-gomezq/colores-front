import { TestBed } from '@angular/core/testing';

import { ColoresPaginationService } from './colores-pagination.service';

describe('ColoresPaginationService', () => {
  let service: ColoresPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColoresPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
