import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Register } from '../../../core/models/register.interface';
import { RegistersService } from '../../../core/services/registers.service';
import { UsersService } from '../../../core/services/users.service';
import { NotificationService } from '../../../core/services/notification.service';

import { EnlargedImageComponent } from '../../../shared/components/enlarged-image/enlarged-image.component';
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

  imagesToDelete: string[] = [];
  newImages: File[] = [];

  selectedImageFile: File | null = null;


  map: any;
  marker: any = null;

  loading: boolean = false;

  userName: string = '';

  constructor(public dialogRef: MatDialogRef<RegisterDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { register: Register },
    private registerService: RegistersService,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {
    this.registerForm = new FormGroup({
      id: new FormControl(data.register.id),
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
    this.getUserName();
    console.log('Register:', this.data.register);
  }



  markImageForDeletion(imageUrl: string) {
    const index = this.imagesToDelete.indexOf(imageUrl);
    if (index > -1) {
      this.imagesToDelete.splice(index, 1); //En caso de estar marcada, se desmarca
    } else {
      this.imagesToDelete.push(imageUrl); //
    }
  }

  onSelectNewImages(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.newImages.push(...Array.from(fileList))
    }
  }

  async saveChangues() {
    this.loading = true;

    try {
      const register = this.registerForm.value;
      // Filtrar las imágenes para eliminar las marcadas
      const filteredImages = register.images.filter((imageUrl: string) => !this.imagesToDelete.includes(imageUrl));
      register.images = filteredImages;

      // Subir las nuevas imágenes y obtener sus URLs
      const newImagesUrls = await this.registerService.uploadImages(this.newImages, register.id);
      register.images = [...register.images, ...newImagesUrls.split(',')];

      // Actualizar el registro con las imágenes restantes y las nuevas
      await this.registerService.updateRegister(register);

      this.notificationService.showSuccess('Cambios guardados correctamente');
    } catch (error) {
      this.notificationService.showError('Error al guardar los cambios');
      console.error('Error al guardar los cambios:', error);
    } finally {
      this.loading = false;
      this.closeModal();
    }
  }


  async updateRegister(register: Register) {
    try {
      await this.registerService.updateRegister(register);
      this.notificationService.showSuccess('Registro actualizado correctamente');
      this.loading = false;
    } catch (error) {
      this.notificationService.showError('Error al actualizar el registro');
      this.loading = false;
    }
    this.closeModal();
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
    } else {
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

  getUserName() {
    this.usersService.getUserData(this.data.register.user_id).subscribe((user) => {
      if (user) {
        this.userName = user.name;
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  enableEdit() {
    this.isEditMode = true;
    this.initMap();
  }

  enlargeImage(imageUrl: string) {
    this.dialog.open(EnlargedImageComponent, {
      data: { imageUrl },
      width: '70%',
    });
  }
}