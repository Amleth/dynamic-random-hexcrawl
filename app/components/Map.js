import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {natural_obstacles, relief, vegetation} from '../data/oltree';
import {makeId} from '../hex/Hex';
import {position} from '../hex/hex-utils';
import functional from 'react-functional';

export const HEX_WIDTH = 80;
export const HEX_HEIGHT = Math.sqrt(3) * 0.5 * HEX_WIDTH;

let MAX_X = 0;
let MAX_Y = 0;

/**
 * Convert hex colum & row in axial coordinates to SVG x & y
 * http://www.redblobgames.com/grids/hexagons/#coordinates
 *
 * @param mapRadius
 * @param hex
 * @returns {{x: number, y: number}}
 */
const qr2xy = (mapRadius, hex) => {
  let x = HEX_WIDTH / 2 * 3 / 2 * hex.q;
  let y = HEX_WIDTH / 2 * Math.sqrt(3) * (hex.r + hex.q / 2);

  x += mapRadius * 3 * HEX_WIDTH / 4 + HEX_WIDTH / 2;
  y += (mapRadius + 0.5) * HEX_HEIGHT;

  if (x > MAX_X) MAX_X = x;
  if (y > MAX_Y) MAX_Y = y;

  return {x: x, y: y};
};

const drawFlatToppedHex = (mapRadius, hex, center, exploreHex, inspectHex) => {
  const getColour = () => {
    let colour = 'Gray';
    if (hex.charted && hex.relief != undefined && hex.relief != null)
      colour = relief[hex.relief].colour;
    return colour;
  };

  if (!hex) return;

  let points = [];
  for (let i = 0; i <= 6; i++) {
    let angle_deg = 60 * i;
    let angle_rad = Math.PI / 180 * angle_deg;
    points.push(center.x + 0.5 * HEX_WIDTH * Math.cos(angle_rad));
    points.push(center.y + 0.5 * HEX_WIDTH * Math.sin(angle_rad));
  }

  return <polygon
    key={'hex.' + makeId(hex)}
    points={_.chunk(points, 2).map(it => it.join(',')).join(' ')}
    onClick={() => {
      if (!hex.charted) exploreHex(hex);
      else inspectHex(hex);
    }}
    className={hex.charted ? 'charted' : 'uncharted'}
    fill={getColour()}
  />;
};

const drawText = (hex, center, className, text) => {
  return <text key={`svg.text.${className}.${makeId(hex)}`}
               className={className}
               x={center.x}
               y={center.y}
  >{text}</text>;
};

const drawNaturalObstacle = (hex, center) => {
  const DIST_FROM_CENTER = 0.5 * HEX_HEIGHT - 13;
  const DELTA_X = Math.cos(Math.PI / 6) * DIST_FROM_CENTER;
  const DELTA_Y = Math.sin(Math.PI / 6) * DIST_FROM_CENTER;
  let delta;
  switch (hex.naturalObstaclePosition) {
    case 1:
      delta = {x: 0, y: -DIST_FROM_CENTER};
      break;
    case 2:
      delta = {x: DELTA_X, y: -DELTA_Y};
      break;
    case 3:
      delta = {x: DELTA_X, y: DELTA_Y};
      break;
    case 4:
      delta = {x: 0, y: DIST_FROM_CENTER};
      break;
    case 5:
      delta = {x: -DELTA_X, y: DELTA_Y};
      break;
    case 6:
      delta = {x: -DELTA_X, y: -DELTA_Y};
      break;
  }

  //return <line x1={center.x} y1={center.y} x2={center.x + delta.x} y2={center.y + delta.y}></line>;

  return <text key={`svg.text.on.${makeId(hex)}`}
               className='natural-obstacle'
               x={center.x + delta.x} y={center.y + delta.y}
  >
    {natural_obstacles[hex.naturalObstacle].symbol}
  </text>;
};

