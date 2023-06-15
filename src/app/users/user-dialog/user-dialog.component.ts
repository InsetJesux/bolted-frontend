import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUserFormGroup } from '../interfaces/user-form-group.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersService } from '../users.service';
import { MessageService } from 'primeng/api';
import { UserRole } from '../enums/user-role.enum';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'bolted-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent  implements OnInit {
  subscriptions: Subscription[] = [];
  formGroup: IUserFormGroup;
  isLoading: boolean = false;
  roles = [
    {
      id: 0,
      name: 'Usuario'
    },
    {
      id: 1,
      name: 'Administrador'
    }
  ]

  get isNew(): boolean {
    return this.formGroup.value.id === 0;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly usersService: UsersService,
    private readonly messageService: MessageService,
  ) {
    this.formGroup = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.maxLength(50), Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      isActive: [true],
      role: [0],
    }) as IUserFormGroup;
    this.formGroup.patchValue(this.dialogConfig.data?.model);
    this.dialogConfig.header = this.headerName;
    this.dialogConfig.width = '800px';
    if (this.isNew) {
      this.formGroup.controls.password.addValidators(Validators.required)
    }
  }

  ngOnInit() {
    const onFormValueChanges = this.formGroup.valueChanges.subscribe(() => {
      this.dialogConfig.header = this.headerName;
    })

    this.subscriptions.push(onFormValueChanges);
  }

  get headerName() {
    return (this.isNew ? 'Crear ' : 'Editar ') + (this.formGroup.value.name || 'usuario');
  }

  async onSubmit() {
    this.isLoading = true;

    const value: IUser = this.filterEmptyFields(this.formGroup.value);

    const request = this.isNew ? this.usersService.create(value) : this.usersService.update(value);

    request.subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Usuario',
          detail: `No se ha podido ` + this.headerName.toLowerCase(),
        })
        this.isLoading = false;
      },
    });
  }

  filterEmptyFields(data: any) {
    let fields: any = {};
    Object.keys(data).forEach(key => {
      if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
        fields[key] = data[key];
      }
    });

    return fields;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
