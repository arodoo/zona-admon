import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  @Input() searchResults: any[] = [];
  @Output() searchResultClick = new EventEmitter<any>();

  handleClick(result: any): void {
    this.searchResultClick.emit(result);
  }

  constructor() { }

}
