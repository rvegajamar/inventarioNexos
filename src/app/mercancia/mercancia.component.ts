import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MercanciaEncabezado } from '../models/MercanciaEncabezado';
import { Usuario } from '../models/Usuario';
import { Service } from '../services/ex.service';
import Swal from 'sweetalert2';
import { Movimiento } from '../models/Movimiento';


@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrls: ['./mercancia.component.scss']
})
export class MercanciaComponent implements OnInit {
  formMercancia:  FormGroup;
  DATAMERCANCIA: MercanciaEncabezado[] = [];
  DATAFILTRO: any [] = [];
  USUARIOS: Usuario[] = [];
  DATAUSUARIOS: Movimiento[] = [];
  contador: number;
  selectedRow: MercanciaEncabezado = new MercanciaEncabezado();
  dataSource = new MatTableDataSource(this.DATAMERCANCIA);
  displayedColumns: string[] = ['codigoMercancia','nombreProducto', 'usuarioCrea','cantidad','fechaIngreso', 'acciones'];
  mercanciaEnc: MercanciaEncabezado = new MercanciaEncabezado();
  nombreProducto: string;
  codigoMercancia: number;
  usuarioCrea: string;
  constructor(public service: Service) {
    this.formMercancia = new FormGroup({
      codigoMercancia: new FormControl(""),
      nombreProducto: new FormControl(""),
      cantidad: new FormControl(""),
      fechaIngreso: new FormControl(""),
      estado: new FormControl(""),
      usuario: new FormControl(""),
    });
   }

  ngOnInit() {
    this.listar();
  }

  guardarMercancia(){
    if(this.selectedRow != null){
          if(!this.selectedRow.idMercancia){
            this.mercanciaEnc.idUsuarioModifica = this.formMercancia.get("usuario").value;
            let fechaModifca = new Date();
            this.mercanciaEnc.fechaModificacion = fechaModifca;
          }else{
            this.mercanciaEnc.idUsuarioCrea = this.formMercancia.get("usuario").value;
          }

    }
    let usuario = this.formMercancia.get("usuario").value;
    this.mercanciaEnc.usuarioCrea = usuario.nombreUsuario;
    console.log("Este es usuario usuario: ", usuario.nombreUsuario);
    
    this.mercanciaEnc.codigoMercancia = this.formMercancia.get("codigoMercancia").value;
    this.mercanciaEnc.nombreProducto = this.formMercancia.get("nombreProducto").value;
    this.mercanciaEnc.cantidad = this.formMercancia.get("cantidad").value;
    this.mercanciaEnc.fechaIngreso = this.formMercancia.get("fechaIngreso").value;
    // this.service.verificacionNombre(this, this.mercanciaEnc, this.sucessVerificacionNombre, this.errorHandler);
    this.service.guardarMercancia(this, this.mercanciaEnc, this.sucessGuardarMercancia, this.errorHandler);
    
  }

  // sucessVerificacionNombre(_this, data){

  //       this.service.guardarMercancia(this, this.mercanciaEnc, this.sucessGuardarMercancia, this.errorHandler);
      
  //       Swal.fire({
  //         text: 'Nombre de mercancia existe',
  //         imageUrl: 'assets/check-concepto.png',
  //         imageWidth: 90,
  //         imageHeight: 90,
  //         width: 300,
  //         confirmButtonColor: '#03c793',
  //         confirmButtonText: 'Ok',
  //       });
  // }

  sucessGuardarMercancia(_this, data){

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

  listar(){

    this.service.obtenerMercancia(this, this.sucessObtenerMercancia, this.errorHandler);

  }

  sucessObtenerMercancia(_this, data){
    if(data.responseCode == 200){
      _this.dataSource = new MatTableDataSource(data.load);
      // this.DATAFILTRO = data.load;
      // console.log("Data: ", data.load);
      
       _this.listarUsuarios();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // listarUsuarios(){

  //   this.service.obtenerUsuarios(this, this.sucessObtenerUsuarios, this.errorHandler);
  // }

  // sucessObtenerUsuarios(_this, data){
  //   if(data.responseCode == 200){
  //      _this.USUARIOS =data.load;
  //   }

  // }

  eliminarMercancia(data) {
      this.service.eliminarMercancia(this, data.idMercancia, this.handlerSuccessEliminarMercancia, this.errorHandler)
      // console.log("Esto es lo que dice data: ", data);
      
    }



    handlerSuccessEliminarMercancia(_this, data ){
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
  

  highlight(row){
    this.formMercancia.get('codigoMercancia').setValue(row.codigoMercancia);
    this.formMercancia.get('nombreProducto').setValue(row.nombreProducto);
    this.formMercancia.get('cantidad').setValue(row.cantidad);
    this.formMercancia.get('fechaIngreso').setValue(row.fechaIngreso);
  }

  limpiar(){
    this.formMercancia.reset();
    
  }

  applyFilterXColumna(){
    var respaldo: any[] = this.DATAMERCANCIA;
    console.log("Datamecancia: ", this.DATAMERCANCIA);
      var data: any[] = this.DATAMERCANCIA.filter(res => {
      if (this.usuarioCrea != ""){        
        return res.usuarioCrea?.toUpperCase().includes(this.usuarioCrea?.toUpperCase())
      };   
      this.dataSource = new MatTableDataSource(data);
    })
    console.log("Este es el data de filtro: ", data);
    this.dataSource = new MatTableDataSource(data);
  }

  listarUsuarios() {
    this.service.obtenerUsuarios(
      this,
      this.sucessObtenerUsuarios,
      this.errorHandler
    );
  }

  sucessObtenerUsuarios(_this, data) {
    if (data.responseCode == 200) {
      _this.DATAUSUARIOS = data.load;

      console.log("Esta es data usuarios: " , _this.DATAUSUARIOS);
      
    }
  }
  

}
