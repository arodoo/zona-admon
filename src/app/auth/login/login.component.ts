import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

import { fadeAnimation } from '../../shared/animations/fade-animation';

import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    NgxLoadingModule
  ],
  templateUrl: './login.component.html',
  animations: [fadeAnimation],
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onLogin() {
    this.startLoading();
    let isActive: boolean = false;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      try {
        const credential = await this.authService.signIn(email, password);
        if (credential === true) {
          isActive = await this.authService.checkIfIsActive();
          if (isActive === true) {
            this.notificationService.showSuccess('Inicio de sesión exitoso');
            this.router.navigate(['/admin/home']);
          }else{
            console
            this.notificationService.showError('Usuario inactivo, por favor contacte al administrador');
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          this.notificationService.showError(error.message);
        } else {
          this.notificationService.showError('Error al iniciar sesión, verifique sus credenciales');
        }
      }
    }
    this.stopLoading();
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

}
