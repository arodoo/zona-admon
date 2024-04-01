import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarkerModalComponent } from '../marker-modal/marker-modal.component';

declare var google: any;
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  constructor(public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {

    const cordobaLatLng = { lat: 18.8842, lng: -96.92559 };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 13,
      center: cordobaLatLng,
    });

    this.addRandomMarkers(map, cordobaLatLng, 30);
  }

  addRandomMarkers(map: any, center: any, quantity: number): void {
    for (let i = 0; i < quantity; i++) {
      const randomLatLng = this.generateRandomCoordinates(center, 5000);
      const marker = new google.maps.Marker({
        position: randomLatLng,
        map: map,
        title: `Marcador ${i + 1}`
      });

      // Añadir evento de clic al marcador para abrir un modal
      marker.addListener('click', () => {
        this.openModal(marker.getTitle(), marker.getPosition().toString());
      });
    }
  }

  openModal(title: string, position: string): void {
    const dialogRef = this.dialog.open(MarkerModalComponent, {
      width: '450px',
      data: { title, position }
    });
  }

  generateRandomCoordinates(center: any, radius: number): any {
    const y0 = center.lat;
    const x0 = center.lng;
    const rd = radius / 111300; // Dividir por ~111300 para convertir metros a grados

    const u = Math.random();
    const v = Math.random();
    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    // Ajustar la longitud basada en la latitud
    const xp = x / Math.cos(y0);

    return {
      lat: y + y0,
      lng: xp + x0
    };
  }
}
