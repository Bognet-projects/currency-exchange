import {symbolType} from "./symbols";

export interface SymbolsApiResponseType {
  success: boolean,
  symbols: {
    [key: string]: symbolType
  }
}
