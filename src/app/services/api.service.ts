import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SymbolsApiResponseType} from "../types/ApiResponse";
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
    const url: string = `${this.apiUrl}symbol`
    return this.http.get<SymbolsApiResponseType>(url, {responseType: 'json'}).pipe(
      map((data) => {
        return Object.values(data.symbols)
      }),
      catchError(this.handleError<symbolType[]>([]))
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
