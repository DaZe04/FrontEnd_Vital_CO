import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Foro } from '../models/foro.model';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  private url = `${base_url}/foros`;
  private listaCambio = new Subject<Foro[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Foro[]>(this.url);
  }

  insert(f: Foro) {
    return this.http.post(this.url, f);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  update(f: Foro) {
    return this.http.put(this.url, f);
  }

  listId(id: number) {
    return this.http.get<Foro>(`${this.url}/${id}`);
  }

  setList(lista: Foro[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
