import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:3000/api/budget';

  constructor(private http: HttpClient) { }

  getBudgets(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  createBudget(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  deleteBudget(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
