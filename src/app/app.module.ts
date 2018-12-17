// 13-12-2018  Dheymer león (dheymer@gmail.com)
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterComponent } from './footer/footer.component';
import { VideoRepositoryService } from './video-repository.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MainContentComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [VideoRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
