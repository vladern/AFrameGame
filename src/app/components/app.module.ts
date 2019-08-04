import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { SinglePlayerMenuComponent } from './menu/single-player-menu/single-player-menu.component';
import { PartyMenuComponent } from './menu/party-menu/party-menu.component';
import { HowToPlayComponent } from './menu/how-to-play/how-to-play.component';
import { CreditsComponent } from './menu/credits/credits.component';
import { SongService } from '../services/song.service';
import { BeatsaverAPIService } from '../services/beatsaverAPI.service';
import { BeatComponent } from './game/beat/beat.component';
import { ControllerComponent } from './controller/controller.component';

const appRoutes: Routes = [
  { path: '/game', component: GameComponent },
  { path: '/menu',      component: MenuComponent },
  { path: '/singlePlayerMenu',      component: SinglePlayerMenuComponent },
  { path: '/',      component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GameComponent,
    SinglePlayerMenuComponent,
    PartyMenuComponent,
    HowToPlayComponent,
    CreditsComponent,
    BeatComponent,
    ControllerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, HttpClient, SongService, BeatsaverAPIService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [BeatComponent]
})
export class AppModule { }
