import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkordersTableComponent } from '../workorders-table/workorders-table.component';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { IWorkorderFormGroup } from '../interfaces/workorder-form-group.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkordersService } from '../workorders.service';
import { IModel } from 'src/app/models/interfaces/model.interface';
import { IClient } from 'src/app/clients/interfaces/client.interface';
import { IWorkorder } from '../interfaces/workorder.interface';

@Component({
  selector: 'bolted-workorder-dialog',
  templateUrl: './workorder-dialog.component.html',
  styleUrls: ['./workorder-dialog.component.scss'],
})
export class WorkorderDialogComponent  implements OnInit {
  subscriptions: Subscription[] = [];
  formGroup: IWorkorderFormGroup;
  isLoading: boolean = false;

  get isNew(): boolean {
    return this.formGroup.value.id === 0;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly workordersService: WorkordersService,
    private readonly messageService: MessageService,
  ) {
    
    this.formGroup = this.formBuilder.group({
      id: [0, [Validators.required]],
      serial: ['', [Validators.required]],
      symptoms: ['', [Validators.required]],
      purchaseDate: [new Date()],
      warrantyDate: [new Date()],
      isWarranty: [false],
      client: [{} as IClient],
      model: [{} as IModel],
    }) as IWorkorderFormGroup;

    if (this.dialogConfig.data?.model.warrantyDate) {
      this.dialogConfig.data.model.warrantyDate! = new Date(this.dialogConfig.data?.model?.warrantyDate);
    }

    if (this.dialogConfig.data?.model.purchaseDate) {
      this.dialogConfig.data.model.purchaseDate! = new Date(this.dialogConfig.data?.model?.purchaseDate);
    }

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
    return this.isNew ? 'Crear OT' : 'Editar ' + this.formGroup.value.id;
  }

  async onSubmit() {
    this.isLoading = true;

    const value: IWorkorder = this.filterEmptyFields(this.formGroup.value);

    const request = this.isNew ? this.workordersService.create(value) : this.workordersService.update(value);

    request.subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'OT',
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
