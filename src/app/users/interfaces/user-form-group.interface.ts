import { FormControl, FormGroup } from "@angular/forms";
import { IUser } from "./user.interface";

export interface IUserFormGroup extends FormGroup {
    value: IUser;
    
    controls: {
        id: FormControl;
        email: FormControl;
        password: FormControl;
        name: FormControl;
        isActive: FormControl;
        role: FormControl;
    }
}