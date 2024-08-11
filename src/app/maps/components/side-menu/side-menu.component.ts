import { Component } from '@angular/core';
interface MenuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'FullScreen'},
    { route: '/maps/zoom-range', name: 'Zoom-range'},
    { route: '/maps/marker', name: 'Marker'}
  ]
}
