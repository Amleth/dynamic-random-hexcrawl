import lodash from 'lodash';

const isDraw = _ => _.hasOwnProperty('name') && _.hasOwnProperty('data');

export const stringify = (_) => {
  if (lodash.isString(_) || lodash.isBoolean(_) || lodash.isNumber(_)) {
    return _;
  }
  if (lodash.isMap(_)) {
    return Array.from(_.entries()).map(_ => `${_[0]} (${stringify(_[1])})`).join(', ');
  }
  if (lodash.isSet(_)) {
    return Array.from(_.values()).map(stringify).join(', ');
  }
  if (lodash.isArray(_)) {
    return _.map(stringify).join(', ');
  }
};

const drawFn = (_) => {
  const helper1 = (name, data) => {
    if (name) {
      return new Map([[name, drawFn(lodash.sample(data))]]);
    }
    else {
      return drawFn(lodash.sample(data));
    }
  };

  if (lodash.isArray(_)) {
    return drawFn(lodash.sample(_));
  }
  else if (isDraw(_)) {
    if (!_.hasOwnProperty('number')) {
      return helper1(_.name, _.data);
    }
    else {
      let number = Array.isArray(_.number) ? lodash.sample(_.number) : _.number;
      if (number > 1) {
        const result = new Set();
        for (let i = 0; i < number; i++) {
          result.add(drawFn(_.data));
        }
        return new Map([[_.name, result]]);
      }
      else {
        return helper1(_.name, _.data);
      }
    }
  }
  else if (typeof _ === 'object') {
    return Object.assign(...Object.entries(_).map(([k, v]) => {
        if (isDraw(v)) {
          const draw = drawFn(v);
          const [kk, vv] = draw.entries().next().value;
          return {[kk]: vv};
        }
        else {
          return {[k]: drawFn(v)};
        }
      }
      )
    );
  }
  else {
    return _;
  }
};

export const getValue = map => map.entries().next().value[1];

export const draw = drawFn;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// RELIEF, VEGETATION & NATURAL OBSTACLES
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  0: {name: 'Chaîne de montagne', colour: null, symbol: '⛰'},
  1: {name: 'Falaise immense', colour: null, symbol: 'f'},
  2: {name: 'Importante activité géothermique', colour: null, symbol: '♨'},
  3: {name: 'Lac', colour: null, symbol: '☱'},
  4: {name: 'Large fleuve', colour: null, symbol: '巛'},
  5: {name: 'Profond canyon', colour: null, symbol: '🕳'},
  6: {name: 'Terres mortes', colour: null, symbol: '☠'},
  7: {name: 'Zone extrêmement magique (radiations)', colour: null, symbol: '⚛'}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// COMMUNITIES DATA
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const types_domaine_agricole = {
  name: 'Type de domaine agricole',
  number: [1, 1, 1, 1, 1, 1, 1, 2],
  data: [
    'Grains et céréales',
    {
      name: 'Élevage',
      data: ['ovins', 'ovins', 'bovins', 'bovins', 'porcs', 'porcs', 'chevaux', 'drakes']
    },
    'Apiculture',
    'Crustacés et coquillages',
    'Vignes',
    'Vergers',
    'Légumes et primeurs',
    {
      name: 'Minière',
      data: ['ardoise', 'ardoise', 'charbon', 'charbon', 'charbon', 'métaux', 'métaux', 'pierres précieuses']
    },
    {
      name: 'Carrière',
      data: ['pierres de construction', 'pierres de construction', 'pierres de construction', 'pierres de construction', 'pierres de construction', 'pierres de construction', 'marbres et équivalents', 'marbres et équivalents']
    },
    'Charbonnerie',
    'Exploitation forestière',
    'Port de pêche',
    'Champignonnières',
    'Matériaux alchimiques et élémentaires'
  ]
};

export const types_domaine_agricole_etendu = {
  name: 'Type de domaine agricole étendu',
  number: [3, 4],
  data: types_domaine_agricole
};

