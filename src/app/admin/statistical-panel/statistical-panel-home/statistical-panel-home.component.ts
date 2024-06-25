import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


import { fadeAnimation } from '../../../shared/animations/fade-animation';

@Component({
  selector: 'app-statistical-panel-home',
  standalone: true,
  imports: [],
  templateUrl: './statistical-panel-home.component.html',
  styleUrl: './statistical-panel-home.component.scss'
})
export class StatisticalPanelHomeComponent {

}
