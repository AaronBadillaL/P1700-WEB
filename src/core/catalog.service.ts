import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface PerfilDto {
  perfilId: number;
  nombre: string;
}

export interface TiendaDto {
  tiendaId: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class CatalogosService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPerfiles() {
    return this.http.get<PerfilDto[]>(`${this.baseUrl}/Catalogos/Perfiles`);
  }

  getTiendas() {
    return this.http.get<TiendaDto[]>(`${this.baseUrl}/Catalogos/Tiendas`);
  }
}
