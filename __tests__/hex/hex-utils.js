import {
  determineRelief,
  distanceFromCenter,
  getHexesByProperty,
  getHex,
  getNeighbours,
  getNHexes,
  getReliefAreaSize,
  initHexes,
  pickRandomHex,
  setOuterRimRelief,
  updateHex
} from '../../src/hex/hex-utils';

test('Get the distance of a hex from map center', () => {
  expect(distanceFromCenter(0, 0)).toBe(0);
  expect(distanceFromCenter(5, 0)).toBe(5);
});

test('Get charted hexes', () => {
  let hexes = initHexes(3);
  expect(getHexesByProperty(hexes, 'charted', true).size).toBe(18);
  hexes = updateHex(3, hexes, 1, 1, {charted: true});
  expect(getHexesByProperty(hexes, 'charted', true).size).toBe(19);
});

test('Get center hex neighbours', () => {
  let r, hexes;

  r = 0;
  hexes = initHexes(r);
  expect(getNeighbours(r, hexes, 0, 0).size).toBe(0);

  r = 1;
  hexes = initHexes(r);
  expect(getNeighbours(r, hexes, 0, 0).size).toBe(6);
});

test('Get the number of hexes of a hexmap according to its radius', () => {
  expect(getNHexes(0)).toBe(1);
  expect(getNHexes(1)).toBe(7);
  expect(getNHexes(2)).toBe(19);
});

test('Init a map', () => {
  expect(initHexes(0).size).toBe(1);
  expect(initHexes(1).size).toBe(7);
});

test('Get border hex neighbours', () => {
  let r, hexes;

  r = 1;
  hexes = initHexes(r);
  expect(getNeighbours(r, hexes, -1, 0).size).toBe(3);
});

test('Update hex data in a hexmap', () => {
  const mapRadius = 1;
  let hexes = initHexes(mapRadius);
  hexes = updateHex(mapRadius, hexes, 0, 0, {relief: 'desert', charted: true});
  expect(getHex(mapRadius, hexes, 0, 0).relief).toBe('desert');
  expect(getHex(mapRadius, hexes, 0, 0).charted).toBe(true);
});

test('Get a hex from a hexmap', () => {
  const r = 1;
  const hexes = initHexes(r);
  const hex = getHex(r, hexes, 1, 0);
  expect(hex.q).toBe(1);
  expect(hex.r).toBe(0);
});

test('Sandbox', () => {
  let hexes = initHexes(0);
  let h = pickRandomHex(hexes);
  expect(h.q).toBe(0);
  expect(h.r).toBe(0);
});

test('Compute same relief area size', () => {
  let mapRadius, hexes;

  mapRadius = 2;
  hexes = initHexes(mapRadius);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      hexes = updateHex(mapRadius, hexes, i, j, {relief: 'grass', charted: true});
    }
  }
  expect(getReliefAreaSize(mapRadius, hexes, getHex(mapRadius, hexes, 0, 0))).toBe(9);

  mapRadius = 3;
  hexes = initHexes(mapRadius);
  for (let i = -mapRadius; i <= mapRadius; i++) {
    hexes = updateHex(mapRadius, hexes, i, 0, {relief: 'grass', charted: true});
  }
  expect(getReliefAreaSize(mapRadius, hexes, getHex(mapRadius, hexes, 0, 0))).toBe(7);
});

test('Ser outer rim relief', () => {
  let mapRadius, hexes;

  mapRadius = 0;
  hexes = initHexes(mapRadius);
  hexes = setOuterRimRelief(mapRadius, hexes, 'grass');
  expect(getHexesByProperty(hexes, 'relief', 'grass').size).toBe(1);
  expect(getHexesByProperty(hexes, 'charted', true).size).toBe(1);

  mapRadius = 1;
  hexes = initHexes(mapRadius);
  hexes = setOuterRimRelief(mapRadius, hexes, 'grass');
  expect(getHexesByProperty(hexes, 'relief', 'grass').size).toBe(6);
  expect(getHexesByProperty(hexes, 'charted', true).size).toBe(6);

  mapRadius = 2;
  hexes = initHexes(mapRadius);
  hexes = setOuterRimRelief(mapRadius, hexes, 'grass');
  expect(getHexesByProperty(hexes, 'relief', 'grass').size).toBe(12);
  expect(getHexesByProperty(hexes, 'charted', true).size).toBe(12);
});