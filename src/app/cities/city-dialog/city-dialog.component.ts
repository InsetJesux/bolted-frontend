import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CitiesService } from '../cities.service';
import { MessageService } from 'primeng/api';
import { ICityFormGroup } from '../interfaces/city-form-group.interface';
import { ICity } from '../interfaces/city.interface';

@Component({
  selector: 'bolted-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.scss'],
})
export class CityDialogComponent  implements OnInit {
  subscriptions: Subscription[] = [];
  formGroup: ICityFormGroup;
  isLoading: boolean = false;
  city!: ICity;

  get isNew(): boolean {
    return this.formGroup.value.id === 0;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig,
    private readonly modelsService: CitiesService,
    private readonly messageService: MessageService,
  ) {
    
    this.formGroup = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      province: [{} as ICity, [Validators.required]],
    }) as ICityFormGroup;
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
    return (this.isNew ? 'Crear ' : 'Editar ') + (this.formGroup.value.name || 'población');
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
          summary: 'Población',
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
