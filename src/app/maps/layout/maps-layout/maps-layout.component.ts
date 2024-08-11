import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { enviroment } from '../../../enviroments/enviroments';

mapboxgl.accessToken = enviroment.mapbox_key;
@Component({
  templateUrl: './maps-layout.component.html',
  styleUrl: './maps-layout.component.css'
})
export class MapsLayoutComponent {

}
