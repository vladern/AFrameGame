import { Difficulties } from "./difficulties.model";


describe('Difficulties', () => {
  it('should create an instance', () => {
    expect(new Difficulties(true, true, true, true, true)).toBeTruthy();
  });
  it('should should return 5', () => {
    expect(new Difficulties(true, true, true, true, true).length).toBe(5);
  });
});
