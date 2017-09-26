import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import functional from 'react-functional';
import {Link} from 'react-router-dom';
import {natural_obstacles, relief, stringify, vegetation} from '../data/oltree';
import {makeId} from '../hex/Hex';
import {position} from '../hex/hex-utils';

export const HEX_WIDTH = 100;
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

const COLOUR_UNCHARTED = 'Gray';

const drawFlatToppedHex = (mapRadius, hex, center, exploreHex, inspectHex, requestReliefStats) => {
  const getColour = () => {
    let colour = COLOUR_UNCHARTED;
    if (hex.charted && hex.relief !== undefined && hex.relief !== null)
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

  return <g key={`hex.${makeId(hex)}_g`}>
    <polygon
      key={'hex.' + makeId(hex)}
      points={_.chunk(points, 2).map(it => it.join(',')).join(' ')}
      onClick={() => {
        inspectHex(hex);
        if (!hex.charted) exploreHex(hex);
      }}
      onMouseOver={() => {
        if (hex.charted) return;
        requestReliefStats(hex);
      }}
      className={hex.charted ? 'charted' : 'uncharted'}
      fill={getColour()}
    />
    {/*<line key={`hex.${makeId(hex)}_1`} x1={center.x} y1={center.y} x2={points[0]} y2={points[1]}*/}
    {/*stroke='gray' strokeWidth='1'*/}
    {/*/>*/}
    {/*<line key={`hex.${makeId(hex)}_2`} x1={center.x} y1={center.y} x2={points[2]} y2={points[3]}*/}
    {/*stroke='gray' strokeWidth='1'*/}
    {/*/>*/}
    {/*<line key={`hex.${makeId(hex)}_3`} x1={center.x} y1={center.y} x2={points[4]} y2={points[5]}*/}
    {/*stroke='gray' strokeWidth='1'*/}
    {/*/>*/}
    {/*<line key={`hex.${makeId(hex)}_4`} x1={center.x} y1={center.y} x2={points[6]} y2={points[7]}*/}
    {/*stroke='gray' strokeWidth='1'*/}
    {/*/>*/}
    {/*<line key={`hex.${makeId(hex)}_5`} x1={center.x} y1={center.y} x2={points[8]} y2={points[9]}*/}
    {/*stroke='gray' strokeWidth='1'*/}
    {/*/>*/}
    {/*<line key={`hex.${makeId(hex)}_6`} x1={center.x} y1={center.y} x2={points[10]} y2={points[11]}*/}
    {/*stroke='gray' strokeWidth='1'*/}
    {/*/>*/}
  </g>;
};

const drawText = (hex, x, y, className, text) => {
  return <text key={`svg.text.${className}.${makeId(hex)}`}
               className={className}
               x={x} y={y + 6}
  >
    {text}
  </text>;
};

const getPosition = (position) => {
  const DIST_FROM_CENTER = 0.5 * HEX_HEIGHT - 13;
  const DELTA_X = Math.cos(Math.PI / 6) * DIST_FROM_CENTER;
  const DELTA_Y = Math.sin(Math.PI / 6) * DIST_FROM_CENTER;
  let delta;
  switch (position) {
    case 0:
      delta = {x: 0, y: 0};
      break;
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

  return delta;
};

const drawNaturalObstacle = (hex, center) => {
  const delta = getPosition(hex.naturalObstaclePosition);

  return <text key={`svg.text.on.${makeId(hex)}`}
               className='natural-obstacle'
               x={center.x + delta.x} y={center.y + delta.y}
  >
    {natural_obstacles[hex.naturalObstacle].symbol}
  </text>;
};

const drawCommunity = (hex, center, symbol) => {
  const delta = getPosition(hex.communityPosition);

  return drawText(hex, center.x + delta.x, center.y + delta.y, 'community-text', symbol)
};

const Map = ({mapRadius, hexes, hoveredHex, inspectedHex, newlyExploredHex, reliefTypesAndWeights, exploreHex, exploreMap, inspectHex, requestReliefStats, resetMap}) => {
  const svg_hexagons = [];
  //const svg_vegetations = [];
  const svg_natural_obstacles = [];
  const svg_communities = [];

  hexes.forEach(hex => {
    const center = qr2xy(mapRadius, hex);
    svg_hexagons.push(drawFlatToppedHex(mapRadius, hex, center, exploreHex, inspectHex, requestReliefStats));
    //if (hex.vegetation !== undefined) svg_vegetations.push(drawText(hex, center, 'vegetation', `🌿${vegetation[hex.vegetation].abbr}`));
    if (hex.naturalObstacle) svg_natural_obstacles.push(drawNaturalObstacle(hex, center));
    if (hex.community) {
      svg_communities.push(drawCommunity(hex, center, hex.community.get('symbol')));
    }
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
            style={{fontWeight: (hoveredHex && hoveredHex.relief === k) ? 'bold' : 'normal'}}
        >
          {Math.round(100 * v / Array.from(reliefTypesAndWeights.values()).reduce((a, b) => a + b))}%
        </td>
        <td key={'n' + k}
            style={{
              backgroundColor: relief[k].colour,
              fontWeight: (hoveredHex && hoveredHex.relief === k) ? 'bold' : 'normal'
            }}
        >
          {relief[k].name}
        </td>
      </tr>)
    }
  }
  if (probaReliefRows.length > 0) {
    probaReliefTable = hoveredHex && <table className='probaRelief'>
      <thead>
      <tr>
        <th colSpan='2'>Tirage relief ⬣ {`(${hoveredHex.q}, ${hoveredHex.r})`}</th>
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
  inspectedHex = newlyExploredHex || inspectedHex;
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
        <td style={{backgroundColor: inspectedHex.relief ? relief[inspectedHex.relief].colour : COLOUR_UNCHARTED}}
        >
          {inspectedHex.relief ? relief[inspectedHex.relief].name : 'uncharted'}
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
            inspectedHex.naturalObstacle !== undefined
              ? natural_obstacles[inspectedHex.naturalObstacle].name + ' (au ' + position(inspectedHex.naturalObstaclePosition) + ')'
              : '—'
          }
          {
            inspectedHex.naturalObstacle !== undefined
            && <span className='natural-obstacle'> {natural_obstacles[inspectedHex.naturalObstacle].symbol}</span>
          }
        </td>
      </tr>
      {inspectedHex.community !== undefined && <tr>
        <td colSpan='2' className='communityH'>Communauté</td>
      </tr>}
      {
        inspectedHex.community !== undefined && <tr>
          <td colSpan='2' className='community'>
            <table className="inspected_community">
              <tbody>
              {Object.entries(inspectedHex.community.toJS()).map(
                ([key, value]) => {
                  switch (key) {
                    case 'name':
                      break;
                    case 'position':
                      value = `Au ${position(value)}`;
                      break;
                    case 'size':
                      return;
                    case 'symbol':
                      return;
                  }

                  value = stringify(value);

                  let value_content = <span>
                      <span>{_.capitalize(value)}</span>
                    &nbsp;&nbsp;&nbsp;
                    {key === 'name' && <span className='community-text'>{inspectedHex.community.get('symbol')}</span>}
                    </span>;

                  return <tr key={`inspected_hex_community_${key}_row`}>
                    <td key={`inspected_hex_community_${key}`}>{_.capitalize(key)}</td>
                    <td key={`inspected_hex_community_${key}_value`}>{value_content}</td>
                  </tr>;
                }
              )}
              </tbody>
            </table>
          </td>
        </tr>
      }
      </tbody>
    </table>;
  }

  return <section className='map'>
    <nav>
      <p>Pour explorer l'archipel, cliquez sur les hexagones accessibles (les hexagones gris contigus aux hexagones
        explorés).</p>
      <span className="actionLink" onClick={exploreMap}>⬣ Exploration automatique</span>
      <span className="actionLink" onClick={resetMap}>⬣ Reset</span>
      <Link to='p'>☸ Paramètres & légende</Link>
    </nav>
    <section className='col'>
      <img src='Oltréé !.jpg'/>
      {inspector}
      {probaReliefTable}
    </section>
    <svg width={MAX_X + HEX_WIDTH / 2}
         height={MAX_Y + HEX_HEIGHT / 2}
         xmlns="http://www.w3.org/2000/svg"
    >{svg_hexagons.concat(svg_natural_obstacles)/*.concat(svg_vegetations)*/.concat(svg_communities)}</svg>
    <div className='clear'/>
  </section>
};

Map.propTypes = {
  mapRadius: PropTypes.number.isRequired,
  exploreHex: PropTypes.func.isRequired,
  inspectHex: PropTypes.func.isRequired
};

export default functional(Map);