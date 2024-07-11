import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BuldDataService } from '../../../core/services/buld-data.service';
import { Incident } from '../../../core/models/incident.interface';

@Component({
  selector: 'app-statistical-panel-specific-town',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistical-panel-specific-town.component.html',
  styleUrl: './statistical-panel-specific-town.component.scss'
})
export class StatisticalPanelSpecificTownComponent implements OnInit{

  municipality: string = '';
  data: Incident[] = [];

  constructor(private route: ActivatedRoute, private buldDataService: BuldDataService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      
      this.municipality = params['municipality'];
      console.log(this.municipality);
      
      this.buldDataService.getMunicipalityData(this.municipality).subscribe(data => {
        this.data = data;
        console.log(this.data);
        
      });
    });
  }
}
