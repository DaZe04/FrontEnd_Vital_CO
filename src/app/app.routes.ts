import { Menu } from './components/menu/menu';
import { Routes } from '@angular/router';
import { IngredienteListarComponent } from './components/ingrediente/ingrediente-listar/ingrediente-listar';
import { IngredienteInsertarComponent } from './components/ingrediente/ingrediente-insertar/ingrediente-insertar';
import { IngredienteEditarComponent } from './components/ingrediente/ingrediente-editar/ingrediente-editar';
import { UsuarioListarComponent } from './components/usuario/usuario-listar/usuario-listar';
import { UsuarioInsertarComponent } from './components/usuario/usuario-insertar/usuario-insertar';
import { UsuarioEditarComponent } from './components/usuario/usuario-editar/usuario-editar';

export const routes: Routes = [
  { path: '', component: Menu },
  { path: 'ingrediente/listar', component: IngredienteListarComponent },
  { path: 'ingrediente/insertar', component: IngredienteInsertarComponent },
  { path: 'ingrediente/editar/:id', component: IngredienteEditarComponent },
  { path: 'usuario/listar', component: UsuarioListarComponent },
  { path: 'usuario/insertar', component: UsuarioInsertarComponent },
  { path: 'usuario/editar/:id', component: UsuarioEditarComponent },
];
