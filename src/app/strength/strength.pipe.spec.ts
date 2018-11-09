import { StrengthPipe } from './strength.pipe';

// this is an Isolated unit test for a pipe class

describe('StrengtPipe', () => {
  it('should display weak if strength is 5', () => {
    // arrange
    const pipe = new StrengthPipe();

    // act
    const val = pipe.transform(5);

    // assert
    expect(val).toEqual('5 (weak)');
  });

  it('should display to strong if strength s 10', () => {
    // arrange
    const pipe = new StrengthPipe();

    // act
    const val = pipe.transform(10);

    // assert
    expect(val).toEqual('10 (strong)');
  });
});
