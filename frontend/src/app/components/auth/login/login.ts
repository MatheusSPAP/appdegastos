import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.email && this.password) {
      const credentials = { email: this.email, password: this.password };
      this.authService.login(credentials).subscribe({
        next: (response) => {
          // O token é salvo no localStorage pelo AuthService
          alert('Login realizado com sucesso!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erro no login', err);
          alert('Email ou senha inválidos.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
