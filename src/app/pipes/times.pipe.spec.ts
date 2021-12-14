import { TimesPipe } from './times.pipe';

describe('TimesPipe', () => {
  it('create an instance', () => {
    const pipe = new TimesPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return an array with lenght equal to value', () => {
    const pipe = new TimesPipe();
    let value = 10;
    let arr = pipe.transform(value);
    expect(arr.length).toBe(value);
  });

  it('Should return an array of A', () => {
    const pipe = new TimesPipe();
    let value = 10;
    let arr = pipe.transform(value, ()=>'A');
    expect(arr[0]).toBe('A');
  });
});
