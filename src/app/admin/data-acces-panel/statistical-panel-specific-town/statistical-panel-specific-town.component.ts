import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BuldDataService } from '../../../core/services/buld-data.service';
import { Incident } from '../../../core/models/incident.interface';

import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';

import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-statistical-panel-specific-town',
  standalone: true,
  imports: [CommonModule,
    AppTitleComponent,
    BaseChartDirective
  ],
  templateUrl: './statistical-panel-specific-town.component.html',
  styleUrl: './statistical-panel-specific-town.component.scss',
  animations: [fadeAnimation]
})
export class StatisticalPanelSpecificTownComponent implements OnInit{

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  municipality: string = '';
  data: Incident[] = [];

  constructor(private route: ActivatedRoute,
    private buldDataService: BuldDataService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.municipality = params['municipality'];
      this.buldDataService.getMunicipalityData(this.municipality).subscribe(data => {
        this.data = data;
        console.log(this.data);
        this.updateRadarChartData();
      });
    });
  }

  //update radar chart data
  updateRadarChartData() {
    if(this.data.length > 0){
      const incident = this.data[0];
      //parse values to number
      const population = parseInt(incident.population);
      const deaths = parseInt(incident.deaths);
      const injured = parseInt(incident.injured);
      const accidents = parseInt(incident.accidents);
      this.radarChartData.datasets[0].data = [accidents, deaths, injured];
      if(this.chart){
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
