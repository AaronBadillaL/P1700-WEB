import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  cedula = '';
  password = '';
  error = signal<string | null>(null);
  showRegister = false;


  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.error.set(null);
    this.auth.autenticar(this.cedula, this.password).subscribe({
      next: (res) => {
        this.auth.setSession(res);
        this.router.navigateByUrl('/empleados');
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Error autenticando');
      }
    });
  }
}
