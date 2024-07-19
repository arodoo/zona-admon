import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = ''; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  predict(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}