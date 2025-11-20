import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilista } from '../../../models/ilista';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private apiUrl = 'http://localhost:3000/api/lista'; // ajuste conforme sua REST API

  constructor(private http: HttpClient) { }

  insert(body: Ilista): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

   list(): Observable<Ilista[]> {
    return this.http.get<Ilista[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Ilista> {
    return this.http.get<Ilista>(`${this.apiUrl}/${id}`);
  }

  // PUT/POST aqui apenas como referência:
  // create(payload: ListaPayload): Observable<any> { return this.http.post(this.apiUrl, payload); }
  // update(id: number, payload: ListaPayload): Observable<any> { return this.http.put(`${this.apiUrl}/${id}`, payload); }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
