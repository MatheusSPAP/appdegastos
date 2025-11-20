import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ilista } from '../../../models/ilista';
import { ListaService } from '../services/lista-service';

@Component({
  selector: 'app-table-lista',
  imports: [CommonModule, RouterLink],
  templateUrl: './table-lista.html',
  styleUrl: './table-lista.css'
})
export class TableLista {
  @Input() refreshTick?: number;

  // estado
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  data = signal<Ilista[]>([]);
  query = signal<string>('');

  // lista filtrada (client-side)
  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.data();
    return this.data().filter(it =>
      (it.nome_lista ?? '').toLowerCase().includes(q) ||
      (it.cpf ?? '').toLowerCase().includes(q) ||
      (it.descricao_lista ?? '').toLowerCase().includes(q)
    );
  });

  constructor(private service: ListaService) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading.set(true);
    this.error.set(null);

    this.service.list().subscribe({
      next: (rows) => {
        this.data.set(rows ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Falha ao carregar dados.');
        this.loading.set(false);
      }
    });
  }

  onDelete(item: Ilista): void {
    const ok = confirm(`Excluir a lista "${item.nome_lista}" (ID ${item.id_lista})?`);
    if (!ok) return;

    this.service.remove(item.id_lista).subscribe({
      next: () => {
        // remove localmente sem recarregar tudo
        this.data.set(this.data().filter(x => x.id_lista !== item.id_lista));
      },
      error: (err) => {
        console.error(err);
        alert('Não foi possível excluir. Verifique a API e tente novamente.');
      }
    });
  }

  ngOnChanges() {
  if (this.refreshTick != null) {
    this.fetch(); // recarrega a lista quando o tick muda
  }
}
}
