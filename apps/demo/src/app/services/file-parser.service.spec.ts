/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileParserService } from './file-parser.service';

describe('Service: FileParser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileParserService]
    });
  });

  it('should ...', inject([FileParserService], (service: FileParserService) => {
    expect(service).toBeTruthy();
  }));
});
