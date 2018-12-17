// 14-12-2018  Dheymer león (dheymer@gmail.com)
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

/**
 * Navbar component
 *
 * @export
 * @class NavMenuComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html'
})

export class NavMenuComponent implements OnInit {
  @Output() mode = new EventEmitter(); // Sends the current mode flag to the app component
  actualMode = true;                   // Flag that indicates if it's the Full mode or Demo mode

  constructor() { }

  ngOnInit() {
  }

  /**
   * Switch between the Full mode (full functionality) and Demo mode (only play video and clips)
   *
   * @memberof NavMenuComponent
   */
  toggleMode() {

    this.actualMode = !this.actualMode;
    this.mode.emit({mode: this.actualMode});
  }

}
