import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormLista } from '../form-lista/form-lista';
import { TableLista } from '../table-lista/table-lista';

@Component({
  selector: 'app-page-listas',
  imports: [CommonModule, FormLista, TableLista],
  templateUrl: './page-listas.html',
  styleUrl: './page-listas.css'
})
export class PageListas {

  // sinal simples para notificar a tabela
  private _tick = 0;
  refreshTick = signal<number>(0);

  onSaved() {
    this._tick++;
    this.refreshTick.set(this._tick); // tabela reagirá a esta mudança
  }
}
