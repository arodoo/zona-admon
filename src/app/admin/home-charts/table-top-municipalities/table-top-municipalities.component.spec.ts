import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTopMunicipalitiesComponent } from './table-top-municipalities.component';

describe('TableTopMunicipalitiesComponent', () => {
  let component: TableTopMunicipalitiesComponent;
  let fixture: ComponentFixture<TableTopMunicipalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTopMunicipalitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTopMunicipalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
