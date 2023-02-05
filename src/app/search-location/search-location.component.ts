import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
  catchError,
  Subject,
  map,
} from 'rxjs';

@Component({
  selector: 'search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css'],
})
export class SearchLocationComponent {
  private map: L.Map;
  private marker: L.Marker;
  lat = 12.9716;
  lon = 77.5946;
  private centroid: L.LatLngExpression;

  // search related
  isCorporateSearchLoading = false;
  searchData: Array<any>;
  addressDataSubscription: Subscription;
  addressDataObservable = new Subject<Array<any>>();
  @ViewChild('searchInp') searchInp: ElementRef;
  // search related ends

  constructor(private http: HttpClient) {
    this.searchCorporate = this.searchCorporate.bind(this);
    this.addressDataSubscription = this.addressDataObservable.subscribe(
      (addressData: any) => {
        if (addressData.length) {
          this.searchData = addressData;
        }
      }
    );
  }

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

    this.marker = L.marker(this.centroid as L.LatLngExpression, {
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
      return `Lat  ${this.lat} <br /> Lon  ${this.lon}`;
    } else {
      return `<a href="https://google.com">Configure address</a>`;
    }
  }

  ngOnInit(): void {
    this.initMap();
  }

  searchCorporate(textObs: Observable<string>) {
    return textObs.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length > 2),
      tap((_) => (this.isCorporateSearchLoading = true)),
      switchMap((term) => this.searchAdress(term)),
      tap((_) => (this.isCorporateSearchLoading = false))
    );
  }

  searchAdress(search?: string): Observable<string[]> {
    const url = new URL(
      'https://nominatim.openstreetmap.org/search?format=json&limit=10&countrycodes=IN&q=' +
        search
    );
    const data = this.http.get(url.toString()).pipe(
      map((res: any) => {
        if (!res) {
          this.addressDataObservable.next([]);
          return [];
        } else {
          if (res && res.length) {
            console.log(res);
            this.addressDataObservable.next(res);
            return res
              .map((c: any) => c.display_name)
              .filter((c: any) => !!c && !!c.trim());
          }
          return [];
        }
      }),
      catchError((err: any) => {
        console.log(err);
        return [] as string[];
      })
    );
    return data;
  }

  clearSearchCorporate() {
    if (this.searchInp) {
      this.searchInp.nativeElement.value = '';
    }
    this.searchData = [];
  }

  onSelectCorporate(selectedData: any) {
    console.log('selected data:', selectedData);
    const filteredData = this.searchData
      .filter((el) => el.display_name === selectedData.item)
      ?.at(0);
    this.lat = filteredData?.lat;
    this.lon = filteredData?.lon;
    //
    this.map.setView([this.lat, this.lon], 18);
    this.marker.setLatLng([this.lat, this.lon]);
    this.marker
      .bindPopup('Niranjan"s Lat ' + this.lat + '<br />Lon ' + this.lon)
      .openPopup();
  }
}
