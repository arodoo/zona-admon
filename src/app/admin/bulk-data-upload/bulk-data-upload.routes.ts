import { Routes } from '@angular/router';
import { BulkDataUploadComponent } from './bulk-data-upload.component'; 

export const BULK_DATA_UPLOAD_ROUTES: Routes = [
  {
    path: '', // Ruta raíz para el componente BulkDataUpload
    component: BulkDataUploadComponent,
  },
  // Otras rutas hijas del componente BulkDataUpload aquí (si es necesario)
];