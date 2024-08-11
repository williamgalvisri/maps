import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'
import { LS_PLAIN_MARKERS, SOLEDAD_LNGLAT } from '../../../utils/map.util';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: [number, number]
}

@Component({
  templateUrl: './marker-page.component.html',
  styleUrl: './marker-page.component.css'
})
export class MarkerPageComponent {
  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 13
  public map?: Map;
  public lngLat: LngLat = new LngLat(SOLEDAD_LNGLAT.lng, SOLEDAD_LNGLAT.lat)
  public colorMarkers: MarkerAndColor[] = []

  ngAfterViewInit(): void {

    if (!this.divMap) throw new Error('Element map not found!');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    const marker = new Marker().setLngLat(this.lngLat).addTo(this.map)
    this.mapListeners();
    this.readMarkerFromLocalstorage();
  }

  ngOnDestroy(): void {
    this.map!.remove();
  }

  mapListeners() {
    if(!this.map) throw new Error('Map dosent exist');
    this.map.on('zoom', (event) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (event) => {
      if(this.map!.getZoom() < 18) return;

      this.map!.zoomTo(18);
    })

    this.map.on('move', (event) => {
      this.lngLat = this.map!.getCenter();
    })
  }

  zoomIn() {
    this.map?.zoomIn()
  }

  zoomOut() {
    this.map?.zoomOut()
  }

  zoomChanged(value: string) {
    this.map!.zoomTo(parseFloat(value));
  }

  createMarker() {
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map!.getCenter()
    this.addMarker(lngLat, color)
  }

  addMarker(lngLat: LngLat, color: string) {
    if(!this.map) return;

    const marker = new Marker({
      color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo(this.map)

    this.colorMarkers.push({color, marker});
    this.saveMarkerToLocalstorage();

    marker.on('dragend', () => this.saveMarkerToLocalstorage())
  }

  removeMarker(index: number) {
    this.colorMarkers[index].marker.remove();
    this.colorMarkers.splice(index, 1)
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: this.zoom,
      center: marker.getLngLat()
    })
  }

  saveMarkerToLocalstorage() {
    const plainMarker: PlainMarker[] = this.colorMarkers.map(element => ({
      color: element.color,
      lngLat: element.marker.getLngLat().toArray()
    }))

    localStorage.setItem(LS_PLAIN_MARKERS, JSON.stringify(plainMarker))
  }

  readMarkerFromLocalstorage() {
    const markersFromLocalstorage: PlainMarker[] = JSON.parse(localStorage.getItem(LS_PLAIN_MARKERS) ?? '[]')

    for (const marker of markersFromLocalstorage) {
        const [lng, lat] = marker.lngLat
        this.addMarker(new LngLat(lng, lat), marker.color)
    }
  }
}
