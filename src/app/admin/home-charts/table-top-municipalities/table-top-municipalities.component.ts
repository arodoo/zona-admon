import { Component, OnInit } from '@angular/core';
import { StatisticalDataService } from '../../../core/services/statistical-data.service';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-top-municipalities',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule, MatSelectModule,
    MatTableModule
  ],
  templateUrl: './table-top-municipalities.component.html',
  styleUrl: './table-top-municipalities.component.scss'
})
export class TableTopMunicipalitiesComponent {

  topMunicipalities: any[] = [];
  displayedColumns: string[] = ['name', 'deaths', 'accidents', 'injured', 'population'];
  currentYear = new Date().getFullYear();

  constructor(private statisticalDataService: StatisticalDataService) {}

  ngOnInit(): void {
    this.loadTopMunicipalities();
  }

  private loadTopMunicipalities(): void {
    this.statisticalDataService.getTopMunicipalitiesByDeaths(this.currentYear).subscribe(data => {
      this.topMunicipalities = data;
    });
  }
}
