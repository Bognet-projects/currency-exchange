import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ConvertApiResponseType, RateApiResponseType, SymbolsApiResponseType} from "../types/ApiResponse";
import {symbolType} from "../types/symbols";
import {catchError, map, Observable, of} from "rxjs";
import {convertResult} from "../types/convert";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.exchangerate.host/'

  constructor(private http: HttpClient) {
  }

  getSymbols(): Observable<symbolType[]> {
    const url: string = `${this.apiUrl}symbols`
    return this.http.get<SymbolsApiResponseType>(url, {responseType: 'json'}).pipe(
      map((data) => {
        return Object.values(data.symbols)
      }),
      catchError(this.handleError<symbolType[]>([]))
    )
  }

  getExchangeRate(base: string, quote: string): Observable<number> {
    const url: string = `${this.apiUrl}latest`
    const params: HttpParams = new HttpParams()
      .set('base', base)
      .set('symbols', quote)

    return this.http.get<RateApiResponseType>(url, {responseType: 'json', params}).pipe(
      map((data) => {
        return data.rates[quote]
      }),
      catchError(this.handleError<number>(0))
    )
  }

  convertCurrency(fromSymbol: string, toSymbol: string, amount: number): Observable<convertResult> {
    const url: string = `${this.apiUrl}convert`
    const params: HttpParams = new HttpParams()
      .set('from', fromSymbol)
      .set('to', toSymbol)
      .set('amount', amount)

    return this.http.get<ConvertApiResponseType>(url, {responseType: 'json', params}).pipe(
      map((data) => {
        return {
          amount: data.result,
          base: fromSymbol,
          quote: toSymbol,
          rate: data.info.rate
        }
      })
    )
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      //TODO: Send back an error message to the UI
      console.error(error)
      return of(result as T)
    }
  }
}
