import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { getCoordinateName } from './coordinate';
import { LocalDBService } from './local-db.service';
import { Ship } from './ship';

export enum CoordinateStatus {
  FAIL = -1,
  INITIAL = 0,
  IMPACTED,
  SUNKEN,
  SUNKEN_TOP,
  SUNKEN_BOTTOM,
  SUNKEN_LEFT,
  SUNKEN_RIGHT,
  SUNKEN_X,
  SUNKEN_Y,
}

export const difficultMode = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export interface Coordinate {
  name: string;
  status: CoordinateStatus;
}

@Injectable({
  providedIn: 'root',
})
export class GameMasterService {
  private _turns: number = 0;
  private _ships: Ship[] = [];
  private _status: {
    [coordinate: string]: CoordinateStatus;
  } = {};
  private _shoots: string[] = [];
  private _ships_missing = 10;
  private _score = 0;
  private _mode: string = 'easy';
  private _coordinates$ = new Subject<Coordinate[][]>();

  constructor(private db: LocalDBService) {}

  private _emitChange() {
    this._coordinates$.next(this.coordinates);
    return true;
  }

  private hangleChangeStatusSunken = (ship: Ship) => (coordinate: string) => {
    switch (coordinate) {
      case ship.first:
        this._status[coordinate] = ship.isVertical
          ? CoordinateStatus.SUNKEN_TOP
          : CoordinateStatus.SUNKEN_LEFT;
        break;
      case ship.last:
        this._status[coordinate] = ship.isVertical
          ? CoordinateStatus.SUNKEN_BOTTOM
          : CoordinateStatus.SUNKEN_RIGHT;
        break;
      default:
        this._status[coordinate] = ship.isVertical
          ? CoordinateStatus.SUNKEN_Y
          : CoordinateStatus.SUNKEN_X;
        break;
    }
  };

  get mode() {
    return this._mode;
  }
  get score() {
    return this._score;
  }
  get turn() {
    return this._shoots.length + 1;
  }
  get coordinates() {
    let coordinates: Coordinate[][] = [];

    for (let y = 0; y < 10; y++) {
      coordinates.push([]);
      for (let x = 0; x < 10; x++) {
        let name = getCoordinateName(x, y);
        coordinates[y].push({
          name,
          status: this._status[name] || CoordinateStatus.INITIAL,
        });
      }
    }
    return coordinates;
  }
  get loseOrWin() {
    if (this._ships_missing === 0) {
      return 'win';
    }

    if (this._shoots.length === this._turns) {
      return 'lose';
    }

    return null;
  }
  get ships_missing() {
    return this._ships_missing;
  }
  get coordinates$() {
    return this._coordinates$.asObservable();
  }

  shoot(coordinate: string) {
    if (this._shoots.includes(coordinate)) {
      return false;
    }

    this._shoots.push(coordinate);
    let shipImpacted = this._ships.find((ship) => ship.impact(coordinate));

    if (!shipImpacted) {
      this._status[coordinate] = CoordinateStatus.FAIL;
      return this._emitChange();
    }
    this._score += 200 - this._shoots.length - this._turns;

    if (shipImpacted.isSunken) {
      this._ships_missing--;
      if (shipImpacted.coordinates.length === 1) {
        this._status[coordinate] = CoordinateStatus.SUNKEN;
      } else {
        shipImpacted.coordinates.forEach(
          this.hangleChangeStatusSunken(shipImpacted)
        );
      }
      if (this._ships_missing === 0) {
        this.db.scores.add({
          score: this._score,
          date: new Date(),
        });
      }
    } else {
      this._status[coordinate] = CoordinateStatus.IMPACTED;
    }

    return this._emitChange();
  }

  newGame(mode: string) {
    let ships = [];
    this._mode = mode;
    switch (mode) {
      case difficultMode.EASY:
        this._turns = 100;
        break;
      case difficultMode.MEDIUM:
        this._turns = 75;
        break;
      case difficultMode.HARD:
        this._turns = 50;
        break;
      default:
        this._turns = +mode;
        break;
    }
    ships.push(new Ship(4));

    ships.push(new Ship(3, ships));
    ships.push(new Ship(3, ships));

    ships.push(new Ship(2, ships));
    ships.push(new Ship(2, ships));
    ships.push(new Ship(2, ships));

    ships.push(new Ship(1, ships));
    ships.push(new Ship(1, ships));
    ships.push(new Ship(1, ships));
    ships.push(new Ship(1, ships));

    this._ships = ships;
    this._shoots = [];
    this._status = {};
    this._score = 0;
    this._ships_missing = ships.length;
    this._emitChange();
  }
}
