import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanetsContainerComponent } from './planets/components/planets-container/planets-container.component';
import { HeaderComponent } from './ui/header/header.component';
import { PlanetCardComponent } from './planets/components/planet-card/planet-card.component';
import {RestService} from './planets/services/rest.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatCardModule, MatGridListModule, MatIconModule, MatPaginatorModule, MatToolbarModule} from '@angular/material';
import { PlanetFilterPipe } from './planets/pipes/planet-filter.pipe';
import {FormsModule} from '@angular/forms';
import { PlanetDetailsComponent } from './planets/components/planet-details/planet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetsContainerComponent,
    HeaderComponent,
    PlanetCardComponent,
    PlanetFilterPipe,
    PlanetDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule
  ],
  providers: [
    RestService,
    HttpClient,
    PlanetsContainerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
