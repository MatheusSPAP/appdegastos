import { Component, Input } from '@angular/core';
import { Iproduto } from '../../../models/iproduto';

@Component({
  selector: 'app-card-produto',
  imports: [],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css'
})
export class CardProduto {

  @Input() produto!: Iproduto;
}
