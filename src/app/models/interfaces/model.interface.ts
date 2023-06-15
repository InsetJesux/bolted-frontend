import { IBrand } from "src/app/brands/interfaces/brand.interface";

export interface IModel {
    id:   number;
    name: string;
    brand: IBrand;
}