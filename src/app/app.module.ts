import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreetMapCompComponent } from './street-map-comp/street-map-comp.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { Test2Component } from './test2/test2.component';
@NgModule({
  declarations: [AppComponent, StreetMapCompComponent, Test2Component],
  imports: [BrowserModule, AppRoutingModule, LeafletModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
