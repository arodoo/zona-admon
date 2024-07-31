import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { StatisticalPanelPage61Component } from '../statistical-panel-page-6-1/statistical-panel-page-6-1.component';
import { StatisticalPanelPage62Component } from '../statistical-panel-page-6-2/statistical-panel-page-6-2.component';

import { YearSelectorComponent } from '../../../shared/components/year-selector/year-selector.component';

import { fadeAnimation } from '../../../shared/animations/fade-animation';

@Component({
  selector: 'app-statistical-panel-page-6',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule, MatSelectModule,
    YearSelectorComponent,
    StatisticalPanelPage61Component,
    StatisticalPanelPage62Component,
  ],
  templateUrl: './statistical-panel-page-6.component.html',
  styleUrl: './statistical-panel-page-6.component.scss',
  animations: [fadeAnimation]
})
export class StatisticalPanelPage6Component {

  //logic to manage years selection
  public selectedYear = new Date().getFullYear();
  onYearChange(year: number): void {
    this.selectedYear = year;
  }
}
