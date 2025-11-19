import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { alertas } from '../models/alerta.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  private url = `${base_url}/alertas`;
  private listaCambio = new Subject<alertas[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<alertas[]>(this.url);
  }

  insert(a: alertas) {
    return this.http.post(this.url, a);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  update(a: alertas) {
    return this.http.put(this.url, a);
  }

  listId(id: number) {
    return this.http.get<alertas>(`${this.url}/${id}`);
  }

  setList(lista: alertas[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
