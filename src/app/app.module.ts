import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { GameComponent } from './pages/game/game.component';
import { BoardComponent } from './components/board/board.component';
import { TimesPipe } from './pipes/times.pipe';
import { GuiComponent } from './components/gui/gui.component';
import { ScoresComponent } from './pages/scores/scores.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GameComponent,
    BoardComponent,
    TimesPipe,
    GuiComponent,
    ScoresComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
