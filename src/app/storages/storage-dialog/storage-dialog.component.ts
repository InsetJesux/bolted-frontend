import { Component, OnInit } from '@angular/core';
import { IStorageFormGroup } from '../interfaces/storage-form-group.interface';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StoragesService } from '../storages.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'bolted-storage-dialog',
  templateUrl: './storage-dialog.component.html',
  styleUrls: ['./storage-dialog.component.scss'],
})
export class StorageDialogComponent  implements OnInit {
  subscriptions: Subscription[] = [];
  formGroup: IStorageFormGroup;
  isLoading: boolean = false;

  get isNew(): boolean {
    return this.formGroup.value.id === 0;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly storagesService: StoragesService,
    private readonly messageService: MessageService,
  ) {
    this.formGroup = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['']
    }) as IStorageFormGroup;
    this.formGroup.patchValue(this.dialogConfig.data?.model);
    this.dialogConfig.header = this.headerName;
  }

  ngOnInit() {
    const onFormValueChanges = this.formGroup.valueChanges.subscribe(() => {
      this.dialogConfig.header = this.headerName;
    })

    this.subscriptions.push(onFormValueChanges);
  }

  get headerName() {
    return (this.isNew ? 'Crear ' : 'Editar ') + (this.formGroup.value.name || 'almacén');
  }

  async onSubmit() {
    this.isLoading = true;

    const request = this.isNew ? this.storagesService.create(this.formGroup.value) : this.storagesService.update(this.formGroup.value);

    request.subscribe({
      next: (data) => {
        console.log('next')
        this.dialogRef.close();
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Almacén',
          detail: `No se ha podido ` + this.headerName.toLowerCase(),
        })
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