export const types_village = {
  name: 'Type de village',
  data: [
    types_domaine_agricole_etendu,
    types_domaine_agricole_etendu,
    types_domaine_agricole_etendu,
    'Tour ou temple',
    'Ancien fortin militaire impérial',
    'Relais de route',
    'Camp sédentarisé',
    'Ruines réoccupées'
  ]
};

export const types_bourgade = {
  name: 'Type de bourgade',
  data: [
    'Port ou habitats palafittes',
    'Villeneuve (essarts)',
    'Bourgade ancienne',
    'Ancien temple',
    'Ancienne forteresse impériale',
    'Unon de villages étendus',
    'Ville en ruine peu occupée',
    'Nécropole'
  ]
};

export const types_ville = {
  name: 'Type de ville',
  data: [
    'Ancienne capitale de satrapie',
    'Centre académique',
    'Centre religieux',
    'Place forte militaire',
    `Cité de l'âge des titans`,
    'Ancienne cité féérique conquise',
    'Cité troglodyte',
    {
      name: 'Fusion de plusieurs communautés',
      number: 4,
      data: types_bourgade
    }
  ]
};

export const types_camp_itinerant = {
  name: 'Type de camp itinérant',
  data: ['brigands', 'bohémiens', 'contrebandiers', 'chasseurs']
};

export const peuple = [
  'Aigle géant',
  'Centaure',
  'Cyclope',
  'Dryade',
  'Ettin',
  'Géant',
  'Gnoll',
  'Gobelin',
  'Gobelours',
  'Harpie',
  'Hobgobelin',
  'Homme-lézard',
  'Kobold',
  'Minotaure',
  'Naïade',
  'Nymphe',
  'Ogre',
  'Orque',
  'Pixie',
  'Rakshasa',
  'Satyre',
  'Sylvanien',
  'Troglodyte',
  'Troll'
];

export const cite_naine_situation = {
  name: 'Situation',
  data: [
    'Ancienne forteresse titan',
    'Cité souterraine',
    'Ville nomade',
    'Cité de surface',
    'Cité de surface',
    'Cité de surface',
    'Cité de surface',
    'Cité de surface'
  ]
};

export const cite_naine_occupation_principale =
  {
    name: 'Occupation principale',
    data: [
      'Agriculteurs',
      'Archivistes',
      'Astrologues',
      'Conserveries',
      'Forgerons',
      'Magistrats féériques',
      'Mineurs',
      'Tisserands'
    ]
  };

export const tour_sidhe_fonction_des_tours = {
  name: 'Fonction',
  data: [
    `Cercle d'invocation élémentaire`,
    'Chenils de la chasse sauvage',
    {
      name: 'Élevage',
      data: ['griffons', 'griffons', 'pégases', 'pégases', 'guivres', 'hippogriffes', 'chevaux elfiques', 'chevaux elfiques']
    },
    'Forteresse sidhe',
    'Laboratoires alchimiques et confection de drogues récréatives',
    'Observatoire astrologique',
    'Palais royal',
    'Refuge caché'
  ]
};

export const comptoir_cavalier_nature_du_clan = {
  name: 'Nature du clan',
  data: [
    {name: 'Chasseurs', data: ['boeufs sauvages', 'oliphants', 'cervidés', 'drakes']},
    'Déculturation et assimilation',
    {name: 'Éleveurs', data: ['longues cornes', 'longues cornes', 'drakes', 'chevaux']},
    'En cours de sédentarisation agraire',
    'Herboristes',
    `Maîtres d'armes traditionnels`,
    'Mystiques (protègent un augure cavalier)',
    'Trappeurs et fourreurs'
  ]
};

export const pierre_dressee_des_chevaucheurs_nature_du_clan = {
  name: 'Nature du clan',
  data: [
    'Apiculteurs',
    {name: 'Chasseurs', data: ['boeufs sauvages', 'oliphants', 'cervidés', 'drakes']},
    'Cueilleurs élémentaires',
    {name: 'Éleveurs', data: ['antilopes', 'rennes', 'worgs', 'drakes']},
    'Guerriers-pillards',
    'Herboristes',
    'Mystiques et astrologues',
    'Tisserands'
  ]
};

