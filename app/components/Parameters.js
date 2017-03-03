import React, {PropTypes} from 'react';
import {Input, Label} from 'semantic-ui-react';
import {vegetation, natural_obstacles} from '../data/oltree';

const Parameters = ({mapRadius, onMapRadiusChange}) => (
  <section className='parameters_and_captions'>
    <table className='parameters'>
      <thead>
      <tr>
        <th colSpan='2'>Paramètres</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <Label>Rayon de la carte</Label>
        </td>
        <td>
          <Input type='number' min='1' max='12' onChange={onMapRadiusChange} value={mapRadius}/>
        </td>
      </tr>
      </tbody>
    </table>
    <table className='caption vegetation'>
      <thead>
      <tr>
        <th colSpan='2'>🌿 Végétation</th>
      </tr>
      </thead>
      <tbody>
      {Object.values(vegetation).map(_ => <tr key={`veg.row.${_.abbr}`}>
        <td key={`veg.abbr.${_.abbr}`}>{_.abbr}</td>
        <td key={`veg.name.${_.name}`}>{_.name}</td>
      </tr>)}
      </tbody>
    </table>
    <table className='caption'>
      <thead>
      <tr>
        <th colSpan='2'>Obstacles naturels</th>
      </tr>
      </thead>
      <tbody>
      {Object.values(natural_obstacles).map(_ => <tr key={`no.row.${_.symbol}`}>
        <td key={`no.symbol.${_.symbol}`} className='natural-obstacle'>{_.symbol}</td>
        <td key={`no.name.${_.name}`}>{_.name}</td>
      </tr>)}
      </tbody>
    </table>
  </section>
);

Parameters.propTypes = {
  mapRadius: PropTypes.number.isRequired,
  onMapRadiusChange: PropTypes.func.isRequired
};

export default Parameters;