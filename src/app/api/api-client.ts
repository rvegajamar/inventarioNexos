import { Injectable } from "@angular/core";
import { inject } from "@angular/core/testing";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Globals } from "../Globals";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };
  
  declare let window: any;


@Injectable()
export class ApiClient{

    constructor(private globals: Globals, private http: HttpClient,private router: Router){

    }

    get(_this, url, successHandler, errorHandler) {
        this.http.get(this.globals.baseUrl+url, httpOptions).subscribe(result => {
          successHandler(_this, result);
        }, error => errorHandler(_this, error)
        );
      }
    
      post(_this, url, data, successHandler, errorHandler, removeContentType: boolean = false) {
        this.http.post(this.globals.baseUrl+url, data, httpOptions).subscribe(result => {
          successHandler(_this, result);
        }, error => errorHandler(_this, error)
        );
      }
    
      put(_this, url, data, successHandler, errorHandler, afterHandler, message: boolean = true) {
        this.http.put(this.globals.baseUrl+url, data, httpOptions).subscribe(result => {
          successHandler(_this, result, message);
          afterHandler(_this);
        }, error => errorHandler(_this, error, message)
        );
      }

     
}