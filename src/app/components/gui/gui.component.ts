import { Component, OnDestroy, OnInit } from '@angular/core';
import { faBars, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { GameMasterService } from 'src/app/services/game-master.service';

@Component({
  selector: 'app-game-gui',
  template: `
    <div [ngClass]="'gui-container'">
      <ng-container *ngIf="loseOrWin === null">
        <div>
          <h2><b>Turn: </b>{{ turn }}</h2>
        </div>
        <div>
          <h2><b>Ships missing: </b>{{ ships_missing }}</h2>
        </div>
      </ng-container>
      <ng-container *ngIf="loseOrWin === 'lose'">
        <div>
          <h2>You lose</h2>
        </div>
      </ng-container>
      <ng-container *ngIf="loseOrWin === 'win'">
        <div>
          <h2>You win</h2>
        </div>
      </ng-container>
      <div>
        <h2><b>Score: </b>{{ score }}</h2>
      </div>
      <div>
        <button (click)="handleRestart()" title="Restart">
          <fa-icon size="2x" [icon]="faRedo"></fa-icon>
          <h2 *ngIf="loseOrWin === 'lose'">Try again</h2>
          <h2 *ngIf="loseOrWin === 'win'">Play again</h2>
        </button>
        <a title="Main menu" routerLink="/menu">
          <button>
            <fa-icon size="2x" [icon]="faBars"></fa-icon>
            <h2 *ngIf="loseOrWin !== null">Menu</h2>
          </button>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./gui.component.css'],
})
export class GuiComponent implements OnInit, OnDestroy {
  private gameMasterSubscription?: Subscription;

  loseOrWin: null | 'win' | 'lose' = null;
  turn: number;
  score: number;
  ships_missing: number;

  faRedo = faRedo;
  faBars = faBars;

  constructor(private game: GameMasterService) {
    this.turn = this.game.turn;
    this.ships_missing = this.game.ships_missing;
    this.score = this.game.score;
  }

  ngOnInit(): void {
    this.refreshData();
    this.gameMasterSubscription = this.game.coordinates$.subscribe(() => {
      this.refreshData();
    });
  }

  ngOnDestroy(): void {
    if (this.gameMasterSubscription) this.gameMasterSubscription.unsubscribe();
  }

  private refreshData(){
    this.turn = this.game.turn;
    this.ships_missing = this.game.ships_missing;
    this.loseOrWin = this.game.loseOrWin;
    this.score = this.game.score;
  }

  handleRestart() {
    this.game.newGame(this.game.mode);
  }
}
