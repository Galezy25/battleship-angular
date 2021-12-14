export const getCharRow = (y: number) => String.fromCharCode(65 + y);

export const getRandomInt = (max = 10) => Math.floor(Math.random() * max);

export const getCoordinateName = (x: number, y: number): string =>
  getCharRow(y) + (x + 1);

export const getRandomCoordinates = (length: number, isVertical: boolean) => {
  let start_x = getRandomInt(isVertical ? 10 : 10 - length);
  let start_y = getRandomInt(isVertical ? 10 - length : 10);
  let coordinates: string[] = [];
  for (let x = start_x, y = start_y, cont = 0; cont < length; cont++) {
    coordinates.push(getCoordinateName(x, y));
    if (isVertical) {
      y++;
    } else {
      x++;
    }
  }
  return coordinates;
};
