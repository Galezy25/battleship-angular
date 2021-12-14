import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { GameMasterService } from 'src/app/services/game-master.service';

@Component({
  selector: 'app-game',
  template: `
    <app-game-gui
      [ngStyle]="{
        position: 'sticky',
        top: 0,
        display: 'block'
      }"
    ></app-game-gui>
    <app-game-board></app-game-board>
  `,
})
export class GameComponent implements OnInit, OnDestroy {
  private gameMasterSubscription?: Subscription;
  private routeSubscription?: Subscription;

  loseOrWin: null | 'win' | 'lose' = null;

  constructor(private game: GameMasterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['mode'])
      this.game.newGame(this.route.snapshot.params['mode']);
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      let mode = params.get('mode');
      if (mode) this.game.newGame(mode);
    });
    this.gameMasterSubscription = this.game.coordinates$.subscribe(() => {
      this.loseOrWin = this.game.loseOrWin;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.gameMasterSubscription) this.gameMasterSubscription.unsubscribe();
  }
}
