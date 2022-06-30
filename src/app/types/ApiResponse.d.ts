import {symbolType} from "./symbols";

export interface SymbolsApiResponseType {
  success: boolean,
  symbols: {
    [key: string]: symbolType
  }
}

export interface ConvertApiResponseType {
  success: boolean,
  query: {
    from: string,
    to: string,
    amount: number
  },
  info: {
    rate: number
  },
  result: number
}
