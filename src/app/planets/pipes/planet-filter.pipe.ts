import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planetFilter'
})
export class PlanetFilterPipe implements PipeTransform {

  transform(items: any[], searchPlanet: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchPlanet) {
      return items;
    }
    searchPlanet = searchPlanet.toLowerCase();
    return items.filter( it => {
      return it.name.toLowerCase().includes(searchPlanet);
    });
  }
}
