import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = '/api'; // Usar el proxy

  constructor(private http: HttpClient) { }

  predict(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('municipio', data.municipio)
      .set('habitantes', data.habitantes.toString())
      .set('accidentes', data.accidentes.toString())
      .set('muertos', data.muertos.toString())
      .set('heridos', data.heridos.toString());

    return this.http.post(this.apiUrl, body.toString(), { headers, responseType: 'text' });
  }
}