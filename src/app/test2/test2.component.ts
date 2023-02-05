import { Component } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
})
export class Test2Component {
  private map: L.Map;
  private centroid: L.LatLngExpression = [12.9716, 77.5946];

  private initMap(): void {
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

    // create  5 random Jitteries and add them to map
    // const jittery = Array(5)
    //   .fill(this.centroid)
    //   .map((x) => [
    //     x[0] + (Math.random() - 0.5) / 10,
    //     x[1] + (Math.random() - 0.5) / 10,
    //   ])
    //   .map((x) => {
    //     console.log('x is: ', x);
    //     return L.marker(x as L.LatLngExpression);
    //   })
    //   .forEach((x) => {
    //     console.log(x);
    //     x.addTo(this.map);
    //   });
    // showing only one center point
    L.marker(this.centroid as L.LatLngExpression).addTo(this.map);
    tiles.addTo(this.map);
  }

  ngOnInit(): void {
    this.initMap();
  }
}
