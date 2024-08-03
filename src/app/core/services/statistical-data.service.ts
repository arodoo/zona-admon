import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Incident } from '../models/incident.interface';

import { catchError, finalize, Observable, of } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticalDataService {

  constructor(private firestore: AngularFirestore) { }

  //to get yearly population
  getYearlyPopulation(year: number): Observable<number[]> {
    //console.log(`Fetching population for year: ${year}`);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('incidents_bulkData', ref =>
      ref.where('date', '>=', startDate.toISOString())
        .where('date', '<', endDate.toISOString())
    )
      .valueChanges()
      .pipe(
        map((incidents: any[]) => {
          //console.log(`Population data for year ${year}:`, incidents);
          if (incidents.length === 0) {
            return new Array(12).fill(0);
          }
          const monthlyData = new Array(12).fill(0);
          incidents.forEach(incident => {
            const month = new Date(incident.date).getMonth();
            const population = parseInt(incident.population, 10);
            if (!isNaN(population)) {
              monthlyData[month] += population;
            }
          });
          return monthlyData;
        })
      );
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
        //finalize(() => console.log(`Completed fetching accidents for year: ${year}`))
      );
  }

  //Get the deaths for the year
  getYearlyDeaths(year: number): Observable<number[]> {
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

    //Get the injuries for the year
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

  // Método para obtener las muertes por municipio
  getDeathsByMunicipality(year: number): Observable<{ municipality: string, deaths: number }[]> {
    //console.log(`Fetching deaths by municipality for year: ${year}`);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('incidents_bulkData', ref =>
      ref.where('date', '>=', startDate.toISOString())
        .where('date', '<', endDate.toISOString())
    )
      .valueChanges()
      .pipe(
        map((incidents: any[]) => {
          const deathsByMunicipality: { [key: string]: number } = {};
          incidents.forEach(incident => {
            const municipality = incident.municipality;
            const deaths = parseInt(incident.deaths, 10);
            if (!isNaN(deaths)) {
              if (!deathsByMunicipality[municipality]) {
                deathsByMunicipality[municipality] = 0;
              }
              deathsByMunicipality[municipality] += deaths;
            }
          });
          return Object.keys(deathsByMunicipality).map(municipality => ({
            municipality,
            deaths: deathsByMunicipality[municipality]
          }));
        })
      );
  }

  //Get the accidents by municipality
  getYearlyNewUsersNumber(year: number): Observable<number> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('users', ref =>
      ref.where('registered', '>=', startDate.toISOString())
        .where('registered', '<', endDate.toISOString())
        //to bring only active users
        .where('active', '==', true)
    )
      .valueChanges()
      .pipe(
        map((users: any[]) => users.filter(user => new Date(user.registered).getFullYear() === year).length),
        catchError(error => {
          console.error('Error fetching new users:', error);
          return of(0);
        }),
        //finalize(() => console.log(`Completed fetching new users for year: ${year}`))
      );
  }

  //Get the number of registers for the year
  getYearlyRegistersNumber(year: number): Observable<number> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('registers', ref =>
      ref.where('date', '>=', startDate.toISOString())
        .where('date', '<', endDate.toISOString())
        .where('active', '==', true)
    )
      .valueChanges()
      .pipe(
        map((registers: any[]) => registers.filter(register => new Date(register.date).getFullYear() === year).length + 1),
        catchError(error => {
          console.error('Error fetching registers:', error);
          return of(0);
        }),
        //finalize(() => console.log(`Completed fetching registers for year: ${year}`))
      );
  }

  //Get most deadly municipality
  getMostDeadlyMunicipality(year: number): Observable<string> {
    return this.getDeathsByMunicipality(year)
      .pipe(
        map(deathsByMunicipality => {
          if (deathsByMunicipality.length === 0) {
            return 'No data found';
          }
          return deathsByMunicipality.reduce((mostDeadlyMunicipality, currentMunicipality) => {
            if (currentMunicipality.deaths > mostDeadlyMunicipality.deaths) {
              return currentMunicipality;
            }
            return mostDeadlyMunicipality;
          }).municipality;
        })
      );
  }

  //Get incidents info scored for table on top municipalities (home component)
  getTopMunicipalitiesByDeaths(year: number): Observable<any[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return this.firestore.collection('incidents_bulkData', ref =>
      ref.where('date', '>=', startDate.toISOString())
        .where('date', '<', endDate.toISOString())
    )
      .valueChanges()
      .pipe(
        map((incidents: any[]) => {
          const municipalityData: { [key: string]: any } = {};

          incidents.forEach(incident => {
            const municipality = incident.municipality;
            if (!municipalityData[municipality]) {
              municipalityData[municipality] = {
                name: municipality,
                deaths: 0,
                accidents: 0,
                injured: 0,
                population: 0
              };
            }

            municipalityData[municipality].deaths += parseInt(incident.deaths, 10) || 0;
            municipalityData[municipality].accidents += parseInt(incident.accidents, 10) || 0;
            municipalityData[municipality].injured += parseInt(incident.injured, 10) || 0;
            municipalityData[municipality].population = parseInt(incident.population, 10) || 0;
          });

          return Object.values(municipalityData)
            .sort((a: any, b: any) => b.deaths - a.deaths)
            .slice(0, 5);
        }),
        catchError(error => {
          console.error('Error fetching municipalities data:', error);
          return of([]);
        }),
        //finalize(() => console.log(`Completed fetching municipalities data for year: ${year}`))
      );
  }

  //Get Incident info from fulk_data collection using the name
  getMunicipalityInfoByName(municipalityName: string): Observable<Incident[]> {
    return this.firestore.collection<Incident>('incidents_bulkData', ref =>
      ref.where('municipality', '==', municipalityName)
    )
      .valueChanges()
      .pipe(
        map((incidents: Incident[]) => {
          return incidents.map(incident => ({
            accidents: incident.accidents,
            date: incident.date,
            deaths: incident.deaths,
            id: incident.id,
            injured: incident.injured,
            municipality: incident.municipality,
            municipio: incident.municipio,
            population: incident.population,
            prediction: incident.prediction
          }));
        })
      );
  }


}
