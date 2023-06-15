import { FormControl, FormGroup } from "@angular/forms";
import { IClient } from "./client.interface";

export interface IClientFormGroup extends FormGroup {
    value: IClient;
    
    controls: {
        id: FormControl;
        name: FormControl;
        nif: FormControl;
        address: FormControl;
        phone: FormControl;
        city: FormControl;
    }
}