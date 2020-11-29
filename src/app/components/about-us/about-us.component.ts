import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, OnDestroy {

  background_image: any;
  constructor() { }

  ngOnInit() {
    document.getElementById("body").style.backgroundColor = '#e9ecef';
  }

  ngOnDestroy() {
    document.getElementById("body").style.backgroundColor = "#1A1717";
  }

}
