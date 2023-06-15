import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { IModelFormGroup } from '../interfaces/model-form-group.interface';
import { ModelsService } from '../models.service';
import { IBrand } from 'src/app/brands/interfaces/brand.interface';

@Component({
  selector: 'bolted-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['./model-dialog.component.scss'],
})
export class ModelDialogComponent  implements OnInit {
  subscriptions: Subscription[] = [];
  formGroup: IModelFormGroup;
  isLoading: boolean = false;
  brand!: IBrand;

  get isNew(): boolean {
    return this.formGroup.value.id === 0;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly modelsService: ModelsService,
    private readonly messageService: MessageService,
  ) {
    
    this.formGroup = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      brand: [{} as IBrand, [Validators.required]],
    }) as IModelFormGroup;
    this.formGroup.patchValue(this.dialogConfig.data?.model);
    this.dialogConfig.header = this.headerName;
    this.dialogConfig.width = '400px';
  }

  ngOnInit() {
    const onFormValueChanges = this.formGroup.valueChanges.subscribe(() => {
      // TODO: TESTING SUBS
      this.dialogConfig.header = this.headerName;
    })

    this.subscriptions.push(onFormValueChanges);
  }

  get headerName() {
    return (this.isNew ? 'Crear ' : 'Editar ') + (this.formGroup.value.name || 'modelo');
  }

  async onSubmit() {
    this.isLoading = true;

    const request = this.isNew ? this.modelsService.create(this.formGroup.value) : this.modelsService.update(this.formGroup.value);

    request.subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Marca',
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
