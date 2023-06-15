import { FormControl, FormGroup } from "@angular/forms";
import { ICity } from "./city.interface";

export interface ICityFormGroup extends FormGroup {
    value: ICity;
    
    controls: {
        id:   FormControl;
        name: FormControl;
        province: FormControl;
    }
}