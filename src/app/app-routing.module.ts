import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlanetsContainerComponent} from './planets/components/planets-container/planets-container.component';
import {PlanetDetailsComponent} from './planets/components/planet-details/planet-details.component';


const routes: Routes = [
  {
    path: '', component: PlanetsContainerComponent
  },
  {
    path: 'planet-details', component: PlanetDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
