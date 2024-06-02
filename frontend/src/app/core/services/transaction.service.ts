import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
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
    const userId = localStorage.getItem('userId');
    if (userId != null) {
      const params = new HttpParams().set('userId', userId);
      return this.http.get<Transaction[]>(this.apiUrl, { headers: header, params: params });
    } else {
      return throwError(() => new Error('User ID not found. Please log in.'));
    }
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    const userId = localStorage.getItem('userId');
    if (userId != null) {
      transaction.userId = userId;
      return this.http.post<Transaction>(`${this.apiUrl}/AddTransaction`, transaction).pipe(
        catchError(error => {
          console.error('Error creating transaction', error);
          return throwError(() => new Error('Error creating transaction'));
        })
      );
    } else {
      return throwError(() => new Error('User ID not found. Please log in.'));
    }
  }

  deleteTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${transactionId}`);
  }

  updateTransaction(transactionId: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${transactionId}`, transaction);
  }
}
