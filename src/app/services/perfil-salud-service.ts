import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { PerfilSalud } from '../models/perfil-salud.model';

const base_url = environment.base;  

@Injectable({
  providedIn: 'root',
})
export class PerfilSaludService {
  private url = `${base_url}/perfiles-salud`;  
  private listaCambio = new Subject<PerfilSalud[]>();  

  constructor(private http: HttpClient) {}


  list() {
    return this.http.get<PerfilSalud[]>(this.url);
  }

  insert(perfil: PerfilSalud) {
    return this.http.post(this.url, perfil);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  update(perfil: PerfilSalud) {
    return this.http.put(this.url, perfil);
  }

  listId(id: number) {
    return this.http.get<PerfilSalud>(`${this.url}/${id}`);
  }

  setList(lista: PerfilSalud[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

}
