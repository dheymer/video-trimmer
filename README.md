# VideoTrimmer

Video Trimmer is a web app made in Angular 6+ that allows a user to slice-up a video into clips.This app has been tested in Chrome, Firefox and Edge.

Demo page: [https://dheymer.000webhostapp.com/demos/VideoTrimmer/] 

### Task
Create an application that allows a user to slice up a [video sample] (http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4) into clips. As part of this application, use at least one of the following frameworks to facilitate development however you may also use any other tools to help complete the project:

- [ ] AngularJS
- [x] Angular 2 **\[ Used Angular CLI version 6.0.8 \]**
- [ ] Ember
- [ ] ReactJS
- [ ] AureliaJS

### Mandatory Features
- [x] An HTML5 video player that utilizes media fragments.
- [x] A list of clips to be played in the video player.
- [x] The first item in the list should be the full video.
- [x] An interface to add new clips to the list by specifying a name, start time, and end time. **\[ Added at the bottom of the screen, before footer section \]**
- [x] The ability to delete clips from the list (*excluding the full video item*). **\[ Added Delete button (with red background) \]**
- [x] The ability to edit existing clips in the list. **\[ Added Edit button in each clip (with dark background) \]**
- [x] The ability to play clips in the video player. **\[ Added Play button (with play triangle icon and green background) \]**

**\[ All mandatory features completed. \]**

### Bonus (Optional)
- [x] The ability to automatically jump to the next clip after it finishes, with a 3 second waiting period and appropriate loading animation. **\[ Added *Play All* button (with film icon). It plays all clips in the list from top to bottom with 3s delay. \]**
- [x] The ability to save clips for persistent use. **\[ Added Save button (disquette icon and green background) when editing clips \]**
- [x] The ability to add arbitrary 'tags' to clips so that they can be filtered by the tag name. **\[ Added tag attribute to each clip (it's possible to edit them in the edit mode), and a search input to filter clips by those tags \]**
- [x] Hotkeys to jump between the current clip and next and previous clips (if there are any). **\[ Added left and right arrow keys to navigate along the clip list and the complete video \]**
- [x] Markers on the video player timeline that denote where a clip starts (full video only). **\[ Added a green timeline bar right under video player, with dark round markers \]**
- [x] Clicking the marker chooses that clip and plays it from that point. **\[ Added play clip functionality on the click event of the markers \]**
- [x] The ability to reuse the the player and playlist on another page without the editing capabilities. **\[ Added Full mode (all features) and Demo mode (play clips only). Upper right corner links. \]**

## Dev environment setup
Once downloaded the code, open a console window, navigate to the folder of your project, and execute the following command:

`npm install`

This will install all the NodeJS dependencies. Once it's done, in the same console window, execute the following command:

`npm start`

This will run a dev server to test it locally.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
