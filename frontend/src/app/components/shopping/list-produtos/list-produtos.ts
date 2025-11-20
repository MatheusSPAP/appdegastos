import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduto } from '../../../models/iproduto';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../services/produto-service';
import { CardProduto } from '../card-produto/card-produto';


@Component({
  selector: 'app-list-produto',
  imports: [CommonModule, CardProduto],
  templateUrl: './list-produtos.html',
  styleUrl: './list-produtos.css'
})
export class ListProdutos {
  cnpj!: string;
  nome_fantasia!:string;
  produtosList: Iproduto[] = [];
  filteredprodutosList: Iproduto[] = [];

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) {
    // this.cnpj = this.route.snapshot.paramMap.get('cnpj')!;
    // ou se quiser escutar alterações:
    this.route.paramMap.subscribe(params => this.cnpj = params.get('cnpj')!);
    this.route.paramMap.subscribe(params => this.nome_fantasia = params.get('nome_fantasia')!);


    this.produtoService.selectAllProdutoMercado(this.cnpj).subscribe({
      next: dados => {
        console.log('data:' + (JSON.stringify(dados.data)) + ' msg:' + dados.message + ' count:' + dados.count);
        console.log('dados:' + (dados))
        this.produtosList = dados.data;
        this.filteredprodutosList = this.produtosList;
      },
      error: err => {
      }
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredprodutosList = this.produtosList;
      return;
    }

    this.filteredprodutosList = this.produtosList.filter(
      Iproduto => Iproduto?.nome_produto.toLowerCase().includes(text.toLowerCase())
    );
  }



  ngOnInit(): any {
    this.cnpj = this.route.snapshot.paramMap.get('cnpj')!;
  }



}
