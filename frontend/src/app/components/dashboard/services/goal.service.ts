import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:3000/api/goals';

  constructor(private http: HttpClient) { }

  getGoals(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  createGoal(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  deleteGoal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
