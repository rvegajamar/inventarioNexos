import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Cargo } from '../models/Cargo';
import { Service } from '../services/ex.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoComponent implements OnInit {

  formCargos:  FormGroup;
  DATACARGO: Cargo[] = [];
  dataSource = new MatTableDataSource(this.DATACARGO);
  displayedColumns: string[] = ['codigoCargo','nombreCargo', 'acciones'];
  cargo: Cargo = new Cargo();
  constructor(public service: Service) {
    this.formCargos = new FormGroup({
      nombreCargo: new FormControl(""),
      cod: new FormControl("")
    });
   }

  ngOnInit() {
    this.listarCargos();
  }

  guardarCargo(){
     this.cargo.nombreCargo = this.formCargos.get("nombreCargo").value;
     this.cargo.codigoCargo = this.formCargos.get("cod").value;
  
      this.service.guardarCargo(this, this.cargo, this.sucessGuardarCargo, this.errorHandler);

  }

  sucessGuardarCargo(_this, data){

    if(data.responseCode == 200){
      _this.dataSource = new MatTableDataSource(data.load);
      Swal.fire({
        text: 'Guardado correctamente',
        imageUrl: 'assets/check-concepto.png',
        imageWidth: 90,
        imageHeight: 90,
        width: 300,
        confirmButtonColor: '#03c793',
        confirmButtonText: 'Ok',
      });
      _this.limpiar();
    }

  }

  errorHandler(_this, data){

  }


  listarCargos(){
    this.service.obtenerCargos(this, this.sucessObtenerCargos, this.errorHandler);

  } 

  sucessObtenerCargos(_this, data){
    if(data.responseCode == 200){
      _this.dataSource = new MatTableDataSource(data.load);

    }
  }

  highlight(row){
    this.formCargos.get('nombreCargo').setValue(row.nombreCargo);
    this.formCargos.get('cod').setValue(row.codigoCargo);
  }

  eliminarCargo(data){
    this.service.eliminarCargo(this, data.codigoCargo, this.handlerSuccessEliminarCargo, this.errorHandler)
  }

  handlerSuccessEliminarCargo(_this, data ){
    if (data.responseCode==200) {
      _this.dataSource = new MatTableDataSource(data.load);
      Swal.fire({
        text: 'Eliminado correctamente',
        imageUrl: 'assets/check-concepto.png',
        imageWidth: 90,
        imageHeight: 90,
        width: 300,
        confirmButtonColor: '#03c793',
        confirmButtonText: 'Ok',
      });
    }
    }

    limpiar(){
      this.formCargos.reset();
      
    }

}
