import {Record} from 'immutable';

export const ROLL_TWICE = '⚁';

export const relief = {
  0: {name: 'Eaux', colour: 'Aquamarine'},
  1: {name: 'Rivages', colour: 'PaleTurquoise'},
  2: {name: 'Plaines', colour: 'YellowGreen'},
  3: {name: 'Vallée fluviale', colour: 'OliveDrab'},
  4: {name: 'Collines', colour: 'DarkOliveGreen'},
  5: {name: 'Plateaux', colour: 'Orange'},
  6: {name: 'Montagnes basses', colour: 'SaddleBrown'},
  7: {name: 'Hautes montagnes', colour: '#442200'}
};

export const vegetation = {
  0: {name: 'Forêts épaisses', colour: null, symbol: '', abbr: 'FOR'},
  1: {name: 'Bois', colour: null, symbol: '', abbr: 'BOI'},
  2: {name: 'Bosquets', colour: null, symbol: '', abbr: 'BOS'},
  3: {name: 'Essarts', colour: null, symbol: '', abbr: 'ESS'},
  4: {name: 'Sables', colour: null, symbol: '', abbr: 'SAB'},
  5: {name: 'Rocailles', colour: null, symbol: '', abbr: 'ROC'},
  6: {name: 'Marais', colour: null, symbol: '', abbr: 'MAR'},
  7: {name: 'Gastes', colour: null, symbol: '', abbr: 'GAS'},
  8: {name: 'Landes', colour: null, symbol: '', abbr: 'LAN'},
  9: {name: 'Herbages', colour: null, symbol: '', abbr: 'HER'},
  10: {name: 'Pâtures', colour: null, symbol: '', abbr: 'PÂT'},
  11: {name: 'Terres arables', colour: null, symbol: '', abbr: 'ARA'},
  12: {name: 'Prairies', colour: null, symbol: '', abbr: 'PRA'},
  13: {name: 'Brande', colour: null, symbol: '', abbr: 'BRA'},
  14: {name: 'Boquereaux', colour: null, symbol: '', abbr: 'BOQ'},
  15: {name: 'Tourbière', colour: null, symbol: '', abbr: 'TOU'}
};

export const natural_obstacles = {
  0: {name: 'Chaîne de montagne', colour: null, symbol: '⼭'},
  1: {name: 'Falaise immense', colour: null, symbol: '⼚'},
  2: {name: 'Importante activité géothermique', colour: null, symbol: '♨'},
  3: {name: 'Lac', colour: null, symbol: '☱'},
  4: {name: 'Large fleuve', colour: null, symbol: '⼮'},
  5: {name: 'Profond canyon', colour: null, symbol: '🕳'},
  6: {name: 'Terres mortes', colour: null, symbol: '☠'},
  7: {name: 'Zone extrêmement magique (radiations)', colour: null, symbol: '⚛'}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// COMMUNITIES
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Draw = Record({
  name: 'an untitled draw',
  number: 1,
  data: []
});

const type_domaine_agricole = new Draw({
  name: 'Type de domaine agricole',
  number: [1, 1, 1, 1, 1, 1, 1, 2],
  data: [
    'Grains et céréales',
    {
      name: 'Élevage',
      type: ['ovins', 'ovins', 'bovins', 'bovins', 'porcs', 'porcs', 'chevaux', 'drakes']
    },
    'Apiculture',
    'Crustacés et coquillages',
    'Vignes',
    'Vergers',
    'Légumes et primeurs',
    {
      name: 'Minière',
      type: ['ardoise', 'ardoise', 'charbon', 'charbon', 'charbon', 'métaux', 'métaux', 'pierres précieuses']
    },
    {
      name: 'Carrière',
      type: ['pierres de construction', 'pierres de construction', 'pierres de construction', 'pierres de construction', 'pierres de construction', 'pierres de construction', 'marbres et équivalents', 'marbres et équivalents']
    },
    'Charbonnerie',
    'Exploitation forestière',
    'Port de pêche',
    'Champignonnières',
    'Matériaux alchimiques et élémentaires'
  ]
});

const types_domaine_agricole_etendu = new Draw({
  name: 'Domaine agricole étendu',
  number: [3, 4],
  data: type_domaine_agricole
});

const type_bourgade = [
  'Port ou habitats palafittes',
  'Villeneuve (essarts)',
  'Bourgade ancienne',
  'Ancien temple',
  'Ancienne forteresse impériale',
  'Unon de villages étendus',
  'Ville en ruine peu occupée',
  'Nécropole'
];

export const all_communities = {
  0: {
    name: 'Cité',// < 30000h
    symbol: '',
    satelliltes: {
      number: [1, 2, 3, 4, 5, 6, 7, 8],
      radius: [2, 3],
      type: [1, 2, 2, 3, 3, 4, 4, 4],
    }
  },
  1: {
    name: 'Ville', // < 10000h
    symbol: '',
    type: [
      'Ancienne capitale de strapie',
      'Centre académique',
      'Centre religieux',
      'PLace forte militaire',
      'Cité de l\'âge des titans',
      'Ancienne cité féérique conquise',
      'Cité troglodyte',
      new Draw({
        name: 'Fusion de plusieurs communautés',
        number: 4,
        date: type_bourgade
      })
    ]
  },
  2: {
    name: 'Bourgade', // < 3000h
    symbol: '',
    type: type_bourgade
  },
  3: {
    name: 'Village', // < 500h
    symbol: '',
    type: [
      types_domaine_agricole_etendu,
      types_domaine_agricole_etendu,
      types_domaine_agricole_etendu,
      'Tour ou temple',
      'Ancien fortin militaire impérial',
      'Relais de route',
      'Camp sédentarisé',
      'Ruines réoccupées'
    ]
  },
  4: {
    name: 'Domaine agricole', // < 100h
    symbol: '',
    type: type_domaine_agricole
  },
  5: {
    name: 'Camp itinérant',
    symbol: '',
    type: ['brigands', 'bohémiens', 'contrebandiers', 'chasseurs']
  },
  6: {
    name: 'Cité naine',
    symbol: ''
  },
  7: {
    name: 'Tours sidhes',
    symbol: ''
  },
  8: {
    name: 'Comptoir cavalier',
    symbol: ''
  },
  9: {
    name: 'Pierres dressées de chevaucheurs',
    symbol: ''
  }
};

export const other_communities = [
  {
    type: Object.keys(all_communities),
    number: [3, 10]
  }
];

export const conditions = [
  'Anomalie géologique',
  'Carences/déficit',
  'Infestation',
  'Lieu de passage',
  'Malédiction',
  'Menace cachée',
  'Ressources uniques',
  'Poison',
  'Position faible',
  'Position forte',
  'Microclimat',
  'Structure titanesque',
  'Secret ancien enfoui',
  'Source de mana',
  'Roches volantes',
  'Zone anti-magique'
];

export const intrigues = [
  'Ambition',
  'Connaissance',
  'Corruption',
  'Crime',
  'Folie',
  'Incompétence',
  'Menace ou danger immédiat',
  'Passion',
  'Plaisir',
  'Pouvoir',
  'Richesse',
  'Rivalités extérieures',
  'Tension internes',
  'Trahison',
  'Vengeance',
  'Violence'
];

export const themes = conditions.concat(intrigues);

export const number_of_themes_by_communities = [1, 2];
// https://www.w3schools.com/colors/colors_groups.asp
