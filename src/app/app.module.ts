import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreetMapCompComponent } from './street-map-comp/street-map-comp.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowPositionOnMapComponent } from './test2/test2.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    StreetMapCompComponent,
    ShowPositionOnMapComponent,
    SearchLocationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutocompleteLibModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
