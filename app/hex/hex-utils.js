import {List} from 'immutable';
import {Hex, makeId} from './Hex';
import Chance from 'chance';
import {relief as reliefs, vegetation as vegetations, natural_obstacles as natural_obstacles} from '../data/oltree';
const chance = new Chance();

export const distanceFromCenter = (q, r) => 0.5 * (Math.abs(q) + Math.abs(q + r) + Math.abs(r));

export const getHex = (mapRadius, hexes, q, r) => {
  if (Math.abs(q) > mapRadius || Math.abs(r) > mapRadius || Math.abs(q + r) > mapRadius) return;

  return hexes.find(_ => _.q === q && _.r === r);
};

export const getNorth = (mapRadius, hexes, hex) => getHex(mapRadius, hexes, hex.q, hex.r - 1);
export const getNorthEast = (mapRadius, hexes, hex) => getHex(mapRadius, hexes, hex.q + 1, hex.r - 1);
export const getSouthEast = (mapRadius, hexes, hex) => getHex(mapRadius, hexes, hex.q + 1, hex.r);
export const getSouth = (mapRadius, hexes, hex) => getHex(mapRadius, hexes, hex.q, hex.r + 1);
export const getSouthWest = (mapRadius, hexes, hex) => getHex(mapRadius, hexes, hex.q - 1, hex.r + 1);
export const getNorthWest = (mapRadius, hexes, hex) => getHex(mapRadius, hexes, hex.q - 1, hex.r);

export const getNeighbours = (mapRadius, hexes, q, r) => {
  const hex = getHex(mapRadius, hexes, q, r);
  if (!hex) return new List();

  if (mapRadius === 0) return new List();

  let neighbours = [];

  let n1 = getHex(mapRadius, hexes, hex.q + 1, hex.r - 1); // North East
  if (n1) neighbours.push(n1);
  let n2 = getHex(mapRadius, hexes, hex.q, hex.r - 1); // North
  if (n2) neighbours.push(n2);
  let n3 = getHex(mapRadius, hexes, hex.q - 1, hex.r);// North West
  if (n3) neighbours.push(n3);
  let n4 = getHex(mapRadius, hexes, hex.q - 1, hex.r + 1); // South West
  if (n4) neighbours.push(n4);
  let n5 = getHex(mapRadius, hexes, hex.q, hex.r + 1); // South
  if (n5) neighbours.push(n5);
  let n6 = getHex(mapRadius, hexes, hex.q + 1, hex.r); // South East
  if (n6) neighbours.push(n6);

  return List(neighbours);
};

export const getNHexes = (mapRadius) => 1 + 6 * (mapRadius * (mapRadius + 1)) / 2;

export const initHexes = (mapRadius) => {
  let hexes = [];

  for (let q = -mapRadius; q <= mapRadius; q++) {
    for (let r = -mapRadius; r <= mapRadius; r++) {
      if (Math.abs(q) > mapRadius || Math.abs(r) > mapRadius || Math.abs(q + r) > mapRadius) {
        // out of map
      }
      else {
        const hex = new Hex({q: q, r: r});
        hexes.push(hex);
      }
    }
  }

  return setOuterRimRelief(mapRadius, List(hexes), 0);
};

export const pickRandomHex = (hexes) => hexes.get(Math.random() * hexes.size);

export const updateHex = (mapRadius, hexes, q, r, newHexData) => hexes.update(
  hexes.indexOf(getHex(mapRadius, hexes, q, r)),
  _ => _.merge(newHexData)
);

export const getHexesByProperty = (hexes, k, v) => hexes.filter(_ => _[k] === v);

