import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-bulk-data-upload',
  templateUrl: './bulk-data-upload.component.html',
  styleUrls: ['./bulk-data-upload.component.scss'],
  standalone: true 
})
export class BulkDataUploadComponent {
  selectedFiles: FileList | undefined;
  uploadStatus: string | undefined;

  constructor(private firestore: AngularFirestore) {}

  // Mapeo de nombres de campos del dataset a los nombres de campos en Firestore
  fieldMapping = {
    municipio: 'municipality', // 'municipio' en el dataset se mapea a 'municipality' en Firestore
    poblacion: 'population', // 'poblacion' se mapea a 'population', etc.
   fecha:'date',
    heridos:'injured',
    muertos:'deaths'
    
    // Añade más mapeos según sea necesario
  };

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file = this.selectedFiles[0];
      const fileReader = new FileReader();
  
      fileReader.onload = (e) => {
        const content = fileReader.result as string;
        const lines = content.split('\n');
        const incidents: {
          municipality: string; // Asume que 'municipio' es la primera columna
          population: string; // Asume que 'poblacion' es la segunda columna, etc.
          date: string; injured: string; deaths: string;
        }[] = [];

        lines.forEach((line, index) => {
          if (index > 0 && line) {
            const columns = line.split(',');
            if (columns.length >= 5) {
              // Aplica el mapeo de nombres de campos aquí
              const incidentData = {
                municipality: columns[0], // Asume que 'municipio' es la primera columna
                population: columns[1], // Asume que 'poblacion' es la segunda columna, etc.
                date: columns[2],
                injured: columns[3],
                deaths: columns[4]
              };
              incidents.push(incidentData);
            }
          }
        });

        // Guarda cada incidente en Firestore
        incidents.forEach((incident) => {
          this.firestore.collection('incidents_bulkData').add(incident)
            .then(() => console.log('Incident added successfully'))
            .catch((error) => console.error('Error adding incident: ', error));
        });
      };
  
      fileReader.readAsText(file);
    }
  }

  uploadFiles() {
    if (!this.selectedFiles) {
      alert('Please select files to upload.');
      return;
    }

    this.uploadStatus = `Uploading ${this.selectedFiles.length} file(s)...`;
    // Simula una carga exitosa
    setTimeout(() => {
      this.uploadStatus = 'Upload completed successfully.';
    }, 1500);
  
    console.log(`${this.selectedFiles.length} file(s) selected for upload.`);
  }
}