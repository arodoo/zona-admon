import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarkerModalComponent } from '../marker-modal/marker-modal.component';
import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { RegistersService } from '../../../core/services/registers.service';
import { Register } from '../../../core/models/register.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [AppTitleComponent],
  templateUrl: './map.component.html',
  animations: [fadeAnimation],
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private registersSubscription?: Subscription;
  $registers: Register[] = [];
  dataSource: any;
  map: any;

  constructor(
    public dialog: MatDialog,
    private registersService: RegistersService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.initMap();
  }

  async initMap(): Promise<void> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLatLong = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: userLatLong,
          zoom: 10
        });
        this.getRegisters(); // Llama a getRegisters después de inicializar el mapa
      });
    }
  }

  async getRegisters() {
    this.registersSubscription = this.firestore.collection<Register>('registers',
      ref => ref.where('active', '==', true))
      .valueChanges({ idField: 'id' })
      .subscribe((data) => {
        this.$registers = data;
        this.dataSource = this.$registers;
        console.log('Registros cargados:', data);
        this.loadMarkers(); // Asegúrate de que loadMarkers se llame aquí
      });
  }

  async loadMarkers(): Promise<void> {
    this.$registers.forEach((register) => {
      const marker = new google.maps.Marker({
        position: { lat: register.latitud, lng: register.longitud },
        map: this.map,
        title: register.title
      });
      marker.addListener('click', () => {
        this.openModal(register.title, marker.getPosition().toUrlValue());
      });
    });
  }

  openModal(title: string, position: string): void {
    const dialogRef = this.dialog.open(MarkerModalComponent, {
      width: '450px',
      data: { title, position }
    });
  }

  ngOnDestroy(): void {
    this.registersSubscription?.unsubscribe();
  }
}
