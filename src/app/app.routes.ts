import { Routes } from '@angular/router';
import { CrearRecetaComponent } from './recetas/crear-receta/crear-receta.Componet';
import { UnidadComponent } from './recetas/unidad.component/unidad.component';

export const routes: Routes = [
  {
    path: 'recetas/crear',
    component: CrearRecetaComponent
  },
  {
    path: 'unidades',
    component: UnidadComponent
  }
];