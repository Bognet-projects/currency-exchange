import {TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {symbolType} from "../types/symbols";
import {ConvertApiResponseType, RateApiResponseType, SymbolsApiResponseType} from "../types/ApiResponse";
import {convertResult} from "../types/convert";

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(()=>{
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getSymbols should return Observable and match the right data', () => {
    const mockResponse: SymbolsApiResponseType = {
      success: true,
      symbols: {
        'TEST': {code: 'TEST', description: 'TEST description'}
      }
    }
    const mockResult: symbolType[] = [{code: 'TEST', description: 'TEST description'}]

    service.getSymbols().subscribe(symbols => {
      expect(symbols).toEqual(mockResult)
    })

    const req = httpTestingController.expectOne('https://api.exchangerate.host/symbols')

    expect(req.request.method).toEqual('GET')

    req.flush(mockResponse)
  });

  it('#getExchangeRate should return Observable and match the right data', () => {
    const mockResponse: RateApiResponseType = {
      success: true,
      base: 'TEST_BASE',
      rates: {
        'TEST_QUOTE': 0.3
      }
    }

    service.getExchangeRate('TEST_BASE','TEST_QUOTE').subscribe(rate => {
      expect(rate).toEqual(0.3)
    })

    const req = httpTestingController.expectOne('https://api.exchangerate.host/latest?base=TEST_BASE&symbols=TEST_QUOTE')

    expect(req.request.method).toEqual('GET')

    req.flush(mockResponse)
  });

  it('#convertCurrency should return Observable and match the right data', () => {
    const mockResponse: ConvertApiResponseType = {
      success: true,
      query: {
        from: 'TEST_BASE',
        to: 'TEST_QUOTE',
        amount: 1
      },
      info: {
        rate: 0.3
      },
      result: 2
    }
    const mockResult: convertResult = {amount: 2, quote: 'TEST_QUOTE', rate: 0.3, base: 'TEST_BASE'}

    service.convertCurrency('TEST_BASE','TEST_QUOTE', 1).subscribe(symbols => {
      expect(symbols).toEqual(mockResult)
    })

    const req = httpTestingController.expectOne('https://api.exchangerate.host/convert?from=TEST_BASE&to=TEST_QUOTE&amount=1')

    expect(req.request.method).toEqual('GET')

    req.flush(mockResponse)
  });
});
