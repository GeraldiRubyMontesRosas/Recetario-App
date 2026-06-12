import { Component } from '@angular/core';
import { ColumnaTabla } from '../../models/columna-tabla.interface';
import { UnidadService } from '../../core/services/unidad/unidad.service';
import { Unidad } from '../../models/unidad';
import { DataTable } from '../../shared/data-table/data-table';

@Component({
  selector: 'app-unidad',
  standalone: true,
  imports: [DataTable],
  templateUrl: './unidad.component.html',
  styleUrl: './unidad.component.css',
})
export class UnidadComponent {

  unidades: Unidad[] = [];
 constructor(  
    private UnidadesService: UnidadService,
  ) {
    this.getUnidades();
  }

  columns: ColumnaTabla[] = [
    { field: 'unidadId', header: 'Id' },
    { field: 'unidades', header: 'Unidad' },
  ];

  getUnidasdes() {
    this.UnidadesService.getAll().subscribe({ next: (dataFromAPI) => this.unidades = dataFromAPI });
  }
  getUnidades(): void {
    this.UnidadesService.getAll().subscribe({
      next: (dataFromAPI) => {
        this.unidades = dataFromAPI;
        console.log('Unidades recibidas:', this.unidades); // para verificar
      },
      error: (err) => console.error('Error al cargar unidades:', err),
    });
  }
  onCreate(){

  }
  onEdit(unidad: Unidad){

  }
  onDelete(unidad: Unidad){

  }
}
