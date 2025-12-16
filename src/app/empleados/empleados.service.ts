import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface EmpleadoListDto {
  empleadoId: number;
  cedula: string;
  nombreCompleto: string;
  telefono?: string;
  tipoEmpleado?: string;
  salario?: number;
  perfil: string;

  fechaUltimaAsignacion?: string | null;
  tiendaUltima?: string | null;
  supervisorUltimo?: string | null;
}

export interface EmpleadoCreateDto {
  cedula: string;
  nombreCompleto: string;
  telefono?: string | null;
  tipoEmpleado?: string | null;
  salario?: number | null;
  perfilId: number;
}

export interface EmpleadoUpdateDto {
  nombreCompleto: string;
  telefono?: string | null;
  tipoEmpleado?: string | null;
  salario?: number | null;
  perfilId: number;
}

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<EmpleadoListDto[]>(`${this.baseUrl}/Empleados`);
  }

  create(dto: EmpleadoCreateDto) {
    return this.http.post(`${this.baseUrl}/Empleados`, dto);
  }

  update(empleadoId: number, dto: EmpleadoUpdateDto) {
    return this.http.put(`${this.baseUrl}/Empleados/${empleadoId}`, dto);
  }

  delete(empleadoId: number) {
    return this.http.delete(`${this.baseUrl}/Empleados/${empleadoId}`);
  }
}
