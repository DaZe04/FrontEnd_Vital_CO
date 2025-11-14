import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/usuarios'; // ajusta al de tu backend

  constructor(private http: HttpClient) {}

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  insertar(u: Usuario): Observable<any> {
    return this.http.post(this.baseUrl, u);
  }
  
  actualizar(u: Usuario): Observable<any> {
    // tu backend para ingredientes usaba PUT sin id, adapta si tu controller de usuario es igual
    return this.http.put(this.baseUrl, u);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
