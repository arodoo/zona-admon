import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationServiceService {
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  setCurrentPage(page: number) {
    this.currentPageSubject.next(page);
  }
  
  constructor() { }
}
