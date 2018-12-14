import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {
  @Input('fullView') fullView: boolean;

  constructor() { }

  ngOnInit() {
  }

}
