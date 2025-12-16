import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CatalogosService, PerfilDto, TiendaDto } from '../../../core/catalog.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  cedula = '';
  nombreCompleto = '';
  password = '';
  perfilId: number | null = null;
  tiendaId: number | null = null;

  perfiles: PerfilDto[] = [];
  tiendas: TiendaDto[] = [];

  error: string | null = null;
  loading = false;

  constructor(
    private auth: AuthService,
    private catalogos: CatalogosService
  ) {}

  ngOnInit(): void {
    this.catalogos.getPerfiles().subscribe({
      next: (data) => this.perfiles = data,
      error: () => this.error = 'No se pudieron cargar los perfiles'
    });

    this.catalogos.getTiendas().subscribe({
      next: (data) => this.tiendas = data,
      error: () => this.error = 'No se pudieron cargar las tiendas'
    });
  }

  registrar() {
    this.error = null;
    this.loading = true;
  
    this.auth.registrar({
      cedula: this.cedula,
      nombreCompleto: this.nombreCompleto,
      password: this.password,
      perfilId: this.perfilId!,
      tiendaId: this.tiendaId!
    }).subscribe({
      next: () => {
        this.loading = false;
        this.close.emit();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Error creando usuario';
      }
    });
  }
}