import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente.model';
import { IngredienteCalorias } from '../models/ingrediente-calorias.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private apiBase = environment.base; // e.g. http://localhost:8080
  private baseUrl = `${this.apiBase}/ingredientes`;

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

  topCalorias(): Observable<IngredienteCalorias[]> {
    // En backend: @RequestMapping("/ingredientes") + @GetMapping("/ingredientes/topcalorias")
    // Ruta completa: /ingredientes/ingredientes/topcalorias
    return this.http.get<IngredienteCalorias[]>(`${this.apiBase}/ingredientes/ingredientes/topcalorias`);
  }
}
