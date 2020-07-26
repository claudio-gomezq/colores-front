import { TestBed } from '@angular/core/testing';

import { ColoresHttpService } from './colores-http.service';

describe('ColoresHttpService', () => {
  let service: ColoresHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColoresHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
