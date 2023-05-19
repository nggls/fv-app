import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService} from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es-CL';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { DetallePedidoComponent } from './pedidos/detalle-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { EditarPedidosComponent } from './pedidos/editar-pedidos.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductosComponent } from './productos/productos.component';
import { FormProductoComponent } from './productos/form-producto.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormUsuarioComponent } from './usuarios/form-usuario.component';
import { InicioComponent } from './inicio/inicio.component';

registerLocaleData(localeES,'es');

const routes :Routes = [
  {path: '', redirectTo: './clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['CUSTOMER', 'ADMIN','CARRIER','PRODUCER']}},
  {path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['CUSTOMER', 'ADMIN','CARRIER','PRODUCER']} },
  {path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['CUSTOMER', 'ADMIN','CARRIER','PRODUCER']}},
  {path: 'login', component: LoginComponent,},
  {path: 'pedidos/:id', component: DetallePedidoComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['CUSTOMER', 'ADMIN','CARRIER','PRODUCER']} },
  {path: 'pedidos/form/:clienteId', component: PedidosComponent,  canActivate: [AuthGuard, RoleGuard], data: {role: ['CUSTOMER', 'ADMIN','CARRIER','PRODUCER']}},
  {path: 'pedidos/form/:clienteId/:id', component: EditarPedidosComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['CUSTOMER', 'ADMIN','CARRIER','PRODUCER']} },
  {path: 'productos', component: ProductosComponent ,canActivate: [AuthGuard, RoleGuard], data: {role: ['ADMIN','PRODUCER',]}},
  {path: 'productos/form', component: FormProductoComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['CUSTOMER', 'ADMIN','PRODUCER','CARRIER']}},
  {path: 'productos/form/:id', component: FormProductoComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['CUSTOMER', 'ADMIN','PRODUCER','CARRIER']}},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ADMIN']}},
  {path: 'usuarios/form', component: FormUsuarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ADMIN']}},
  {path: 'usuarios/form/:id', component: FormUsuarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ADMIN']}},
  {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['CUSTOMER', 'ADMIN','CARRIER','PRODUCER']}}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    DetalleComponent,
    LoginComponent,
    DetallePedidoComponent,
    EditarPedidosComponent,
    PedidosComponent,
    ProductosComponent,
    FormProductoComponent,
    UsuariosComponent,
    FormUsuarioComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, MatDatepickerModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule
  ],
  providers: [ClienteService, ProductosComponent, UsuariosComponent,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
