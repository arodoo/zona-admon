import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


import { fadeAnimation } from '../../../shared/animations/fade-animation';

@Component({
  selector: 'app-chart-wrapper',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './chart-wrapper.component.html',
  styleUrl: './chart-wrapper.component.scss',
  animations: [fadeAnimation]
})
export class ChartWrapperComponent {

}
