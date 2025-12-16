import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  nombreCompleto: string;
  perfil: string;
  permisos: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  autenticar(cedula: string, password: string) {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/User/Autenticar`,
      { cedula, password }
    );
  }

  registrar(data: {
    cedula: string;
    nombreCompleto: string;
    password: string;
    perfilId: number;
    tiendaId: number;
  }) {
    return this.http.post(`${this.baseUrl}/User/Registrar`, data);
  }

  setSession(auth: AuthResponse) {
    localStorage.setItem('session', JSON.stringify(auth));
  }

  getSession(): AuthResponse | null {
    const raw = localStorage.getItem('session');
    return raw ? JSON.parse(raw) : null;
  }

  logout() {
    localStorage.removeItem('session');
  }

  hasPermiso(nombre: string): boolean {
    const s = this.getSession();
    return !!s?.permisos?.includes(nombre);
  }
}
