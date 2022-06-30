import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ConvertApiResponseType, SymbolsApiResponseType} from "../types/ApiResponse";
import {symbolType} from "../types/symbols";
import {catchError, map, Observable, of} from "rxjs";

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

  convertCurrency(fromSymbol: string, toSymbol: string, amount: number): Observable<number> {
    const url: string = `${this.apiUrl}convert`
    const params: HttpParams = new HttpParams()
      .set('from', fromSymbol)
      .set('to', toSymbol)
      .set('amount', amount)

    return this.http.get<ConvertApiResponseType>(url, {responseType: 'json', params}).pipe(
      map((data)=>{
        return data.result
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
