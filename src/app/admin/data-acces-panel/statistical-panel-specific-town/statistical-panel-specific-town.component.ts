import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BuldDataService } from '../../../core/services/buld-data.service';
import { Incident } from '../../../core/models/incident.interface';

import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';

import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticalDataService } from '../../../core/services/statistical-data.service';
import { Observable } from 'rxjs';

import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-statistical-panel-specific-town',
  standalone: true,
  imports: [CommonModule,
    AppTitleComponent,
    BaseChartDirective,
    DateFormatPipe
  ],
  templateUrl: './statistical-panel-specific-town.component.html',
  styleUrls: ['./statistical-panel-specific-town.component.scss'],
  animations: [fadeAnimation]
})
export class StatisticalPanelSpecificTownComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  municipality: string = '';
  data: Incident[] = [];
  prediction: string = '';

  constructor(private route: ActivatedRoute,
    private buldDataService: BuldDataService,
    private cdr: ChangeDetectorRef,
    private statisticalDateService: StatisticalDataService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.getMunicipalityInfoByName(params['municipality']).subscribe(data => {
        this.data = data;
        this.prediction = this.setPrediction(this.data[0].prediction);
        console.log(this.data);
        this.updateRadarChartData();
      });
    });
  }


  setPrediction(prediction: Boolean | undefined): string {
    if (prediction === true) {
      return 'PELIGROSO';
    } else if (prediction === false) {
      return 'SEGURO';
    }
    else{
      return 'Municipio aún no evaluado';
    }
  }

  getMunicipalityInfoByName(municipality: string): Observable<Incident[]> {
    const municipalityInfo = this.statisticalDateService.getMunicipalityInfoByName(municipality);
    return municipalityInfo;
  }

  getFormattedDate(dateInput: any): string {
    let date: Date;

    if (dateInput && typeof dateInput.seconds === 'number') {
      // Caso de objeto Timestamp de Firestore
      date = new Date(dateInput.seconds * 1000);
    } else if (typeof dateInput === 'string') {
      // Caso de cadena en formato ISO
      date = new Date(dateInput);
    } else {
      return 'Fecha inválida';
    }

    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }


  //update radar chart data
  updateRadarChartData() {
    if (this.data.length > 0) {
      const incident = this.data[0];
      //parse values to number
      const population = parseInt(incident.population);
      const deaths = parseInt(incident.deaths);
      const injured = parseInt(incident.injured);
      const accidents = parseInt(incident.accidents);
      this.radarChartData.datasets[0].data = [accidents, deaths, injured];
      if (this.chart) {
        this.chart.ngOnChanges({});
      }
      this.cdr.detectChanges();
      //console.log('Radar'+this.radarChartData.datasets[0].data);
    }
  }

  //Radar Chart Data
  public radarChartData: ChartData<'radar'> = {
    labels: ['Accidentes', 'Muertes', 'Heridos'],
    datasets: [
      { data: [], label: 'Estadísticas' }
    ]
  };

  public radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
  };

  public radarChartLegend = true;
  public radarChartType: 'radar' = 'radar';
}