export const getReliefAreaSize = (mapRadius, hexes, hex) => {
  let area = 0;
  const crawled = [];

  const crawl = (hex) => {
    const id = makeId(hex);
    if (crawled.indexOf(id) != -1) return;
    area++;
    crawled.push(id);
    const neighbours = getNeighbours(mapRadius, hexes, hex.q, hex.r).filter(_ => crawled.indexOf(makeId(_)) === -1);
    for (let n of neighbours) {
      if (!n.relief || n.relief != hex.relief) continue;
      crawl(n);
    }
  };

  crawl(hex);

  return area;
};

export const setOuterRimRelief = (mapRadius, hexes, relief) => {
  const outerRim = hexes.filter(_ => getNeighbours(mapRadius, hexes, _.q, _.r).size != 6);
  outerRim.forEach((hex, key) => hexes = updateHex(mapRadius, hexes, hex.q, hex.r, {charted: true, relief: relief}));
  return hexes;
};

export const determineRelief = (mapRadius, hexes, hex) => {
  // Si l'hexagone est déjà exploré, ne rien faire
  if (hex.charted) return {hexes: hexes};

  // Si l'hexagone est inaccessible, ne rien faire
  const neighbours = getNeighbours(mapRadius, hexes, hex.q, hex.r);
  if (neighbours.filter(_ => _.charted === true).size === 0) return {hexes: hexes};

  const reliefTypes = Object.keys(reliefs).map(_ => parseInt(_, 10));
  const reliefWeights = new Map();

  let vegetation, natural_obstacle;

  // Relief
  reliefTypes.forEach(_ => reliefWeights.set(_, 0.25)); // Si d2 fait 7 ou 8 (25%)
  neighbours.forEach(_ => {
    if (_.charted) reliefWeights.set(_.relief, reliefWeights.get(_.relief) + 1);
  });
  const weights = Array.from(reliefWeights.values());
  const drawnRelief = chance.weighted(reliefTypes, weights);

  // Vegetation
  const vegetationTypes = Object.keys(vegetations);
  if (drawnRelief != 0) vegetation = vegetationTypes[Math.floor(Math.random() * vegetationTypes.length)];

  // Obstacle naturel
  const naturalObstacleTypes = Object.keys(natural_obstacles);
  const ob = chance.d8();
  if (ob === 7 || ob === 8) natural_obstacle = naturalObstacleTypes[Math.floor(Math.random() * naturalObstacleTypes.length)];

  // Mise à jour du modèle
  const newHexes = updateHex(mapRadius, hexes, hex.q, hex.r, {
    charted: true,
    relief: drawnRelief,
    vegetation: vegetation,
    naturalObstacle: natural_obstacle,
    naturalObstaclePosition: natural_obstacle && chance.d6()
  });

  return {
    hexes: newHexes,
    hex: getHex(mapRadius, newHexes, hex.q, hex.r),
    reliefTypesAndWeights: reliefWeights
  }
};

export const getUnchartedReachableHexes = (mapRadius, hexes) => hexes.filter(_ =>
  !_.charted
  && getNeighbours(mapRadius, hexes, _.q, _.r).filter(_ => _.charted).size > 0
);

export const exploreMap = (mapRadius, hexes) => {
  let map = hexes;

  let unexploredHexesNumber = hexes.filter(_ => !_.charted).size;
  while (unexploredHexesNumber > 0) {
    const reachableHexesToExplore = getUnchartedReachableHexes(mapRadius, map);
    const hexToExploreIndex = Math.floor(reachableHexesToExplore.size * Math.random());
    const hexToExplore = reachableHexesToExplore.get(hexToExploreIndex);
    const r = determineRelief(mapRadius, map, hexToExplore);
    map = r.hexes;
    unexploredHexesNumber--;
  }

  return map;
};

export const position = _ => {
  switch (_) {
    case 1:
      return 'nord';
    case 2:
      return 'nord-est';
    case 3:
      return 'sud-est';
    case 4:
      return 'sud';
    case 5:
      return 'sud-ouest';
    case 6:
      return 'nord-ouest';
  }
  throw new Error('A hex position must be 1, 2, 3, 4, 5 or 6.')
};