import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  faBahai,
  faShip,
  faWater,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { getCharRow, getCoordinateName } from 'src/app/services/coordinate';
import {
  Coordinate,
  CoordinateStatus,
  GameMasterService,
} from 'src/app/services/game-master.service';

@Component({
  selector: 'app-game-board',
  template: `
    <div
      [ngStyle]="{
        overflow: 'auto',
        'max-width': '100%'
      }"
    >
      <div [ngClass]="'board'">
        <div [ngClass]="'header'"></div>
        <ng-container *ngFor="let head of 10 | times">
          <div [ngClass]="'header'">
            <p>
              <b>{{ head + 1 }}</b>
            </p>
          </div>
        </ng-container>
        <ng-container *ngFor="let y of 10 | times">
          <div [ngClass]="'header'">
            <p>
              <b>{{ getCharRow(y) }}</b>
            </p>
          </div>
          <div
            *ngFor="
              let coordinate of coordinates[y];
              trackBy: trackByCoordinate;
              let x = index
            "
            [ngStyle]="{
              display: 'flex'
            }"
          >
            <button
              [id]="coordinate.name"
              [ngClass]="['coordinate', 'status-' + coordinate.status]"
              (click)="handleClickCoordinate(coordinate.name)"
              [disabled]="Boolean(coordinate.status) || Boolean(loseOrWin)"
            >
              <fa-icon size="2x" [icon]="getIcon(coordinate.status)"></fa-icon>
            </button>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private gameMasterSubscription?: Subscription;

  coordinates: Coordinate[][];
  loseOrWin: null | 'win' | 'lose' = null;

  getCharRow = getCharRow;
  getCoordinateName = getCoordinateName;
  Boolean = Boolean;

  constructor(private game: GameMasterService) {
    this.coordinates = game.coordinates;
  }

  ngOnInit(): void {
    this.refreshData();
    this.gameMasterSubscription = this.game.coordinates$.subscribe((status) => {
      this.refreshData();
    });
  }

  ngOnDestroy(): void {
    if (this.gameMasterSubscription) this.gameMasterSubscription.unsubscribe();
  }

  private refreshData() {
    this.coordinates = this.game.coordinates;
    this.loseOrWin = this.game.loseOrWin;
  }

  handleClickCoordinate(coordinate: string): void {
    this.game.shoot(coordinate);
  }

  getIcon(status: CoordinateStatus): IconDefinition {
    let iconResponse;
    switch (status) {
      case CoordinateStatus.FAIL:
      case CoordinateStatus.IMPACTED:
        iconResponse = faBahai;
        break;
      case CoordinateStatus.INITIAL:
        iconResponse = faWater;
        break;
      default:
        iconResponse = faShip;
        break;
    }
    return iconResponse;
  }

  trackByCoordinate = (
    _index: number,
    item: {
      name: string;
      status: CoordinateStatus;
    }
  ): string => {
    return item.name;
  };
}
