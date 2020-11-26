import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class='loaderS'>
      <div class='span'>
        <div class='typing_loader'></div>
      </div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}