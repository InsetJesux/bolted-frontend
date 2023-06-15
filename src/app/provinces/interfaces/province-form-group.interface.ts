import { FormControl, FormGroup } from "@angular/forms";
import { IProvince } from "./province.interface";

export interface IProvinceFormGroup extends FormGroup {
    value: IProvince;
    
    controls: {
        id:   FormControl;
        name: FormControl;
    }
}