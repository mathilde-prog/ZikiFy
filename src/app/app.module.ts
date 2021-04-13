import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { LyricsComponent } from './components/lyrics/lyrics.component';
import { InfosComponent } from './components/infos/infos.component';
import { ConcertComponent } from './components/concert/concert.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContactComponent } from './components/contact/contact.component';
import { AProposComponent } from './components/apropos/apropos.component';

@NgModule({
  declarations: [
    AppComponent,
    SpotifyComponent,
    LyricsComponent,
    InfosComponent,
    ConcertComponent,
    AccueilComponent,
    MenuComponent,
    ContactComponent,
    AProposComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