export const cite_feerique_forme = {
  name: 'Forme',
  number: [1, 1, 1, 1, 1, 1, 1, 2],
  data: ['Couronne', 'Disque', 'Géode(s)', 'Sous-marine', 'Souterraine', 'Sphère en lévitation', 'Tour élancée']
};

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

const themes_by_community = {
  name: 'Thèmes',
  number: [1, 2],
  data: conditions.concat(intrigues)
};

export const registry = {
  0: {
    name: 'Cité',
    symbol: 'CIT',
    size: '< 30000h',
    themes: themes_by_community
  },
  1: {
    name: 'Ville',
    symbol: 'vil',
    type: types_ville,
    size: '< 10000h',
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  2: {
    name: 'Bourgade',
    symbol: 'bou',
    type: types_bourgade,
    size: '< 3000h',
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  3: {
    name: 'Village',
    symbol: 'vge',
    type: types_village,
    size: '< 500h',
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  4: {
    name: 'Domaine agricole',
    symbol: 'agr',
    type: types_domaine_agricole,
    size: '< 100h',
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  5: {
    name: 'Camp itinérant',
    symbol: 'iti',
    type: types_camp_itinerant,
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  6: {
    name: 'Cité naine',
    symbol: 'nai',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    situation: cite_naine_situation,
    occupation: cite_naine_occupation_principale,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  7: {
    name: 'Tours sidhes',
    symbol: 'sid',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    fonction: tour_sidhe_fonction_des_tours,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  8: {
    name: 'Comptoir cavalier',
    symbol: 'cav',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    type: comptoir_cavalier_nature_du_clan,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  9: {
    name: 'Pierres dressées de chevaucheurs',
    symbol: 'che',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    type: pierre_dressee_des_chevaucheurs_nature_du_clan,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  10: {
    name: 'Camp ancien',
    symbol: 'anc',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    peuple: peuple,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  11: {
    name: 'Occupation de ruines',
    symbol: 'rui',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    peuple: peuple,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  12: {
    name: 'Abris naturels',
    symbol: 'nat',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    peuple: peuple,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  13: {
    name: 'Caravane',
    symbol: 'car',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    peuple: peuple,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  14: {
    name: 'Chélopole (tortue géante porteuse)',
    symbol: 'tor',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    peuple: peuple,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  15: {
    name: 'Habitats troglodytes',
    symbol: 'tro',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    peuple: peuple,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  16: {
    name: 'Gouffres et cavernes',
    symbol: 'g/c',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    peuple: peuple,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
  17: {
    name: 'Cité féérique',
    symbol: 'féé',
    size: [1, 2, 3, 4, 5, 6, 7, 8],
    peuple: peuple,
    type: cite_feerique_forme,
    themes: themes_by_community,
    position: lodash.range(1, 7)
  },
};

export const types_communaute_citadine = [registry[4], registry[4], registry[4], registry[3], registry[3], registry[2], registry[2], registry[1]];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// ON THE MAP...
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cite = registry[0];

// à 3 hex max de la cité
export const satellites_de_la_cite = {
  name: 'Satellites de la cité',
  number: [1, 2, 3, 4, 5, 6, 7, 8],
  data: types_communaute_citadine
};
export const autres_communautes = {
  name: 'Autres communautés',
  number: [3, 4, 5, 6, 7, 8, 9, 10],
  data: [types_communaute_citadine, types_communaute_citadine, types_communaute_citadine, registry[5], registry[6], registry[7], registry[8], registry[9]]
};
export const communautes_feeriques = {
  name: 'Communauté féérique',
  number: [1, 2, 3, 4, 5, 6, 7, 8],
  data: [registry[10], registry[11], registry[12], registry[13], registry[14], registry[15], registry[16], registry[17]]
};