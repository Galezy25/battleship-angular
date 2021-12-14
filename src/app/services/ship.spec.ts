import { Ship } from './ship';

describe('Ship', () => {
  it('should create an instance', () => {
    let ship = new Ship(3);
    expect(ship).toBeTruthy();
    expect(ship.coordinates.length).toBe(3);
    expect(ship.impactedOn.length).toBe(0);
    expect(ship.isSunken).toBeFalse();
    expect(ship.first).toBe(ship.coordinates[0]);
    expect(ship.last).toBe(ship.coordinates[2]);
  });
  it('should not repeat coordinates of prev ships', () => {
    let ships: Ship[] = [];
    for (let index = 0; index < 10; index++) {
      ships.push(new Ship(4, ships));
    }
    ships[0].coordinates.forEach((coordinate) => {
      ships.forEach((ship, index) => {
        if (index !== 0) {
          expect(ship.coordinates).not.toContain(coordinate);
        }
      });
    });
  });

  it('Should set impacted shoots', () => {
    let ship = new Ship(4);
    let otherShip = new Ship(4, [ship]);
    let shootIn = ship.first;
    let hasImpacted = ship.impact(shootIn);
    let hasNotImpacted = ship.impact(otherShip.first);
    expect(hasImpacted).toBeTrue();
    expect(hasNotImpacted).toBeFalse();
    expect(ship.impactedOn[0]).toBe(shootIn);
    expect(() => ship.impact(shootIn)).toThrowError(Error, 'Already impacted');
  });
});
