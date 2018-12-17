// 13-12-2018  Dheymer león (dheymer@gmail.com)
import { Component } from '@angular/core';
/**
 * The app component
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  fullView = true;  // Flag that indicates if it's the Full mode (full functionality) or Demo mode (only play, no add, edit or delete)
  title = 'app';

  /**
   * Obtain the mode flag from the navbar
   *
   * @param {*} event The object from the emitter
   * @memberof AppComponent
   */
  toggleMode(event) {
    this.fullView = event.mode;
  }
}
