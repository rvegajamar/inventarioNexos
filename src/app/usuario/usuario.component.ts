import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Usuario } from '../models/Usuario';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from '../services/ex.service';
import { Cargo } from '../models/Cargo';
import Swal from 'sweetalert2';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class UsuarioComponent implements OnInit {
  formUsuarios: FormGroup;
  selectedRow: any;
  fechaActual:Date;
  DATAUSUARIO: Usuario[] = [];
  DATACARGOS: Cargo[] = [];
  dataSource = new MatTableDataSource(this.DATAUSUARIO);
  displayedColumns: string[] = ['nombre', 'edad', 'cargo', 'fechaIngreso','acciones'];
  usuario: Usuario = new Usuario();

  constructor(public service: Service) {
    this.formUsuarios = new FormGroup({
      nombre: new FormControl(''),
      edad: new FormControl(''),
      cargo: new FormControl(''),
      fechaIngreso: new FormControl(''),
      idUsuario: new FormControl(''),
    });
  }

  ngOnInit() {
    this.dataSource = null;
    this.fechaActual = new Date();
    this.listarUsuarios();
  }

  guardarUsuario() {
    //  this.Usuario.idUsuario = 3;
if(this.formUsuarios.get('nombre').value == null){
  console.log('Este es el mensaje', this.formUsuarios.get('nombre'));

}

    this.usuario.nombreUsuario = this.formUsuarios.get('nombre').value;
    this.usuario.edad = this.formUsuarios.get('edad').value;
    let cargo = this.formUsuarios.get("cargo").value;
    this.usuario.nombreCargo = cargo.nombreCargo;
    this.usuario.codigoCargo = cargo.codigoCargo;
    this.usuario.idUsuario = this.formUsuarios.get("idUsuario").value; 
    let fecha = new Date(this.formUsuarios.get('fechaIngreso').value);
    this.usuario.fechaIngresoUsuario = fecha;
    this.service.guardarUsuario(
      this,
      this.usuario, 
      this.sucessGuardarUsuario,
      this.errorHandler
    );
  }

  sucessGuardarUsuario(_this, data) {
    if (data.responseCode == 200) {
      _this.dataSource = new MatTableDataSource(data.load);
      _this.formUsuarios.reset();
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

  errorHandler(_this, data) {}

  listarUsuarios() {
    this.service.obtenerUsuarios(
      this,
      this.sucessObtenerUsuarios,
      this.errorHandler
    );
  }

  sucessObtenerUsuarios(_this, data) {
    if (data.responseCode == 200) {
      _this.dataSource = new MatTableDataSource(data.load);

      _this.listarCargos();
    }
  }

  highlight(row) {
    this.formUsuarios.get('nombre').setValue(row.nombreUsuario);
    this.formUsuarios.get('edad').setValue(row.edad);
    this.formUsuarios.get('cargo').setValue(row.codigoCargo);
    this.formUsuarios.get('fechaIngreso').setValue(row.fechaIngresoUsuario);
    this.formUsuarios.get("idUsuario").setValue(row.idUsuario);
  }

  listarCargos() {
    this.service.obtenerCargos(
      this,
      this.sucessObtenerCargos,
      this.errorHandler
    );
  }

  sucessObtenerCargos(_this, data) {
    if (data.responseCode == 200) {
      _this.DATACARGOS = data.load;
    }
  }

  eliminarUsuario(data) {
    this.service.elimiarUsuario(this, data.idUsuario, this.handlerSuccessEliminarUsuario, this.errorHandler)
  }

  handlerSuccessEliminarUsuario(_this, data ){
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
    this.formUsuarios.reset();
    
  }
}
