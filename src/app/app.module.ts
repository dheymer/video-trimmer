import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterComponent } from './footer/footer.component';
import { PlaylistComponent } from './main-content/playlist/playlist.component';
import { ClipManagerComponent } from './main-content/clip-manager/clip-manager.component';
import { VideoRepositoryService } from './video-repository.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MainContentComponent,
    FooterComponent,
    PlaylistComponent,
    ClipManagerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [VideoRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
