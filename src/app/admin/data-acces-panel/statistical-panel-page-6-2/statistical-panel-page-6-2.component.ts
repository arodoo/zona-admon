import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import { StatisticalDataService } from '../../../core/services/statistical-data.service';

@Component({
  selector: 'app-statistical-panel-page-6-2',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './statistical-panel-page-6-2.component.html',
  styleUrl: './statistical-panel-page-6-2.component.scss'
})
export class StatisticalPanelPage62Component implements OnChanges{
  @Input() selectedYear!: number;
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  constructor(private statisticalDataService: StatisticalDataService) { }

  public polarAreaChartData2: ChartData<'polarArea'> = {
    labels: ['Heridos', 'Accidentes'],
    datasets: [
      { data: [0, 0], label: 'Proporción Heridos/Accidentes' }
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
    this.statisticalDataService.getYearlyInjuries(year).subscribe(injuries => {
      this.statisticalDataService.getYearlyAccidents(year).subscribe(accidents => {
        this.polarAreaChartData2.datasets[0].data = [
          injuries.reduce((a, b) => a + b, 0),
          accidents.reduce((a, b) => a + b, 0)
        ];
        this.chart?.update();
      });
    });
  }
}
