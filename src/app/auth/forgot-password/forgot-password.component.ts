import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UsersService } from '../../core/services/users.service';
import { NotificationService } from '../../core/services/notification.service';
import { fadeAnimation } from '../../shared/animations/fade-animation';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  animations: [fadeAnimation]
})
export class ForgotPasswordComponent {

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private usersService: UsersService,
    private router: Router,
    private notificationService: NotificationService) { }

  async onSubmit() {
    if (this.forgotPasswordForm.valid && this.forgotPasswordForm.value.email) {
      try {
        const email = this.forgotPasswordForm.value.email as string;
        const response = await this.usersService.sendPasswordResetEmail(email);
        if (response) {
          this.notificationService.showSuccess('Se ha enviado un correo para restablecer la contraseña');
          this.router.navigate(['/login']);
        }
        this.router.navigate(['/login']);
      } catch (error) {
        this.notificationService.showError('Error al enviar el correo de restablecimiento de contraseña');
      }
    }
  }


}
