import { Component, signal } from '@angular/core';

import { ColumnaTabla } from '../../models/columna-tabla.interface';
import { UnidadService } from '../../core/services/unidad/unidad.service';
import { Unidad } from '../../models/unidad';
import { DataTableComponent } from '../../shared/data-table/data-table';

@Component({
  selector: 'app-unidad',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './unidad.component.html',
  styleUrl: './unidad.component.css',
})
export class UnidadComponent {

   unidades = signal<Unidad[]>([]);

  columns: ColumnaTabla[] = [
    { field: 'unidadId', header: 'Id' },
    { field: 'unidades', header: 'Unidad' },
  ];

  constructor(
    private UnidadesService: UnidadService
  ) {
    this.getUnidades();
  }

  getUnidades(): void {
    this.UnidadesService.getAll().subscribe({
      next: (dataFromAPI) => {
        this.unidades.set(dataFromAPI);
        console.log('Unidades recibidas:', this.unidades);
      },
      error: (err) => {
        console.error('Error al cargar unidades:', err);
      }
    });
  }

  onCreate() {
  }

  onEdit(unidad: Unidad) {
    console.log('Editar:', unidad);
  }

  onDelete(unidad: Unidad) {
    console.log('Eliminar:', unidad);
  }
}