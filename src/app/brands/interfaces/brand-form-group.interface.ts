import { FormControl, FormGroup } from "@angular/forms";
import { IBrand } from "./brand.interface";

export interface IBrandFormGroup extends FormGroup {
    value: IBrand;
    
    controls: {
        id:   FormControl;
        name: FormControl;
    }
}