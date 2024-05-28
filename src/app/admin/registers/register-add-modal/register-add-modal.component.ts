import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Register } from '../../../core/models/register.interface';
import { AuthService } from '../../../core/services/auth.service';
import { RegistersService } from '../../../core/services/registers.service';
import { NotificationService } from '../../../core/services/notification.service';
import { log } from 'node:console';

declare const google: any;

@Component({
  selector: 'app-register-add-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-add-modal.component.html',
  styleUrl: './register-add-modal.component.scss'
})
export class RegisterAddModalComponent implements OnInit {

  register: Register = {
    title: '',
    description: '',
    date: '',
    uid: '',
    active: true,
    latitud: '',
    longitud: '',
    images: '',
    user_id: ''
  };
  isEditMode = false;

  registerForm: FormGroup;

  selectedImageFiles: File[] = [];
  imagePreviews: string[] = ['assets/img/no-image-selected.png'];
  imageSelected: boolean = false;
  markerSelected: boolean = false;
  loading: boolean = false;

  map: any;
  marker: any = null;

  constructor(
    public dialogRef: MatDialogRef<RegisterAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private notificationService: NotificationService,
    private registersService: RegistersService
  ) {
    this.registerForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(new Date().toISOString()),
      latitud: new FormControl('', [Validators.required]),
      longitud: new FormControl('', [Validators.required]),
      images: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.checkGeoLocationPermission();
  }

  async checkGeoLocationPermission() {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

      if (permissionStatus.state === 'granted') {
        this.initMap();
      } else if (permissionStatus.state === 'prompt')
        navigator.geolocation.getCurrentPosition(() => this.initMap());
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
    }
  }

  initMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLatLong = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: userLatLong,
          zoom: 20
        });
        this.map.addListener('click', (event: any) => this.handleMapClick(event));
      });
    }
  }

  handleMapClick(event: any) {
    this.loading = true;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.registerForm.controls['latitud'].setValue(lat);
    this.registerForm.controls['longitud'].setValue(lng);

    if (this.marker) {
      this.marker.setPosition({ lat, lng });
    } else {
      this.marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: 'Ubicación del registro',
        draggable: true,
      });
    }
    this.markerSelected = true;

    setTimeout(() => {
      this.loading = false;
      console.log('Ubicación seleccionada:', lat, lng);
    }, 2000);
    
    
  }





  handleImageSelection(event: any) {
    this.selectedImageFiles = event.target.files;
    this.imageSelected = true;
    this.imagePreviews = Array.from(this.selectedImageFiles).map(image => URL.createObjectURL(image));
    console.log(this.selectedImageFiles);

  }

  async saveRegister() {
    if (this.registerForm.valid) {

      const newRegister = this.registerForm.value;
      newRegister.user_id = await this.authService.getCurrentUserUid();
      newRegister.images = this.selectedImageFiles;
      console.log(newRegister);
      this.notificationService.showSuccess('Registro guardado con éxito');
      this.dialogRef.close(newRegister);
    }
  }
}
