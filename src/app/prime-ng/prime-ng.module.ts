import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  exports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    StyleClassModule,
    ToastModule,
    MenuModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    TagModule,
    SliderModule,
    ProgressBarModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    RatingModule,
    RadioButtonModule,
    DynamicDialogModule,
    AutoCompleteModule,
    InputSwitchModule,
    CalendarModule,
    InputTextareaModule,
  ]
})
export class PrimeNgModule { }
