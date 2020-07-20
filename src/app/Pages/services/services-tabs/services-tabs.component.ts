import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-tabs',
  templateUrl: './services-tabs.component.html',
  styleUrls: ['./services-tabs.component.css']
})
export class ServicesTabsComponent implements OnInit {
  baseroute = '/services';
  constructor() { }

  ngOnInit(): void {
  }

}
