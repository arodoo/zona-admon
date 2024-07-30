import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { catchError, finalize, forkJoin, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticalDataService {

  constructor(private firestore: AngularFirestore) { }

  // get accidents, deaths and injuries for the year
  getYearlyData(year: number): Observable<{ accidents: number[], deaths: number[], injuries: number[] }> {
    console.log(`Fetching data for year: ${year}`);
    const response = forkJoin({
      accidents: this.getYearlyAccidents(year),
      deaths: this.getYearlyDeaths(year),
      injuries: this.getYearlyInjuries(year)
    });
    //console.log('Response:', response);
    return response;
    
  }

  // get the accidents for the year

  getYearlyAccidents(year: number): Observable<number[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('incidents_bulkData', ref =>
      ref.where('date', '>=', startDate.toISOString())
        .where('date', '<', endDate.toISOString())
    )
      .valueChanges()
      .pipe(
        //tap((incidents: any[]) => console.log(`Accidents data for year ${year}:`, incidents)),
        map((incidents: any[]) => {
          if (incidents.length === 0) {
            return new Array(12).fill(0);
          }
          const monthlyData = new Array(12).fill(0);
          incidents.forEach(incident => {
            const month = new Date(incident.date).getMonth();
            const accidents = parseInt(incident.accidents, 10);
            if (!isNaN(accidents)) {
              monthlyData[month] += accidents;
            }
          });
          return monthlyData;
        }),
        catchError(error => {
          console.error('Error fetching accidents:', error);
          return of(new Array(12).fill(0));
        }),
        finalize(() => console.log(`Completed fetching accidents for year: ${year}`))
      );
  }

/*   getYearlyAccidents(year: number): Observable<number[]> {
    console.log(`Fetching accidents for year: ${year}`);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('incidents_bulkData', ref =>
      ref.where('date', '>=', startDate.toISOString())
        .where('date', '<', endDate.toISOString())
    )
      .valueChanges()
      .pipe(
        map((incidents: any[]) => {
          console.log(`Accidents data for year ${year}:`, incidents);
          //console.log('Incidents for the year:', year, incidents);
          
          if (incidents.length === 0) {
            console.log('No data found for the year:', year);
            return new Array(12).fill(0);
          }


          const monthlyData = new Array(12).fill(0);
          incidents.forEach(incident => {
            const month = new Date(incident.date).getMonth();
            const accidents = parseInt(incident.accidents, 10);
            if (!isNaN(accidents)) {
              monthlyData[month] += accidents;
              
            } else {
              //console.warn(`Valor no numérico encontrado en el campo 'accidents': ${incident.accidents}`);
            }
          });

          return monthlyData;
        }
        )
      );
  } */

  getYearlyDeaths(year: number): Observable<number[]> {
    //console.log(`Fetching deaths for year: ${year}`);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('incidents_bulkData', ref =>
      ref.where('date', '>=', startDate.toISOString())
        .where('date', '<', endDate.toISOString())
    )
      .valueChanges()
      .pipe(
        map((incidents: any[]) => {
          //console.log(`Deaths data for year ${year}:`, incidents);
          //console.log('hurts for the year:', year, incidents);
          
          if (incidents.length === 0) {
            console.log('No data found for the year:', year);
            return new Array(12).fill(0);
          }

          const monthlyData = new Array(12).fill(0);
          incidents.forEach(incident => {
            const month = new Date(incident.date).getMonth();
            const deaths = parseInt(incident.deaths, 10);
            if (!isNaN(deaths)) {
              monthlyData[month] += deaths;
            } else {
              console.warn(`Valor no numérico encontrado en el campo 'deaths': ${incident.deaths}`);
            }
          });
          
          return monthlyData;
        })
      );
    }

  getYearlyInjuries(year: number): Observable<number[]> {
    //console.log(`Fetching injuries for year: ${year}`);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('incidents_bulkData', ref =>
      ref.where('date', '>=', startDate.toISOString())
        .where('date', '<', endDate.toISOString())
    )
      .valueChanges()
      .pipe(
        map((incidents: any[]) => {
          //console.log(`Injuries data for year ${year}:`, incidents);
          //console.log('Injuries for the year:', year, incidents);

          if (incidents.length === 0) {
            console.log('No data found for the year:', year);
            return new Array(12).fill(0);
          }

          const monthlyData = new Array(12).fill(0);
          incidents.forEach(incident => {
            const month = new Date(incident.date).getMonth();
            const injured = parseInt(incident.injured, 10);
            if (!isNaN(injured)) {
              monthlyData[month] += injured;
            } else {
              console.warn(`Valor no numérico encontrado en el campo 'injured': ${incident.injured}`);
            }
          });

          return monthlyData;
        })
      );
  }
}
