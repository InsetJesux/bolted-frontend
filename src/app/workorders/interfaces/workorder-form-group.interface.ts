import { FormControl, FormGroup } from "@angular/forms";
import { IWorkorder } from "./workorder.interface";

export interface IWorkorderFormGroup extends FormGroup {
    value: IWorkorder;
    
    controls: {
        id: FormControl;
        serial: FormControl;
        symptoms: FormControl;
        purchaseDate: FormControl;
        warrantyDate: FormControl;
        isWarranty: FormControl;
        client: FormControl;
        model: FormControl;
    }
}