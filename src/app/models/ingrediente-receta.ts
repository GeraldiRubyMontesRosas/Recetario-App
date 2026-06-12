import { Ingrediente } from "./ingrediente";
import { Receta } from "./receta.interface";
import { Unidad } from "./unidad";

export interface IngredienteReceta {
    IngredienteRecetaId: number;
    recetaId: number;
    receta: Receta;
    ingredienteId: number;
    ingrediente: Ingrediente;
    cantidad: number;
    unidadId: number;
    unidad: Unidad;
}