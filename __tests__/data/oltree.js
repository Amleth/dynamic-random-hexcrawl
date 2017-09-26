import {stringify} from '../../src/data/oltree';

test('stringify', () => {
  expect(stringify(1)).toBe(1);
  expect(stringify([1, 2])).toBe('1, 2');
  expect(stringify(new Set([1, 2]))).toBe('1, 2');
  expect(stringify(new Set([1, [2, 3]]))).toBe('1, 2, 3');
  expect(stringify(new Set([1, new Set([2, 3])]))).toBe('1, 2, 3');
  expect(stringify(new Map([[1, 2]]))).toBe('1 (2)');
  expect(stringify(new Map([[1, [2, 3]]]))).toBe('1 (2, 3)');
  expect(stringify(new Map([[1, new Set([2, 3])]]))).toBe('1 (2, 3)');
  expect(stringify(new Map([[1, new Map([[2, 3]])]]))).toBe('1 (2 (3))');
});

// test('Playground', () => {
//   const a = draw(types_domaine_agricole);
//   console.log(a);
//   const map_key = a.entries().next();
//   console.log(map_key);
//   console.log(`${map_key} (${a.get(map_key)})`);
// });