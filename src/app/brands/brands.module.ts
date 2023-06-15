import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BrandsRoutingModule } from './brands-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { BrandsPageComponent } from './brands-page/brands-page.component';
import { BrandsTableComponent } from './brands-table/brands-table.component';
import { BrandDialogComponent } from './brand-dialog/brand-dialog.component';
import { SharedModule } from "../shared/shared.module";
import { MessageService } from 'primeng/api';
import { AutocompleteBrandComponent } from './components/autocomplete-brand/autocomplete-brand.component';

@NgModule({
    declarations: [BrandsPageComponent, BrandsTableComponent, BrandDialogComponent, AutocompleteBrandComponent],
    imports: [
        CommonModule,
        BrandsRoutingModule,
        PrimeNgModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        AutocompleteBrandComponent,
    ]
})
export class BrandsModule { }
