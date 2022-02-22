import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MercanciaEncabezado } from '../models/MercanciaEncabezado';
import { Movimiento } from '../models/Movimiento';
import { Service } from '../services/ex.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  formMovimiento: FormGroup;
  DATAMOVIMIENTO: Movimiento[] = [];
  DATARTICULO: MercanciaEncabezado[]=[];
  DataConcepto1: string[] = ['Salida por facturacion','Ajuste de inventario',
  'Traslados'];
  DataConcepto2: string[] = ['Devoluciones','Ajuste de inventario',
  'Traslados'];
  dataSource = new MatTableDataSource(this.DATAMOVIMIENTO);
  displayedColumns: string[] = ['codMercancia','fechaIngreso', 'observacion','proceso','almacen','concepto','proveedor'];
  cod_mercancia: any;
  fecha_movimiento: string;
 
  observacion: string;
  proceso: string;
  cantidad_vendida: number;
  almacen: string;
  concepto: string;
  proveedor: string;
  fechaIngreso: Date;
  mercanciaDet: Movimiento = new Movimiento();
  selectedRow: Movimiento = new Movimiento();
  
  constructor(public service: Service) {
    this.formMovimiento = new FormGroup({
      cod_mercancia: new FormControl(""),
      movimiento: new FormControl(""),
      fecha_movimiento : new FormControl(""),
      observacion: new FormControl(""),
      proceso: new FormControl(""),
      almacen: new FormControl(""),
      concepto: new FormControl(""),
      proveedor: new FormControl(""),
      cantidad_vendida: new FormControl("")
    });
   }

  ngOnInit(): void {
    this.listar();
    this.fechaIngreso = new Date();
  }

  limpiar(){
    this.formMovimiento.reset();
  }


  eliminarMercancia(element){
    console.log("hola");
    
  }

  highlight(row){
    // this.formMovimiento.get('codigoMercancia').setValue(row.cod_mercancia);
    // this.formMovimiento.get('fechaMovimiento').setValue(row.fecha_movimiento);
    // this.formMovimiento.get('observacion').setValue(row.observacion);
    // this.formMovimiento.get('proceso').setValue(row.proceso);
    // this.formMovimiento.get('almacen').setValue(row.almacen);
    // this.formMovimiento.get('concepto').setValue(row.concepto);
    // this.formMovimiento.get('proveedor').setValue(row.proveedor);
  }

  listar(){
    this.service.obtenerMovimiento(this, this.sucessObtenerMovimientos, this.errorHandler);
  }

  sucessObtenerMovimientos(_this, data){
    if(data.responseCode == 200){
      _this.dataSource = new MatTableDataSource(data.load);
    }
    _this.listarArticulo();
  }


  listarArticulo() {
    this.service.obtenerMercancia(this, this.sucessObtenerMercancia, this.errorHandler);
  }

  sucessObtenerMercancia(_this, data) {
    if(data.responseCode == 200){
      _this.DATARTICULO = data.load;
      console.log("Este es el data: ", data.load);
    }
  }
  
  errorHandler(_this, data){

  }

  // idUsuario: number;
  // codigoMercancia: number;
  // fechaMovimiento: Date;
  // observacion: string;
  // proceso: string;
  // almacen: string;
  // concepto: string; 
  // proveedor: string;


  guardarMovimiento(){
    // if(this.selectedRow != null){
    //       if(!this.selectedRow.idMercancia){
    //         this.mercanciaDet.idUsuarioModifica = this.formMercancia.get("usuario").value;
    //         let fechaModifca = new Date();
    //         this.mercanciaDet.fechaModificacion = fechaModifca;
    //       }else{
    //         this.mercanciaDet.idUsuarioCrea = this.formMercancia.get("usuario").value;
    //       }

    // }
    let mercancia = this.formMovimiento.get('cod_mercancia').value;
    this.mercanciaDet.codMercancia = mercancia.codigoMercancia;
    this.mercanciaDet.fechaMovimiento = new Date();
    this.mercanciaDet.observacion = this.formMovimiento.get("observacion").value;
    let proceso = this.formMovimiento.get("proceso").value;
    this.mercanciaDet.proceso = proceso;
    let almacen = this.formMovimiento.get("almacen").value;
    this.mercanciaDet.almacen = almacen;
    let concepto = this.formMovimiento.get("concepto").value;
    this.mercanciaDet.concepto = concepto;
    let proveedor = this.formMovimiento.get("proveedor").value;
    this.mercanciaDet.proveedor = proveedor;
    
    this.mercanciaDet.cantidad_vendida = this.formMovimiento.get("cantidad_vendida").value;
    
    this.service.guardarMovimiento(this, this.mercanciaDet, this.sucessGuardarMovimiento, this.errorHandler);
  }

  sucessGuardarMovimiento(_this, data){

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



  


}
