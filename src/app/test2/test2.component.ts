import { Component } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
})
export class Test2Component {
  private map: L.Map;
  // lat = 12.9716;
  // lon = 77.5946;
  // if no co-ordinate is provided then showed a default message and action on that
  lat = null;
  lon = null;
  private centroid: L.LatLngExpression;

  setCentroid(lat: any, lon: any): void {
    if (lat && lon) {
      this.centroid = [lat, lon];
    } else {
      this.centroid = [0, 0];
    }
  }
  private initMap(): void {
    this.setCentroid(this.lat, this.lon);
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12,
    });

    const tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution:
        '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    L.marker(this.centroid as L.LatLngExpression, {
      title: 'Coordinates',
      alt: 'Coordinates',
      draggable: true,
    })
      .addTo(this.map)
      .bindPopup(this.getMarkerContent())
      .openPopup();
    tiles.addTo(this.map);
  }

  getMarkerContent() {
    if (this.lat && this.lon) {
      return `Lat  + ${this.lat} + '<br />Lon ' + ${this.lon}`;
    } else {
      return `<a href="https://google.com">Configure address</a>`;
    }
  }

  ngOnInit(): void {
    this.initMap();
  }
}
