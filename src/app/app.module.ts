import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterComponent } from './footer/footer.component';
import { VideoPlayerComponent } from './main-content/video-player/video-player.component';
import { PlaylistComponent } from './main-content/playlist/playlist.component';
import { ClipManagerComponent } from './main-content/clip-manager/clip-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MainContentComponent,
    FooterComponent,
    VideoPlayerComponent,
    PlaylistComponent,
    ClipManagerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
