import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  private url: string;
  planetsPageToLoad = 0;
  planetsList = [];
  planetsCount = 61;
  planetsListChange = new Subject<any[]>();
  planetsCountChange = new Subject<number>();

  constructor(private http: HttpClient) {
  }

  getPlanetsList(pagesToLoad: number, startIndex: number, endIndex: number) {
    if (Math.ceil(this.planetsCount / 10) >= this.planetsPageToLoad && pagesToLoad > 0) {
      for (let i = 0; i < pagesToLoad; i++) {
        ++this.planetsPageToLoad;
        this.setUrlSuffix();
        this.getPlanetsFromServer(startIndex, endIndex);
      }
    } else {
      this.updatePlanetsListChangeWithoutLoadingNewPages(startIndex, endIndex);
    }
  }

  private updatePlanetsListChangeWithoutLoadingNewPages(startIndex: number, endIndex: number) {
    this.planetsListChange.next(this.planetsList.slice(startIndex, endIndex));
  }

  private getPlanetsFromServer(startIndex: number, endIndex: number) {
    this.http.get<any>(this.url).subscribe(
      data => {
        for (let i = 0; i < data.results.length; i++) {
          this.planetsList.push(data.results[i]);
          this.planetsListChange.next(this.planetsList.slice(startIndex, endIndex));
        }
        this.planetsCount = data.count;
        this.planetsCountChange.next(this.planetsCount);
      }
    );
  }

  private setUrlSuffix() {
    if (this.planetsPageToLoad === 1) {
      this.url = 'https://swapi.dev/api/planets/?format=json';
    } else {
      this.url = 'https://swapi.dev/api/planets/?format=json' + '&page=' + this.planetsPageToLoad;
    }
  }
}
