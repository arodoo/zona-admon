import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

import { fadeAnimation } from '../../shared/animations/fade-animation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  animations: [fadeAnimation],
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

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
    let isActive: boolean = false;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      try {
        const credential = await this.authService.signIn(email, password);
        if (credential === true) {
          isActive = await this.authService.checkIfIsActive();
          console.log(isActive);
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
          //window.location.reload();
        } else {
          this.notificationService.showError('Error al iniciar sesión, verifique sus credenciales');
        }
      }
    }
  }

}
