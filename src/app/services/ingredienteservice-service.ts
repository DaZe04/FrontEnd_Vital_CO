import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente.model';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private baseUrl = 'http://localhost:8080/ingredientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.baseUrl);
  }

  insertar(i: Ingrediente): Observable<any> {
    return this.http.post(this.baseUrl, i);
  }

  obtenerPorId(id: number): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.baseUrl}/${id}`);
  }

  actualizar(ing: Ingrediente) {
    return this.http.put(this.baseUrl, ing);  // <-- CORREGIDO
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
