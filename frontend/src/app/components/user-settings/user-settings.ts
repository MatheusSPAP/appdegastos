import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-settings.html',
  styleUrl: './user-settings.css'
})
export class UserSettings implements OnInit {
  
  userId: number | null = null;
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userId = payload.id;
        this.userService.getUser(this.userId!).subscribe({
          next: (data) => {
            this.username = data.username;
            this.email = data.email;
          },
          error: (err) => {
            console.error('Failed to load user data', err);
            alert('Não foi possível carregar os dados do usuário.');
          }
        });
      } catch (e) {
        console.error('Error decoding token', e);
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  }

  onSubmit() {
    if (!this.userId) {
      alert('Erro: ID do usuário não encontrado.');
      return;
    }

    const userData: any = {
      username: this.username,
      email: this.email
    };

    if (this.password) {
      userData.password = this.password;
    }

    this.userService.updateUser(this.userId, userData).subscribe({
      next: () => {
        alert('Informações atualizadas com sucesso!');
        // Optionally update the token if the username changes and it's stored in the token
      },
      error: (err) => {
        console.error('Failed to update user data', err);
        alert('Não foi possível atualizar os dados. Verifique os campos e tente novamente.');
      }
    });
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  deleteAccount() {
    if (!this.userId) {
      alert('Erro: ID do usuário não encontrado.');
      return;
    }

    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      this.userService.deleteUser(this.userId).subscribe({
        next: () => {
          alert('Conta excluída com sucesso!');
          this.authService.logout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Failed to delete account', err);
          alert('Não foi possível excluir a conta.');
        }
      });
    }
  }
}
