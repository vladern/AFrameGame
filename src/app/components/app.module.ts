import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { SinglePlayerMenuComponent } from './menu/single-player-menu/single-player-menu.component';

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
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }