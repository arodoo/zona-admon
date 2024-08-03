import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';
import { PredictionService } from '../../../core/services/prediction.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-use-prediction-module',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, HttpClientModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './use-prediction-module.component.html',
  styleUrls: ['./use-prediction-module.component.scss'],
  providers: [PredictionService, provideNativeDateAdapter()]
})
export class UsePredictionModuleComponent implements OnInit {
  showInstructions = true;
  dontShowAgain = false;
  dataForm!: FormGroup;
  predictionResult!: string;
  municipios: any[] = [];
  nextId = 1;

  private fieldMapping: { [key: string]: string } = {
    municipioNombre: 'municipality',
    habitantes: 'population',
    accidentes: 'accidents',
    muertos: 'deaths',
    heridos: 'injured',
    fecha: 'date'
  };

  constructor(private authService: AuthService,
              private userService: UsersService,
              private fb: FormBuilder,
              private predictionService: PredictionService,
              private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      id: [''],
      municipioNombre: ['', Validators.required],
      habitantes: [0, [Validators.required, Validators.min(0)]],
      accidentes: [0, [Validators.required, Validators.min(0)]],
      muertos: [0, [Validators.required, Validators.min(0)]],
      heridos: [0, [Validators.required, Validators.min(0)]],
      fecha: ['', Validators.required]
    }, { validators: uniqueMunicipioFechaValidator(this.municipios) });

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
      const municipio = this.municipios.find(m => m.nombre === data.municipioNombre && m.fecha === data.fecha);
      if (!municipio) {
        const newMunicipio = { id: this.nextId++, nombre: data.municipioNombre, fecha: data.fecha };
        this.municipios.push(newMunicipio);
        data.municipio = newMunicipio.id;
        data.municipioNombre = newMunicipio.nombre;
      } else {
        data.municipio = municipio.id;
        data.municipioNombre = municipio.nombre;
      }

      const translatedData: { [key: string]: any } = {};
      for (const key in data) {
        if (this.fieldMapping[key]) {
          translatedData[this.fieldMapping[key]] = data[key];
        } else {
          translatedData[key] = data[key];
        }
      }

      this.predictionService.predict(data).subscribe({
        next: (htmlResponse) => {
          console.log('Respuesta del servicio de predicción:', htmlResponse); 
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlResponse, 'text/html');
          const predictionElements = doc.querySelectorAll('p'); 
          let predictionFound = false;
          let prediction = false;
          predictionElements.forEach(predictionElement => {
            const predictionText = predictionElement.textContent;
            console.log('Texto de la predicción:', predictionText); 
            if (predictionText!.includes('seguro') || predictionText!.includes('Seguro')) {
              this.predictionResult = 'El municipio es seguro.';
              predictionFound = true;
              prediction = false;
            } else if (predictionText!.includes('peligroso') || predictionText!.includes('Peligroso')) {
              this.predictionResult = 'El municipio es peligroso.';
              predictionFound = true;
              prediction = true;
            }
          });
          if (!predictionFound) {
            this.predictionResult = 'No se pudo determinar la seguridad del municipio.';
          }

          // Agregar el campo a los datos traducidos
          translatedData['prediction'] = prediction;

          // Guardar los datos en Firebase
          this.firestore.collection('incidentes_bulkData').add(translatedData)
            .then(() => {
              console.log('Datos guardados en Firebase correctamente');
            })
            .catch((error) => {
              console.error('Error al guardar los datos en Firebase:', error);
            });
        },
        error: (err) => {
          console.error('Error al predecir la seguridad del municipio:', err);
          this.predictionResult = 'Error al realizar la predicción.';
        }
      });
    } else {
      if (this.dataForm.errors?.['municipioFechaDuplicado']) {
        console.error('El municipio y la fecha ya existen. Por favor, ingrese un municipio y fecha únicos.');
      } else {
        console.error('Formulario inválido. Por favor, complete todos los campos requeridos correctamente.');
      }
    }
  }

  existeMunicipio(nombre: string): boolean {
    return this.municipios.some(m => m.nombre === nombre);
  }
}

// Validador personalizado para verificar la unicidad del municipio y la fecha
function uniqueMunicipioFechaValidator(municipios: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const municipioNombre = control.get('municipioNombre')?.value;
    const fecha = control.get('fecha')?.value;

    const municipioExistente = municipios.find(m => m.nombre === municipioNombre && m.fecha === fecha);

    return municipioExistente ? { municipioFechaDuplicado: true } : null;
  };
}