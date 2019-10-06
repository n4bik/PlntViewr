import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {
  planetsList = [];
  planetsListSubscription: Subscription;
  urlArray;
  planetName: any;

  constructor(private router: Router,
              private restService: RestService) {
  }

  ngOnInit() {
    this.urlArray = this.router.url.split('name=');
    this.planetName = decodeURI(this.urlArray[1]).trim();
    this.planetsList = this.restService.planetsList;
    this.subscribeToPlanetsListChange();

    if (this.restService.planetsPageToLoad < Math.ceil(this.restService.planetsCount / 10)) {
      this.restService.getPlanetsList(7, 0, 100);
    } else {
      this.restService.getPlanetsList(0, 0, 100);
    }
  }

  ngOnDestroy() {
    this.planetsListSubscription.unsubscribe();
  }

  private subscribeToPlanetsListChange() {
    this.planetsListSubscription = this.restService.planetsListChange
      .asObservable()
      .subscribe(
        data => {
          /*console.log(decodeURI(this.urlArray[1]).trim().toLowerCase());
          console.log(data[data.length - 1].name.trim().toLowerCase());
          if (data[data.length - 1].name.trim().toLowerCase() === decodeURI(this.urlArray[1]).trim().toLowerCase()) {
            console.log(data);
            this.planet = data[data.length - 1];
            console.log(this.planet);
            this.planetsListSubscription.unsubscribe();*/
          this.planetsList = data;
        }
      );
  }
}
