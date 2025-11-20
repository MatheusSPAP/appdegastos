import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

const MERCADO_ROUTER = 'api/mercado/'
const SELECT_ALL_MERCADO = 'http://localhost:3000/' + MERCADO_ROUTER +'selectAll';

 NgModule({
      imports: [

        
      ],
      // ...
    })

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  public selectAllMercado(): Observable<any> {

    return this.http.post(SELECT_ALL_MERCADO, httpOptions);

  }


}
