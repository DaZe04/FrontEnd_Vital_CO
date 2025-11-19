import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comentarios } from '../models/comentario.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private url = `${base_url}/comentarios`;
  private listaCambio = new Subject<Comentarios[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Comentarios[]>(this.url);
  }

  insert(c: Comentarios) {
    return this.http.post(this.url, c);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  update(c: Comentarios) {
    return this.http.put(this.url, c);
  }

  listId(id: number) {
    return this.http.get<Comentarios>(`${this.url}/${id}`);
  }

  setList(lista: Comentarios[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
