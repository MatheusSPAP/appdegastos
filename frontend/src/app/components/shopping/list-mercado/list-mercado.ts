import { Component } from '@angular/core';
import { Imercado } from '../../../models/imercado';
import { CommonModule } from '@angular/common';
import { MercadoService } from '../services/mercado-service';
import { CardMercado } from '../card-mercado/card-mercado';

@Component({
  selector: 'app-list-mercado',
  imports: [CommonModule, CardMercado],
  templateUrl: './list-mercado.html',
  styleUrl: './list-mercado.css'
})
export class ListMercado {
  mercadoList: Imercado[] = [];
  
constructor(private mercadoService: MercadoService) {     

    this.mercadoService.selectAllMercado().subscribe({
      next: dados => {
        console.log('data:'+ (JSON.stringify(dados.data)) + ' msg:' + dados.message + ' count:' + dados.count);
        console.log('dados:'+ (dados))
        this.mercadoList = dados.data;
        
      },
      error: err => {
      }
    });
  }
}
