import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dispositivo } from '../models/dispositivo.model';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  private url = 'http://localhost:8080/Dispo';

  constructor(private http: HttpClient) {}

  listar(): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${this.url}/dtos`);
  }

  insertar(dispositivo: Dispositivo): Observable<any> {
    return this.http.post(this.url, dispositivo);
  }

  obtenerPorId(id: number): Observable<Dispositivo> {
    return this.http.get<Dispositivo>(`${this.url}/${id}`);
  }

  editar(dispositivo: Dispositivo): Observable<any> {
    return this.http.put(this.url, dispositivo);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
