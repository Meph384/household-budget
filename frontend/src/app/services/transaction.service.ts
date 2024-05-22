import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl: string = environment.apiUrl + "/Transaction";

  constructor(private http: HttpClient) { }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }
}
