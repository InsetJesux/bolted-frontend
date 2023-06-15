import { ICity } from "src/app/cities/interfaces/city.interface";

export interface IClient {
    id:   number;
    name: string;
    nif?: string;
    address?: string;
    phone?: string;
    city?: ICity;
}