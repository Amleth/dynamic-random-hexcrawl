import {Hex, makeId} from '../../app/hex/Hex';

test('Build a new Hex', () => {
  const h = new Hex({q: 19, r: 82, relief: 'grass', charted: true});
  expect(h.q).toBe(19);
  expect(h.r).toBe(82);
  expect(h.charted).toBe(true);
  expect(h.relief).toBe('grass');
});

test('Make a string id', () => {
  expect(makeId(new Hex({q: 19, r: 82}))).toBe('19,82');
});