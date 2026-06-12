import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
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
export class DataTable {

  @Input() columns: ColumnaTabla[] = [];
  @Input() data: any[] = [];
  @Input() pageSize = 10;

  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  searchText = signal('');
  currentPage = signal(1);

  // Filtra sobre todas las columnas configuradas
  filteredData = computed(() => {
    const term = this.searchText().toLowerCase().trim();
    if (!term) return this.data;

    return this.data.filter(item =>
      this.columns.some(col => {
        const value = item[col.field];
        return value != null && String(value).toLowerCase().includes(term);
      })
    );
  });

  totalPages = computed(() => {
    const total = Math.ceil(this.filteredData().length / this.pageSize);
    return total === 0 ? 1 : total;
  });

  paginatedData = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    return this.filteredData().slice(start, start + this.pageSize);
  });

  onSearchChange(value: string): void {
    this.searchText.set(value);
    this.currentPage.set(1); // reinicia al filtrar
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }
}