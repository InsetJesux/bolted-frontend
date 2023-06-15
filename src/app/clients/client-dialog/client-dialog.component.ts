import { Component, OnInit } from '@angular/core';
import { Subscription, map, tap } from 'rxjs';
import { IClientFormGroup } from '../interfaces/client-form-group.interface';
import { IClient } from '../interfaces/client.interface';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientsService } from '../clients.service';
import { MessageService } from 'primeng/api';
import { phoneValidator } from 'src/app/shared/validators/phone.validator';
import { nifValidator } from 'src/app/shared/validators/nif.validator';

@Component({
  selector: 'bolted-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss'],
})
export class ClientDialogComponent  implements OnInit {
  subscriptions: Subscription[] = [];
  formGroup: IClientFormGroup;
  isLoading: boolean = false;
  client!: IClient;

  get isNew(): boolean {
    return this.formGroup.value.id === 0;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly clientsService: ClientsService,
    private readonly messageService: MessageService,
  ) {
    
    this.formGroup = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      nif: [undefined, [nifValidator]],
      phone: [undefined, [phoneValidator]],
      address: [undefined, [Validators.minLength(5)]],
      city: [undefined],
    }) as IClientFormGroup;
    this.formGroup.patchValue(this.dialogConfig.data?.model);
    this.dialogConfig.header = this.headerName;
    this.dialogConfig.width = '800px';
  }

  ngOnInit() {
    const onFormValueChanges = this.formGroup.valueChanges.subscribe(() => {
      // TODO: TESTING SUBS
      this.dialogConfig.header = this.headerName;
    })

    this.subscriptions.push(onFormValueChanges);
  }

  get headerName() {
    return (this.isNew ? 'Crear ' : 'Editar ') + (this.formGroup.value.name || 'cliente');
  }

  async onSubmit() {
    this.isLoading = true;

    const value: IClient = this.filterEmptyFields(this.formGroup.value);

    const request = this.isNew ? this.clientsService.create(value) : this.clientsService.update(value);

    request.subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cliente',
          detail: `No se ha podido ` + this.headerName.toLowerCase(),
        })
        this.isLoading = false;
      },
    });
  }

  filterEmptyFields(data: any) {
    let fields: any = {};
    Object.keys(data).forEach(key =>  fields[key] = (data[key] || null));

    return fields;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
