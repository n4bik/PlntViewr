import {Component, OnInit} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit {
  planet: any;
  planetsListSubscription: Subscription;
  urlArray;

  constructor(private router: Router,
              private restService: RestService) {
  }

  ngOnInit() {
    this.urlArray = this.router.url.split('name=');
    this.subscribeToPlanetsListChange();

    if (this.restService.planetsPageToLoad === 0) {
      this.restService.getPlanetsList(7, 0, 100);
    } else {
      this.restService.getPlanetsList(0, 0, 100);
    }
  }

  private subscribeToPlanetsListChange() {
    this.planetsListSubscription = this.restService.planetsListChange
      .asObservable()
      .subscribe(
        data => {
          if (data[data.length - 1].name.trim().toLowerCase() === decodeURI(this.urlArray[1]).trim().toLowerCase()) {
            this.planet = data[data.length - 1];
            console.log('FOUND MATCH!');
            console.log(data[data.length - 1].name.trim().toLowerCase() + '===' + decodeURI(this.urlArray[1]).trim().toLowerCase())
          }
        }
      );
  }
}
