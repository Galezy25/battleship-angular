import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './pages/game/game.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ScoresComponent } from './pages/scores/scores.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'game/:mode',
    component: GameComponent,
  },
  {
    path: 'scores',
    component: ScoresComponent,
  },
  {
    path: '**',
    redirectTo: 'menu',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
