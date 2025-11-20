import { Routes } from '@angular/router';
import { Welcome } from './components/auth/welcome/welcome';
import { Register } from './components/auth/register/register';
import { Login } from './components/auth/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { UserSettings } from './components/user-settings/user-settings';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
     { path: '', component: Welcome },
     { path: 'register', component: Register },
     { path: 'login', component: Login },
     { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
     { path: 'user-settings', component: UserSettings, canActivate: [authGuard] }
];
