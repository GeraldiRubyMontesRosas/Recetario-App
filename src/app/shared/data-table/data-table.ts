import { Component, EventEmitter, Input, Output, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnaTabla } from '../../models/columna-tabla.interface';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTableComponent<T extends Record<string, any> = any> {

  /** Definición de columnas: [{ header: 'Nombre', field: 'name' }, { header: 'Foto', field: 'photo', type: 'image' }] */
  @Input({ required: true }) columns: ColumnaTabla[] = [];

  /** Datos a mostrar (los que vienen de tu servicio / BD) */
  @Input() set data(value: T[] | null | undefined) {
    this._data.set(value ?? []);
    this.currentPage.set(1);
  }

  /** Cuántas filas por página */
  @Input() pageSize = 5;

  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  private _data = signal<T[]>([]);

  searchText = signal('');
  currentPage = signal(1);

  filteredData = computed(() => {
    const term = this.searchText().trim().toLowerCase();
    if (!term) return this._data();

    return this._data().filter(item =>
      this.columns.some(col => {
        const value = item[col.field];
        return value != null && String(value).toLowerCase().includes(term);
      })
    );
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredData().length / this.pageSize)));

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredData().slice(start, start + this.pageSize);
  });

  constructor() {
    // si el filtro deja menos páginas de las que había, regresa a una página válida
    effect(() => {
      if (this.currentPage() > this.totalPages()) {
        this.currentPage.set(this.totalPages());
      }
    });
  }

  onSearchChange(value: string): void {
    this.searchText.set(value);
    this.currentPage.set(1);
  }

  prevPage(): void {
    if (this.currentPage() > 1) this.currentPage.update(p => p - 1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1);
  }

  
}