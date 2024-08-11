import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'
import { SOLEDAD_LNGLAT } from '../../../utils/map.util';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10
  public map?: Map;
  public lngLat: LngLat = new LngLat(SOLEDAD_LNGLAT.lng, SOLEDAD_LNGLAT.lat)

  ngAfterViewInit(): void {

    if (!this.divMap) throw new Error('Element map not found!');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
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
      console.log(this.lngLat);
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
}
