import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import { StatisticalDataService } from '../../../core/services/statistical-data.service';

@Component({
  selector: 'app-statistical-panel-page-6-1',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './statistical-panel-page-6-1.component.html',
  styleUrl: './statistical-panel-page-6-1.component.scss'
})
export class StatisticalPanelPage61Component implements OnChanges{
  @Input() selectedYear!: number;
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  constructor(private statisticalDataService: StatisticalDataService) { }

  public polarAreaChartData1: ChartData<'polarArea'> = {
    labels: ['Muertes', 'Accidentes'],
    datasets: [
      { data: [0, 0], label: 'Proporción Muertes/Accidentes' }
    ]
  };

  public polarAreaChartOptions: ChartOptions<'polarArea'> = {
    responsive: true,
  };

  public polarAreaChartLegend = true;
  public polarAreaChartType: 'polarArea' = 'polarArea';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedYear']) {
      this.loadChartData(this.selectedYear);
    }
  }

  loadChartData(year: number): void {
    this.statisticalDataService.getYearlyDeaths(year).subscribe(deaths => {
      this.statisticalDataService.getYearlyAccidents(year).subscribe(accidents => {
        this.polarAreaChartData1.datasets[0].data = [
          deaths.reduce((a, b) => a + b, 0),
          accidents.reduce((a, b) => a + b, 0)
        ];
        this.chart?.update();
      });
    });
  }
}
