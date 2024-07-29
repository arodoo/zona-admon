import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';
import { PredictionService } from '../../../core/services/prediction.service';

@Component({
  selector: 'app-use-prediction-module',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,  HttpClientModule
  ],
  templateUrl: './use-prediction-module.component.html',
  styleUrls: ['./use-prediction-module.component.scss'],
  providers: [PredictionService] // Asegúrate de proveer tu servicio si es necesario
})
export class UsePredictionModuleComponent implements OnInit {
  showInstructions = true;
  dontShowAgain = false;
  dataForm!: FormGroup;
  predictionResult!: string;

  constructor(private authService: AuthService,
    private userService: UsersService,
    private fb: FormBuilder,
    private predictionService: PredictionService
    ) { }

  ngOnInit(): void {

    this.dataForm = this.fb.group({
      municipality: ['', Validators.required],
      deaths: [0, [Validators.required, Validators.min(0)]],
      injured: [0, [Validators.required, Validators.min(0)]],
      population: [0, [Validators.required, Validators.min(0)]],
      //Para el algoritmo de predicción
      isSafe: [false,]
    });

    from(this.authService.getCurrentUserUid()).pipe(
      switchMap(uid => {
        if (uid) {
          return this.userService.getUserPreferences(uid);
        } else {
          return [null];
        }
      })
    ).subscribe(preferences => {
      if (preferences && preferences.showInstructions === false) {
        this.showInstructions = false;
      } else {
        from(this.authService.getCurrentUserUid()).subscribe(uid => {
          if (uid) {
            this.userService.setUserPreferences(uid, { showInstructions: true });
          }
        });
      }
    });
  }

  proceed(): void {
    from(this.authService.getCurrentUserUid()).subscribe(uid => {
      if (uid && this.dontShowAgain) {
        this.userService.setUserPreferences(uid, { showInstructions: false });
      }
    });
    this.showInstructions = false;
  }

  closeInstructions(): void {
    this.showInstructions = false;
  }

  saveData(): void {
    if (this.dataForm?.valid) {
      const data = this.dataForm.value;
      this.predictionService.predict(data).subscribe({
        next: (prediction) => {
          if (prediction === 0) {
            this.predictionResult = 'El municipio es seguro.';
          } else if (prediction === 1) {
            this.predictionResult = 'El municipio es peligroso.';
          }
        },
        error: (err) => {
          console.error('Error al predecir la seguridad del municipio:', err);
          this.predictionResult = 'Error al realizar la predicción.';
        }
      });
    }
  }
}