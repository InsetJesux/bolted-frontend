import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { IModel } from "./model.interface";

export interface IModelFormGroup extends FormGroup {
    value: IModel;
    
    controls: {
        id:   FormControl;
        name: FormControl;
        brand: FormControl;
    }
}