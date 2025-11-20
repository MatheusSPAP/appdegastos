import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.username || !this.email || !this.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (this.password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const userData = { username: this.username, email: this.email, password: this.password };
    this.authService.register(userData).subscribe({
      next: (response) => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro no registro', err);
        // Check for a specific error message from the backend
        if (err.error && err.error.error && err.error.error.includes('já está em uso')) {
          alert('Este email já está em uso. Tente outro.');
        } else {
          alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
        }
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
