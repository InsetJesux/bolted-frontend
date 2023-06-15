import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { IUser } from '../users/interfaces/user.interface';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserRole } from '../users/enums/user-role.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  profile!: IUser;

  constructor(public layoutService: LayoutService, private readonly authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;

        this.model = [
          // {
          //   label: 'Tablero',
          //   items: [
          //     {
          //       label: 'Mis reparaciones',
          //       icon: 'pi pi-fw pi-home',
          //       routerLink: ['/workorders/assigned'],
          //     },
          //     {
          //       label: 'Calendario',
          //       icon: 'pi pi-fw pi-home',
          //       routerLink: ['/calendar'],
          //     },
          //   ],
          // },
          {
            label: 'Maestros',
            items: [
              {
                label: 'Marcas',
                icon: 'pi pi-fw pi-shopping-bag',
                routerLink: ['/brands'],
              },
              {
                label: 'Modelos',
                icon: 'pi pi-fw pi-book',
                routerLink: ['/models'],
              },
              {
                label: 'Provincias',
                icon: 'pi pi-fw pi-globe',
                routerLink: ['/provinces'],
              },
              {
                label: 'Poblaciones',
                icon: 'pi pi-fw pi-building',
                routerLink: ['/cities'],
              },
              {
                label: 'Clientes',
                icon: 'pi pi-fw pi-wallet',
                routerLink: ['/clients'],
              },
            ],
          },
          {
            label: 'Reparaciones',
            items: [
              {
                label: 'Ordenes de trabajo',
                icon: 'pi pi-fw pi-wrench',
                routerLink: ['/'],
              },
              // {
              //   label: 'Productos',
              //   icon: 'pi pi-fw pi-check-square',
              //   routerLink: ['/products'],
              // },
            ],
          },
          {
            label: 'Inventario',
            items: [
              {
                label: 'Almacen',
                icon: 'pi pi-fw pi-box',
                routerLink: ['/storages'],
              },
              // {
              //   label: 'Productos',
              //   icon: 'pi pi-fw pi-check-square',
              //   routerLink: ['/products'],
              // },
            ],
          },
        ];

        if (this.profile.role === UserRole.Admin) {
          this.model.push(
            {
              label: 'Administración',
              items: [
                // {
                //   label: 'Facturación',
                //   icon: 'pi pi-fw pi-eye',
                //   routerLink: ['/invoices'],
                //   badge: 'NEW',
                // },
                {
                  label: 'Usuarios',
                  icon: 'pi pi-fw pi-user',
                  routerLink: ['/users'],
                },
              ],
            },)
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
