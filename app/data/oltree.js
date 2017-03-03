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
  6: {name: 'Terres mortes', colour: null, symbol: '☠'}, // 🏜
  7: {name: 'Zone extrêmement magique (radiations)', colour: null, symbol: '⚛'}
};

export const all_communities = {
  0: {name: 'Cité', symbol: ''}, // < 30000h
  1: {name: 'Ville', symbol: ''}, // < 10000h
  2: {name: 'Bourgade', symbol: ''}, // < 3000h
  3: {name: 'Village', symbol: ''}, // < 500h
  4: {
    name: 'Domaine agricole', type: [
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
      ROLL_TWICE,
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
      'Matériaux alchimiques et élémentaires',
      ROLL_TWICE
    ],
    symbol: ''
  }, // < 100h
  5: {name: 'Camp itinérant', type: ['brigands', 'bohémiens', 'contrebandiers', 'chasseurs'], symbol: ''},
  6: {name: 'Cité naine', symbol: ''},
  7: {name: 'Tours sidhes', symbol: ''},
  8: {name: 'Comptoir cavalier', symbol: ''},
  9: {name: 'Pierres dressées de chevaucheurs', symbol: ''},
};

export const satellites = {
  community: 0,
  radius: [2, 3],
  satellites: [1, 2, 2, 3, 3, 4, 4, 4]
};

export const other_communities = [
  {
    type: all_communities[0].satellites,
    number: [1, 8]
  },
  {
    type: Object.keys(all_communities),
    number: [3, 10]
  }
];

// https://www.w3schools.com/colors/colors_groups.asp