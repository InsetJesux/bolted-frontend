import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { ModelsPageComponent } from './models-page/models-page.component';
import { ModelsTableComponent } from './models-table/models-table.component';
import { ModelDialogComponent } from './model-dialog/model-dialog.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { BrandsModule } from '../brands/brands.module';
import { AutocompleteModelComponent } from './components/autocomplete-model/autocomplete-model.component';


@NgModule({
    declarations: [ModelsPageComponent, ModelsTableComponent, ModelDialogComponent, AutocompleteModelComponent],
    imports: [
        CommonModule,
        ModelsRoutingModule,
        ReactiveFormsModule,
        PrimeNgModule,
        SharedModule,
        BrandsModule,
    ],
    exports: [AutocompleteModelComponent]
})
export class ModelsModule { }
