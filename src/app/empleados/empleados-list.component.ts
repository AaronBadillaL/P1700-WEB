import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { EmpleadosService, EmpleadoListDto, EmpleadoCreateDto, EmpleadoUpdateDto } from './empleados.service';
import { EmpleadoModalComponent } from './empleado-modal/empleado-modal.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, EmpleadoModalComponent],
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.scss'
})
export class EmpleadosListComponent {
  session: any;

  empleados: EmpleadoListDto[] = [];
  loading = true;

  banner: { type: 'success' | 'error'; text: string } | null = null;

  showModal = false;
  modalMode: 'create' | 'edit' = 'create';
  editEmpleadoId: number | null = null;
  editInitial: any = null;

  constructor(
    private auth: AuthService,
    private empleadosApi: EmpleadosService,
    private cdr: ChangeDetectorRef
  ) {
    this.session = this.auth.getSession();
    this.load();
  }

  canConsulta(): boolean {
    return this.auth.hasPermiso('Consulta de Empleados');
  }

  canRegistro(): boolean {
    return this.auth.hasPermiso('Registro de Empleados');
  }

  load() {
    if (!this.canConsulta()) {
      this.loading = false;
      this.banner = { type: 'error', text: 'No tienes permiso para consultar empleados.' };
      return;
    }

    this.loading = true;
    this.empleadosApi.getAll().subscribe({
      next: (data) => {
        this.empleados = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.banner = { type: 'error', text: 'No se pudo cargar la lista de empleados.' };
        this.cdr.detectChanges();
      }
    });
  }

  openCreate() {
    this.modalMode = 'create';
    this.editEmpleadoId = null;
    this.editInitial = null;
    this.showModal = true;
  }

  openEdit(emp: EmpleadoListDto) {
    this.modalMode = 'edit';
    this.editEmpleadoId = emp.empleadoId;
    this.editInitial = emp;
    this.showModal = true;
  }

  onCreate(dto: EmpleadoCreateDto) {
    this.empleadosApi.create(dto).subscribe({
      next: () => {
        this.banner = { type: 'success', text: 'Empleado creado correctamente.' };
        this.showModal = false;
        this.load();
      },
      error: (err) => {
        this.banner = { type: 'error', text: err?.error?.message ?? 'Error creando empleado.' };
      }
    });
  }

  onEdit(payload: { empleadoId: number; dto: EmpleadoUpdateDto }) {
    this.empleadosApi.update(payload.empleadoId, payload.dto).subscribe({
      next: () => {
        this.banner = { type: 'success', text: 'Empleado actualizado correctamente.' };
        this.showModal = false;
        this.load();
      },
      error: (err) => {
        this.banner = { type: 'error', text: err?.error?.message ?? 'Error actualizando empleado.' };
      }
    });
  }

  delete(emp: EmpleadoListDto) {
    if (!confirm(`¿Eliminar a ${emp.nombreCompleto}?`)) return;

    this.empleadosApi.delete(emp.empleadoId).subscribe({
      next: () => {
        this.banner = { type: 'success', text: 'Empleado eliminado.' };
        this.load();
      },
      error: (err) => {
        this.banner = { type: 'error', text: err?.error?.message ?? 'No se pudo eliminar.' };
      }
    });
  }

  logout() {
    this.auth.logout();
    location.href = '/';
  }
}
