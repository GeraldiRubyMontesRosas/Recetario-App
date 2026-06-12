import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-receta',
  imports: [],
  templateUrl: './crear-receta.html',
  styleUrl: './crear-receta.css',
})
export class CrearRecetaComponent {
  columnasRecetas = [
    { field: 'id', header: 'ID' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Receta' },
    { field: 'imagen', header: 'Imagen', type: 'image' }
  ];

}
