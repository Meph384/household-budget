import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Transaction } from "../interfaces/transaction.interface";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.apiUrl + "/Transaction";

  getAllFinanceData(): Observable<Transaction[]> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Transaction[]>(this.apiUrl + "/", { headers: header });
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  deleteTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${transactionId}`);
  }

  updateTransaction(transactionId: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${transactionId}`, transaction);
  }
}
