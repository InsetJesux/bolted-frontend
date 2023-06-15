import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthenticatedGuard } from './authentication/guards/authenticated.guard';
import { AdminGuard } from './authentication/guards/admin.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    // { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: '', loadChildren: () => import('./workorders/workorders.module').then(m => m.WorkordersModule) },
                    { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule) },
                    { path: 'models', loadChildren: () => import('./models/models.module').then(m => m.ModelsModule) },
                    { path: 'provinces', loadChildren: () => import('./provinces/provinces.module').then(m => m.ProvincesModule) },
                    { path: 'cities', loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule) },
                    { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
                    { path: 'storages', loadChildren: () => import('./storages/storages.module').then(m => m.StoragesModule) },
                    {
                        path: 'users',
                        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
                        canActivate: [ AdminGuard ],
                        canLoad: [ AdminGuard ],
                        canActivateChild: [ AdminGuard ]
                    },
                ],
                canActivate: [ AuthenticatedGuard ],
                canLoad: [ AuthenticatedGuard ],
                canActivateChild: [ AuthenticatedGuard ]
            
            },
            { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
            { path: '404', component: NotfoundComponent },
            { path: '**', redirectTo: '/404' },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
