import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PrincipalComponent } from './principal/principal.component';
import { UsuarioComponent } from './usuario/usuario.component';


const routes: Routes = [
  { path:'usuario',component:UsuarioComponent },
  { path:'',component:PrincipalComponent },
  { path:'menu',component:MenuComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
