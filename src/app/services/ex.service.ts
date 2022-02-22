import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiClient } from "../api/api-client";
@Injectable({
    providedIn: 'root',
  })

export class Service{

    constructor(private apiCliente: ApiClient, private http:HttpClient) {}

      guardarUsuario(_this, data, successHandler, errorHandler) {
          const url = 'v1/usuario/guardarUsuario';
          this.apiCliente.post(_this, url, data, successHandler, errorHandler);
        }

      obtenerUsuarios(_this, successHandler, errorHandler) {
        const url = 'v1/usuario/obtenerUsuarios';
        this.apiCliente.get(_this, url, successHandler, errorHandler);
      }

      guardarCargo(_this, data, successHandler, errorHandler) {
        const url = 'v1/cargo/guardarCargo';
        this.apiCliente.post(_this, url, data, successHandler, errorHandler);
      }

      obtenerCargos(_this, successHandler, errorHandler) {
        const url = 'v1/cargo/obtenerCargos';
        this.apiCliente.get(_this, url, successHandler, errorHandler);
      }

      elimiarUsuario(_this, data, successHandler, errorHandler) {
        const url = 'v1/usuario/eliminarUsuario';
        this.apiCliente.post(_this, url, data, successHandler, errorHandler);
      }

      eliminarCargo(_this, data, successHandler, errorHandler) {
        const url = 'v1/cargo/eliminarCargo';
        this.apiCliente.post(_this, url, data, successHandler, errorHandler);
      }

      guardarMercancia(_this, data, successHandler, errorHandler) {
        const url = 'v1/mercanciaEnc/guardarMercancia';
        this.apiCliente.post(_this, url, data, successHandler, errorHandler);
      }

      verificacionNombre(_this, data, successHandler, errorHandler) {
        const url = 'v1/mercanciaEnc/VerificarNombre';
        this.apiCliente.post(_this, url, data, successHandler, errorHandler);
      }

      obtenerMercancia(_this, successHandler, errorHandler) {
        const url = 'v1/mercanciaEnc/obtenerMercancias';
        this.apiCliente.get(_this, url, successHandler, errorHandler);
      }

      eliminarMercancia(_this, data,successHandler, errorHandler) {
        const url = 'v1/mercanciaEnc/eliminarMercancia';
        this.apiCliente.post(_this, url, data,successHandler, errorHandler);
      }

      obtenerMovimiento(_this, successHandler, errorHandler) {
        const url = 'v1/mercanciaDet/obtenerMovimientos';
        this.apiCliente.get(_this, url, successHandler, errorHandler);
      }

      guardarMovimiento(_this,data, successHandler, errorHandler) {
        const url = 'v1/mercanciaDet/guardarMovimiento';
        this.apiCliente.post(_this, url,data, successHandler, errorHandler);
      }
}