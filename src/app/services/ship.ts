import { getRandomCoordinates, getRandomInt } from './coordinate';

export enum ShipStatus {
  CLEAN = 0,
  IMPACTED,
  SUNKEN,
}

export enum ShootStatus {
  NO_IMPACTED = 0,
  IMPACTED,
}

export class Ship {
  isVertical: boolean;
  coordinates: string[];
  isSunken: boolean = false;
  impactedOn: string[] = [];
  first: string;
  last: string;

  constructor(length: 1 | 2 | 3 | 4, prevShips: Ship[] = []) {
    let isVertical = Boolean(getRandomInt(2));

    let coordinates = getRandomCoordinates(length, isVertical);
    while (this.hasRepeatedCoordinates(coordinates, prevShips)) {
      isVertical = Boolean(getRandomInt(2));
      coordinates = getRandomCoordinates(length, isVertical);
    }
    this.first = coordinates[0];
    this.last = coordinates[length - 1];
    this.isVertical = isVertical;
    this.coordinates = coordinates;
  }

  private hasRepeatedCoordinates(coordinates: string[], prevShips: Ship[]) {
    return Boolean(
      coordinates.filter((coordinate) =>
        prevShips.find((ship) => ship.coordinates.includes(coordinate))
      ).length
    );
  }

  impact(coordinate: string): boolean {
    if (this.impactedOn.includes(coordinate)) {
      throw new Error('Already impacted');
    }
    if (this.coordinates.includes(coordinate)) {
      this.impactedOn.push(coordinate);
      this.isSunken = this.impactedOn.length === this.coordinates.length;
      return true;
    }
    return false;
  }
}
