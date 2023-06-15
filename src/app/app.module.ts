import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        IonicModule.forRoot(),
        PrimeNgModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        MessageService, DialogService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
