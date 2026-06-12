import { IngredienteReceta } from "./ingrediente-receta";

export interface Ingrediente {
    ingredienteId: number;
    nombre: string;
    recetas: IngredienteReceta[];
}
