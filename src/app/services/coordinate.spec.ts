import {
  getCharRow,
  getCoordinateName,
  getRandomCoordinates,
  getRandomInt,
} from 'src/app/services/coordinate';

describe('Coordinate', () => {
  it('#getRandomInt should set values between 0 and 10 by default', () => {
    let randomInt = getRandomInt();
    expect(randomInt).toBeGreaterThanOrEqual(0);
    expect(randomInt).toBeLessThan(10);
  });

  it('#getCharRow should row 0 be A and row 9 be J', () => {
    let charRow0 = getCharRow(0);
    let charRow9 = getCharRow(9);

    expect(charRow0).toBe('A');
    expect(charRow9).toBe('J');
  });

  it('#getCoordinateName should coordinate [0,0] be A1 and [4,6] be G5', () => {
    let name_0_0 = getCoordinateName(0, 0);
    let name_4_6 = getCoordinateName(4, 6);

    expect(name_0_0).toBe('A1');
    expect(name_4_6).toBe('G5');
  });

  it('#getRandomCoordinates should generate a random coordinates', () => {
    let vertical = getRandomCoordinates(4, true);
    let horizontal = getRandomCoordinates(4, false);

    let [charRow, initColumn] = horizontal[0].split('');

    horizontal.forEach((coordinate, index) => {
      expect(coordinate.charAt(0)).toBe(charRow);
      expect(+coordinate.charAt(1)).toBe(+initColumn + index);
    });

    let [initRow, numberColumn] = vertical[0].split('');

    vertical.forEach((coordinate, index) => {
      expect(coordinate.charAt(1)).toBe(numberColumn);
      expect(coordinate.charCodeAt(0)).toBe(initRow.charCodeAt(0) + index);
    });
  });
});
