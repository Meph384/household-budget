import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Transaction } from '../models/transaction.model';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.apiUrl + "/Transaction";


  private newTransactionSubject = new Subject<Transaction>();
  newTransaction$ = this.newTransactionSubject.asObservable();

  notifyNewTransaction(transaction: Transaction) {
    this.newTransactionSubject.next(transaction);
  }

  getAllFinanceData(): Observable<Transaction[]> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Transaction[]>(this.apiUrl + "/", { headers: header });
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }
}
