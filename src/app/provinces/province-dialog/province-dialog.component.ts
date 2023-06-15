import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ModelsService } from 'src/app/models/models.service';
import { IProvinceFormGroup } from '../interfaces/province-form-group.interface';
import { IProvince } from '../interfaces/province.interface';
import { ProvincesService } from '../provinces.service';

@Component({
  selector: 'bolted-province-dialog',
  templateUrl: './province-dialog.component.html',
  styleUrls: ['./province-dialog.component.scss'],
})
export class ProvinceDialogComponent  implements OnInit {
  subscriptions: Subscription[] = [];
  formGroup: IProvinceFormGroup;
  isLoading: boolean = false;
  province!: IProvince;

  get isNew(): boolean {
    return this.formGroup.value.id === 0;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly provincesService: ProvincesService,
    private readonly messageService: MessageService,
  ) {
    
    this.formGroup = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
    }) as IProvinceFormGroup;
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
    return (this.isNew ? 'Crear ' : 'Editar ') + (this.formGroup.value.name || 'provincia');
  }

  async onSubmit() {
    this.isLoading = true;

    const request = this.isNew ? this.provincesService.create(this.formGroup.value) : this.provincesService.update(this.formGroup.value);

    request.subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Provincia',
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
