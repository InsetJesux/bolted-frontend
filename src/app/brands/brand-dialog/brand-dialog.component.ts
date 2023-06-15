import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IBrand } from '../interfaces/brand.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IBrandFormGroup } from '../interfaces/brand-form-group.interface';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { BrandsService } from '../brands.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'bolted-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss'],
})
export class BrandDialogComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  formGroup: IBrandFormGroup;
  isLoading: boolean = false;

  get isNew(): boolean {
    return this.formGroup.value.id === 0;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly brandsService: BrandsService,
    private readonly messageService: MessageService,
  ) {
    this.formGroup = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
    }) as IBrandFormGroup;
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
    return (this.isNew ? 'Crear ' : 'Editar ') + (this.formGroup.value.name || 'marca');
  }

  async onSubmit() {
    this.isLoading = true;

    const request = this.isNew ? this.brandsService.create(this.formGroup.value) : this.brandsService.update(this.formGroup.value);

    request.subscribe({
      next: (data) => {
        console.log('next')
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
