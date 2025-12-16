import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogosService, PerfilDto } from '../../../core/catalog.service';
import { EmpleadoCreateDto, EmpleadoUpdateDto } from '../empleados.service';

type Mode = 'create' | 'edit';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-empleado-modal',
  templateUrl: './empleado-modal.component.html',
  styleUrl: './empleado-modal.component.scss'
})
export class EmpleadoModalComponent implements OnInit {
  @Input() mode: Mode = 'create';

  // Para edit
  @Input() empleadoId: number | null = null;
  @Input() initial: any = null;

  @Output() close = new EventEmitter<void>();
  @Output() saveCreate = new EventEmitter<EmpleadoCreateDto>();
  @Output() saveEdit = new EventEmitter<{ empleadoId: number; dto: EmpleadoUpdateDto }>();

  perfiles: PerfilDto[] = [];

  // form
  cedula = '';
  nombreCompleto = '';
  telefono: string | null = null;
  tipoEmpleado: string | null = null;
  salario: number | null = null;
  perfilId: number | null = null;

  error: string | null = null;

  constructor(private catalogos: CatalogosService) {}

  ngOnInit(): void {
    this.catalogos.getPerfiles().subscribe({
      next: (data) => (this.perfiles = data),
      error: () => (this.error = 'No se pudieron cargar los perfiles')
    });

    if (this.mode === 'edit' && this.initial) {
      // En edit NO permitimos cambiar cédula (porque es UNIQUE)
      this.cedula = this.initial.cedula ?? '';
      this.nombreCompleto = this.initial.nombreCompleto ?? '';
      this.telefono = this.initial.telefono ?? null;
      this.tipoEmpleado = this.initial.tipoEmpleado ?? null;
      this.salario = this.initial.salario ?? null;

      // Si en el listado no viene PerfilId, pedimos que el backend lo envíe o lo resolvemos por nombre.
      // Recomendado: en tu GET /Empleados ya enviar PerfilId (si no, decime y lo adaptamos).
      this.perfilId = this.initial.perfilId ?? null;
    }
  }

  submit() {
    this.error = null;

    if (!this.nombreCompleto || !this.perfilId) {
      this.error = 'NombreCompleto y Perfil son requeridos.';
      return;
    }

    if (this.mode === 'create') {
      if (!this.cedula) {
        this.error = 'Cédula es requerida.';
        return;
      }

      const dto: EmpleadoCreateDto = {
        cedula: this.cedula,
        nombreCompleto: this.nombreCompleto,
        telefono: this.telefono,
        tipoEmpleado: this.tipoEmpleado,
        salario: this.salario,
        perfilId: this.perfilId
      };

      this.saveCreate.emit(dto);
      return;
    }

    // edit
    if (!this.empleadoId) {
      this.error = 'EmpleadoId inválido.';
      return;
    }

    const dto: EmpleadoUpdateDto = {
      nombreCompleto: this.nombreCompleto,
      telefono: this.telefono,
      tipoEmpleado: this.tipoEmpleado,
      salario: this.salario,
      perfilId: this.perfilId
    };

    this.saveEdit.emit({ empleadoId: this.empleadoId, dto });
  }
}
