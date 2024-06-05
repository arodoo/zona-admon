import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Register } from '../../../core/models/register.interface';
import { RegistersService } from '../../../core/services/registers.service';
import { NotificationService } from '../../../core/services/notification.service';

declare const google: any;

@Component({
  selector: 'app-register-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  providers: [DatePipe],
  templateUrl: './register-detail-modal.component.html',
  styleUrl: './register-detail-modal.component.scss'
})
export class RegisterDetailModalComponent implements OnInit {

  registerForm: FormGroup;
  isEditMode = false;

  selectedImageFile: File | null = null;


  map: any;
  marker: any = null;

  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<RegisterDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { register: Register },
    private registerService: RegistersService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {
    this.registerForm = new FormGroup({
      title: new FormControl(data.register.title, [Validators.required]),
      description: new FormControl(data.register.description, [Validators.required]),
      date: new FormControl(data.register.date, [Validators.required]),
      images: new FormControl(data.register.images),
      latitud: new FormControl(data.register.latitud, [Validators.required]),
      longitud: new FormControl(data.register.longitud, [Validators.required]),
      active: new FormControl(data.register.active),
      user_id: new FormControl(data.register.user_id),
    });
  }

  ngOnInit(): void {
    this.formatDate();
    this.checkGeoLocationPermission();
    console.log('data', this.data);
    
  }

  formatDate() {
    const date = this.datePipe.transform(this.data.register.date, 'yyyy-MM-dd');
    this.registerForm.get('date')?.setValue(date);
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

  //init map with latitud and longitud
  initMap() {
    const latitud = this.registerForm.get('latitud')?.value;
    const longitud = this.registerForm.get('longitud')?.value;
    const myLatLng = { lat: parseFloat(latitud), lng: parseFloat(longitud) };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: myLatLng,
      zoom: 15,
    });

    if (this.isEditMode) {
      this.map.addListener('click', (event: any) => this.handleMapClick(event));
      this.marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        draggable: true,
      });
    }else{
      this.marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        draggable: false,
      });
    }
  }

  handleMapClick(event: any) {

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
        draggable: this.isEditMode
      });
    }

  }

  removeImage(index: number) {
    const images = this.registerForm.get('images')?.value;
    images.splice(index, 1);
    this.registerForm.get('images')?.setValue(images);
  }

}
