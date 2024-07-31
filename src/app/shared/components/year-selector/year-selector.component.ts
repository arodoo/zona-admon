import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-year-selector',
  standalone: true,
  imports: [MatSelectModule, CommonModule],
  templateUrl: './year-selector.component.html',
  styleUrl: './year-selector.component.scss'
})
export class YearSelectorComponent implements OnInit {
  @Output() yearChange = new EventEmitter<number>();

  public years: number[] = [];
  public selectedYear = new Date().getFullYear();

  ngOnInit(): void {
    this.getYears();
  }

  getYears(): void {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    for (let i = currentYear; i > currentYear - 10; i--) {
      this.years.push(i);
    }
  }

  onYearChange(year: number): void {
    this.selectedYear = year;
    this.yearChange.emit(year);
  }
}
