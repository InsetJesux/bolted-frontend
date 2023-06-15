import { IProvince } from "src/app/provinces/interfaces/province.interface";

export interface ICity {
    id:   number;
    name: string;
    province: IProvince;
}