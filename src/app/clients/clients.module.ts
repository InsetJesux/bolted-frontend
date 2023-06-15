import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from "../shared/shared.module";
import { CitiesModule } from '../cities/cities.module';
import { AutocompleteClientComponent } from './components/autocomplete-client/autocomplete-client.component';


@NgModule({
    declarations: [ClientsPageComponent, ClientsTableComponent, ClientDialogComponent, AutocompleteClientComponent],
    imports: [
        CommonModule,
        ClientsRoutingModule,
        ReactiveFormsModule,
        PrimeNgModule,
        SharedModule,
        CitiesModule,
    ],
    exports: [AutocompleteClientComponent]
})
export class ClientsModule { }
