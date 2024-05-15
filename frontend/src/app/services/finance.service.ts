import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private baseUrl: string = environment.baseUrl + "/finance";

  constructor(private http: HttpClient) {}

  getAllFinanceData(): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + "/GetRecords", { headers: header });
  }
}
