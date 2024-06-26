import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../interfaces/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = environment.apiUrl + "/Category";

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Category[]>(this.baseUrl, { headers: header });
  }
}
