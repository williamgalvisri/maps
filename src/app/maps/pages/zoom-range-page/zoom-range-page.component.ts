import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl'
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10
  public map?: Map;

  ngAfterViewInit(): void {

    if (!this.divMap) throw new Error('Element map not found!');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
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
