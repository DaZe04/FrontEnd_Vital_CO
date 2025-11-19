import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroComida } from '../models/registro-comida.model';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RegistroComidasService {

  private baseUrl = `http://localhost:8080/registro-comida`;

  constructor(private http: HttpClient) {}

  listar(): Observable<RegistroComida[]> {
    return this.http.get<RegistroComida[]>(`${this.baseUrl}`);
  }

  insertar(registro: RegistroComida): Observable<any> {
    return this.http.post(`${this.baseUrl}`, registro);
  }
  obtenerPorId(id: number): Observable<RegistroComida> {
    return this.http.get<RegistroComida>(`${this.baseUrl}/${id}`);
  }
  actualizar(u: RegistroComida): Observable<any> {
    // tu backend para ingredientes usaba PUT sin id, adapta si tu controller de usuario es igual
    return this.http.put(this.baseUrl, u);
  }
   
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
