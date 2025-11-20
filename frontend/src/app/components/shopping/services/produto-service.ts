import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const PRODUTO_ROUTER = 'api/produto-mercado/'
const SELECT_ALL_PRODUTO_FROM_MERCADO = 'http://localhost:3000/' + PRODUTO_ROUTER + 'mercado/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public selectAllProdutoMercado(cnpj: string): Observable<any> {
    console.log("URL:" + `${SELECT_ALL_PRODUTO_FROM_MERCADO}${cnpj}`)    
    return this.http.get(`${SELECT_ALL_PRODUTO_FROM_MERCADO}${cnpj}`, httpOptions);

 }


}
