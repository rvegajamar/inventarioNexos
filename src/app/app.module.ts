import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './usuario/usuario.component';
import { PrincipalComponent } from './principal/principal.component';

import { MenuComponent } from './menu/menu.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiClient } from './api/api-client';
import { Globals } from './Globals';
import { HttpClientModule } from '@angular/common/http';
import { CargoComponent } from './cargo/cargo.component';
import { MercanciaComponent } from './mercancia/mercancia.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { MaterialModule } from './material.module';

export const DD_MM_YYYY_Format = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [					
    AppComponent,
      UsuarioComponent,
      PrincipalComponent,
      MenuComponent,
      CargoComponent,
      MercanciaComponent,
      MovimientosComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiClient, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
