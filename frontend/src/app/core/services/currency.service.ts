import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Currency } from "../interfaces/currency.interface";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseUrl: string = environment.apiUrl + "/Currency";

  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<Currency[]> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Currency[]>(this.baseUrl, { headers: header });
  }
}
