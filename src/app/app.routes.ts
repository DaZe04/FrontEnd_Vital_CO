import { Menu } from './components/menu/menu';
import { Routes } from '@angular/router';
import { IngredienteListarComponent } from './components/ingrediente/ingrediente-listar/ingrediente-listar';
import { IngredienteInsertarComponent } from './components/ingrediente/ingrediente-insertar/ingrediente-insertar';
import { IngredienteEditarComponent } from './components/ingrediente/ingrediente-editar/ingrediente-editar';
import { IngredienteTopComponent } from './components/ingrediente/ingrediente-top/ingrediente-top';
import { UsuarioListarComponent } from './components/usuario/usuario-listar/usuario-listar';
import { UsuarioInsertarComponent } from './components/usuario/usuario-insertar/usuario-insertar';
import { UsuarioEditarComponent } from './components/usuario/usuario-editar/usuario-editar';
import { ForoListar } from './components/foro/foro-listar/foro-listar';
import { ForoInsertar } from './components/foro/foro-insertar/foro-insertar';
import { RegistroComidaListarComponent } from './components/registro-comida/registro-comida-listar/registro-comida-listar';
import { RegistroComidasInsertarComponent } from './components/registro-comida/registro-comida-insertar/registro-comida-insertar';
import { RegistroComidasEditarComponent } from './components/registro-comida/registro-comida-editar/registro-comida-editar';
import { DispositivoListarComponent } from './components/dispositivo/dispositivo-listar/dispositivo-listar';
import { DispositivoInsertarComponent } from './components/dispositivo/dispositivo-insertar/dispositivo-insertar';
import { DispositivoEditarComponent } from './components/dispositivo/dispositivo-editar/dispositivo-editar';
import { Comentarios } from './models/comentario.model';
import { ComentariosListar } from './components/comentarios/comentarios-listar/comentarios-listar';
import { ComentariosInsertar } from './components/comentarios/comentarios-insertar/comentarios-insertar';
import { AlertasInsertar } from './components/alertas/alertas-insertar/alertas-insertar';
import { AlertasListar } from './components/alertas/alertas-listar/alertas-listar';
import { Autenticador } from './components/autenticador/autenticador';
import { seguridadGuard } from './guard/seguridad-guard';
import { Home } from './components/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Autenticador,
  },
  {
    path: 'menu',
    component: Menu,
    canActivate: [seguridadGuard],
    children: [
      { path: 'ingrediente/listar', component: IngredienteListarComponent },
      { path: 'ingrediente/insertar', component: IngredienteInsertarComponent },
      { path: 'ingrediente/editar/:id', component: IngredienteEditarComponent },
      { path: 'ingrediente/topcalorias', component: IngredienteTopComponent },
      { path: 'usuario/listar', component: UsuarioListarComponent },
      { path: 'usuario/insertar', component: UsuarioInsertarComponent },
      { path: 'usuario/editar/:id', component: UsuarioEditarComponent },
      { path: 'foro/listar', component: ForoListar },
      { path: 'foro/insertar', component: ForoInsertar },
      { path: 'foro/editar/:id', component: ForoInsertar },
      { path: 'comentario/listar', component: ComentariosListar },
      { path: 'comentario/insertar', component: ComentariosInsertar },
      { path: 'comentario/editar/:id', component: ComentariosInsertar },
      { path: 'alertas/listar', component: AlertasListar },
      { path: 'alertas/insertar', component: AlertasInsertar },
      { path: 'alertas/editar/:id', component: AlertasInsertar },
      { path: 'registrocomida/listar', component: RegistroComidaListarComponent },
      { path: 'registrocomida/insertar', component: RegistroComidasInsertarComponent },
      { path: 'registrocomida/editar/:id', component: RegistroComidasEditarComponent },
      { path: 'dispositivo/listar', component: DispositivoListarComponent },
      { path: 'dispositivo/insertar', component: DispositivoInsertarComponent },
      { path: 'dispositivo/editar/:id', component: DispositivoEditarComponent },
    ]
  },
];