const Map = ({mapRadius, hexes, inspectedHex, newlyExploredHex, reliefTypesAndWeights, exploreHex, exploreMap, inspectHex, resetMap}) => {
  const svg_hexagons = [];
  const svg_vegetations = [];
  const svg_natural_obstacles = [];

  hexes.forEach(hex => {
    const center = qr2xy(mapRadius, hex);
    svg_hexagons.push(drawFlatToppedHex(mapRadius, hex, center, exploreHex, inspectHex));
    if (hex.vegetation != undefined) svg_vegetations.push(drawText(hex, center, 'vegetation', `🌿${vegetation[hex.vegetation].abbr}`));
    if (hex.naturalObstacle) svg_natural_obstacles.push(drawNaturalObstacle(hex, center));
  });

  //
  // Proba relief
  //

  let probaReliefTable;
  const probaReliefRows = [];
  if (reliefTypesAndWeights) {
    for (let [k, v] of reliefTypesAndWeights) {
      probaReliefRows.push(<tr key={'tw' + k}>
        <td key={'w' + k}
            style={{fontWeight: newlyExploredHex.relief === k ? 'bold' : 'normal'}}
        >
          {Math.round(100 * v / Array.from(reliefTypesAndWeights.values()).reduce((a, b) => a + b))}%
        </td>
        <td key={'n' + k}
            style={{backgroundColor: relief[k].colour, fontWeight: newlyExploredHex.relief === k ? 'bold' : 'normal'}}
        >
          {relief[k].name}
        </td>
      </tr>)
    }
  }
  if (probaReliefRows.length > 0) {
    probaReliefTable = <table className='probaRelief'>
      <thead>
      <tr>
        <th colSpan='2'>Tirage relief ⬣ ({newlyExploredHex.q}, {newlyExploredHex.r})</th>
      </tr>
      </thead>
      <tbody>
      {probaReliefRows}
      </tbody>
    </table>
  }

  //
  // Inspector
  //

  let inspector;
  if (inspectedHex) {
    inspector = <table className='inspector'>
      <thead>
      <tr>
        <th colSpan='2'>
          Hexagone ⬣ <span>({inspectedHex.q}, {inspectedHex.r})</span></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          Relief
        </td>
        <td style={{backgroundColor: relief[inspectedHex.relief].colour}}>
          {relief[inspectedHex.relief].name}
        </td>
      </tr>
      <tr>
        <td>
          Végétation 🌿
        </td>
        <td>
          {inspectedHex.vegetation ? vegetation[inspectedHex.vegetation].name : '—'}
        </td>
      </tr>
      <tr>
        <td>
          Obstacle naturel
        </td>
        <td>
          {
            inspectedHex.naturalObstacle != undefined
              ? natural_obstacles[inspectedHex.naturalObstacle].name + ' (' + position(inspectedHex.naturalObstaclePosition) + ')'
              : '—'
          }
          {
            inspectedHex.naturalObstacle != undefined
            && <span className='natural-obstacle'> {natural_obstacles[inspectedHex.naturalObstacle].symbol}</span>
          }
        </td>
      </tr>

      </tbody>
    </table>;
  }

  return <section className='map'>
    <nav>
      <p>Pour explorer l'archipel, cliquez sur les hexagones accessibles (les hexagones gris contigus aux hexagones explorés).</p>
      <span className="actionLink" onClick={exploreMap}>⬣ Exploration automatique</span>
      <span className="actionLink" onClick={resetMap}>⬣ Reset</span>
      <Link to='p'>☸ Paramètres & légende</Link>
    </nav>
    <section className='col'>
      <img src='Oltréé !.jpg'></img>
      {inspector}
      {probaReliefTable}
    </section>
    <svg width={MAX_X + HEX_WIDTH / 2}
         height={MAX_Y + HEX_HEIGHT / 2}
         xmlns="http://www.w3.org/2000/svg"
    >{svg_hexagons.concat(svg_natural_obstacles).concat(svg_vegetations)}</svg>
    <div className='clear'></div>
  </section>
};

Map.propTypes = {
  mapRadius: PropTypes.number.isRequired,
  exploreHex: PropTypes.func.isRequired,
  inspectHex: PropTypes.func.isRequired
};

export default functional(Map);