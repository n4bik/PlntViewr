import {Component, OnInit} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-planets-container',
  templateUrl: './planets-container.component.html',
  styleUrls: ['./planets-container.component.scss']
})
export class PlanetsContainerComponent implements OnInit {

  planetsList = [];
  planetsCount = 61;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 50, 100];
  planetsListSubscription: Subscription;
  planetsCountSubscription: Subscription;
  private startIndex = 0;
  private endIndex = 5;

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.initPlanets();
  }

  initPlanets() {
    if (this.restService.planetsPageToLoad === 0) {
      this.restService.getPlanetsList(1, 0, 5);
      this.subscribeToPlanetsListChange();
      this.subscribeToPlanetsCountChange();
    } else {
      this.restService.getPlanetsList(0, 0, 5);
      this.subscribeToPlanetsListChange();
      this.subscribeToPlanetsCountChange();
    }
  }

  getPlanets(pagesToLoad: number, startIndex: number, endIndex: number) {
    this.restService.getPlanetsList(pagesToLoad, startIndex, endIndex);
  }

  private subscribeToPlanetsListChange() {
    this.planetsListSubscription = this.restService.planetsListChange
      .asObservable()
      .subscribe(
        data => {
          this.planetsList = data;
        }
      );
  }

  private subscribeToPlanetsCountChange() {
    this.planetsCountSubscription = this.restService.planetsCountChange
      .asObservable()
      .subscribe(
        data => {
          this.planetsCount = data;
        }
      );
  }

  OnPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;

    if (this.endIndex > this.planetsCount) {
      this.endIndex = this.planetsCount;
    }
    this.validatePlanetListRequest();
  }

  private validatePlanetListRequest() {
    if (this.restService.planetsPageToLoad <= Math.ceil(this.endIndex / 10) && this.endIndex > 10) {
      this.getPlanets(Math.ceil(this.endIndex / 10) - this.restService.planetsPageToLoad, this.startIndex, this.endIndex);
    } else {
      this.getPlanets(0, this.startIndex, this.endIndex);
    }
  }

  getAllPlanets() {
    this.getPlanets(Math.ceil(this.planetsCount / 10) - this.restService.planetsPageToLoad, 0, 100);
  }

  returnToPagination() {
    this.getPlanets(0, this.startIndex, this.endIndex);
  }
}
