import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticalDataService {

  constructor(private firestore: AngularFirestore) { }

  getYearlyData(year: number): Observable<number[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('incidents_bulkData', ref =>
      ref.where('date', '>=', startDate.toISOString())
        .where('date', '<', endDate.toISOString())
    )
      .valueChanges()
      .pipe(
        map((incidents: any[]) => {
          if (incidents.length === 0) {
            console.log('No data found for the year:', year);
            return new Array(12).fill(0);
          }


          const monthlyData = new Array(12).fill(0);
          incidents.forEach(incident => {
            const month = new Date(incident.date).getMonth();
            monthlyData[month]+= parseInt(incident.accidents, 10);
          });
          console.log('Monthly data for the year:', year, monthlyData);
          
          return monthlyData;
        })
      );
  }

}
