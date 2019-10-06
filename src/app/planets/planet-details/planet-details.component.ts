import {Component, OnInit} from '@angular/core';
import {RestService} from '../services/rest.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit {
  planet: any;

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.initPlanets();
  }

  initPlanets() {
    if (this.restService.planetsPageToLoad === 0) {
      this.restService.getPlanetsList(7, 0, 5);
    } else {
    }
  }
}
