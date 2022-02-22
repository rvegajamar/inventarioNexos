import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

let modulos = [
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule
]

@NgModule({
    imports: modulos,
    exports: modulos,
  })
  export class MaterialModule { }