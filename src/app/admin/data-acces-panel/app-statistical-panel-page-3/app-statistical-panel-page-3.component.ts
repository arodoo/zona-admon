import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-app-statistical-panel-page-3',
  standalone: true,
  imports: [],
  templateUrl: './app-statistical-panel-page-3.component.html',
  styleUrl: './app-statistical-panel-page-3.component.scss'
})
export class AppStatisticalPanelPage3Component {
  @ViewChild('deathsChart') deathsChart!: BaseChartDirective;
  @ViewChild('injuriesChart') injuriesChart!: BaseChartDirective;
}
