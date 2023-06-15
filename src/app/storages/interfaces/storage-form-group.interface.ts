import { FormControl, FormGroup } from "@angular/forms";
import { IStorage } from "./storage.interface";

export interface IStorageFormGroup extends FormGroup {
    value: IStorage;
    
    controls: {
        id:   FormControl;
        name: FormControl;
        description: FormControl;
    }
}