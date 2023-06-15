import { IClient } from "src/app/clients/interfaces/client.interface";
import { IModel } from "src/app/models/interfaces/model.interface";

export interface IWorkorder {
    id:   number;
    serial: string;
    symptoms: string;
    purchaseDate?: Date;
    warrantyDate?: Date;
    isWarranty?: boolean;
    client: IClient;
    model: IModel;
}