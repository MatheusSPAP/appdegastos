import { Component, Input } from '@angular/core';
import { Imercado } from '../../../models/imercado';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-card-mercado',
  imports: [RouterLink],
  templateUrl: './card-mercado.html',
  styleUrl: './card-mercado.css'
})
export class CardMercado {
  @Input() mercado!: Imercado;
  
  nome_fantasia = "Pereira"

}
