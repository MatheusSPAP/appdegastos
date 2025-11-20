import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private apiUrl = 'http://localhost:3000/api/lancamentos';

  constructor(private http: HttpClient) { }

  getLancamentos(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  createLancamento(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  deleteLancamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
