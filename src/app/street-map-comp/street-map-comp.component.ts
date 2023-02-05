// ==================> using leaflet

import { Component, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'street-map-comp',
  templateUrl: './street-map-comp.component.html',
  styleUrls: ['./street-map-comp.component.css'],
})
export class StreetMapCompComponent {
  map: any;
  startlat = 12.9716;
  startlon = 77.5946;
  options: any;
  myMarker: any;
  nzoom = 12;
  @ViewChild('results', { static: false }) results: ElementRef;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.options = {
      center: [this.startlat, this.startlon],
      zoom: 9,
    };
    this.map = L.map('map', this.options);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'OSM',
    }).addTo(this.map);

    this.myMarker = L.marker([this.startlat, this.startlon], {
      title: 'Coordinates',
      alt: 'Coordinates',
      draggable: true,
    })
      .addTo(this.map)
      .on('dragend', () => {
        const lat = this.myMarker.getLatLng().lat.toFixed(8);
        const lon = this.myMarker.getLatLng().lng.toFixed(8);
        const czoom = this.map.getZoom();
        if (czoom < 18) {
          this.nzoom = czoom + 2;
        }
        if (this.nzoom > 18) {
          this.nzoom = 18;
        }
        if (czoom != 18) {
          this.map.setView([lat, lon], this.nzoom);
        } else {
          this.map.setView([lat, lon]);
        }
        this.myMarker.bindPopup('Lat ' + lat + '<br />Lon ' + lon).openPopup();
      });
  }

  chooseAddr(lat1: any, lng1: any) {
    this.myMarker.closePopup();
    this.map.setView([lat1, lng1], 18);
    this.myMarker.setLatLng([lat1, lng1]);
    const lat = lat1.toFixed(8);
    const lon = lng1.toFixed(8);
    this.myMarker.bindPopup('Lat ' + lat + '<br />Lon ' + lon).openPopup();
  }

  myFunction(arr: any) {
    let out = '<br />';
    let i;

    if (arr.length > 0) {
      for (i = 0; i < arr.length; i++) {
        out += `<div class='address' title='Show Location and Coordinates' onclick='chooseAddr(${arr[i].lat}, ${arr[i].lon});return false;'>${arr[i].display_name}</div>`;
      }
      // document.getElementById('results').innerHTML = out;
      this.results.nativeElement.innerHTML = out;
    } else {
      this.results.nativeElement.innerHTML = 'Sorry, no results...';
    }
  }

  addr_search() {
    const inp: any = document.getElementById('addr');
    this.http
      .get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=10&countrycodes=IN&q=${inp.value}`
      )
      .subscribe((data) => {
        this.myFunction(data);
      });
  }
}
