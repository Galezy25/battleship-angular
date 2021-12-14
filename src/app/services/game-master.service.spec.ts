import { TestBed } from '@angular/core/testing';
import { getCoordinateName, getRandomCoordinates } from './coordinate';

import { CoordinateStatus, GameMasterService } from './game-master.service';

describe('GameMasterService', () => {
  let service: GameMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#newGame should start a new game status', () => {
    service.newGame('easy');
    expect(service.loseOrWin).toBeNull();
    expect(service.ships_missing).toBe(10);
    expect(service.score).toBe(0);
    expect(service.turn).toBe(1);
    expect(service.mode).toBe('easy');

    service.newGame('medium');
    expect(service.mode).toBe('medium');

    service.newGame('hard');
    expect(service.mode).toBe('hard');

    service.newGame('25');
    expect(service.mode).toBe('25');
  });

  it('#shoot should change game status', () => {
    service.newGame('easy');
    let shoots = getRandomCoordinates(4, true);
    shoots.forEach((shoot) => {
      service.shoot(shoot);
    });
    let coordinates = service.coordinates;
    let [charRow, numberColumn] = shoots[0].split('');
    let x = +numberColumn - 1;
    let y = charRow.charCodeAt(0) - 'A'.charCodeAt(0);
    expect(service.turn).toBe(5);
    expect(coordinates[y][x].status).not.toBe(CoordinateStatus.INITIAL);
    expect(service.shoot(shoots[0])).toBeFalse();
  });

  it('Should lose if no sunken all ships before turns run out', () => {
    service.newGame('19');
    for (let x = 0, y = 0; +`${x}${y}` < 19; y === 9 ? (x++, (y = 0)) : y++) {
      service.shoot(getCoordinateName(x, y));
    }
    expect(service.loseOrWin).toBe('lose');
  });

  it('Should win if sunken all ships before turns run out', () => {
    service.newGame('100');
    for (let x = 0, y = 0; +`${x}${y}` <= 99; y === 9 ? (x++, (y = 0)) : y++) {
      service.shoot(getCoordinateName(x, y));
    }
    expect(service.loseOrWin).toBe('win');
  });
});
