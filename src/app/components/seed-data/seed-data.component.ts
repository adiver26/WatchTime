import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-seed-data',
  templateUrl: './seed-data.component.html',
  styleUrls: ['./seed-data.component.css']
})
export class SeedDataComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    document.getElementById("body").style.backgroundColor = "white";
  }

  ngOnDestroy() {
    document.getElementById("body").style.backgroundColor = "black";
  }
}
