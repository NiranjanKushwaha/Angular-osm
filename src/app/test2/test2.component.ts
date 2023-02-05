import { Component } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
})
export class Test2Component {
  private map: L.Map;
  lat = 12.9716;
  lon = 77.5946;
  private centroid: L.LatLngExpression;

  setCentroid(lat: number, lon: number): void {
    if (lat && lon) {
      this.centroid = [lat, lon];
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
      .bindPopup('Lat ' + this.lat + '<br />Lon ' + this.lon)
      .openPopup();
    tiles.addTo(this.map);
  }

  ngOnInit(): void {
    this.initMap();
  }
}
