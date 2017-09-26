import {determineRelief, exploreMap, initHexes} from '../hex/hex-utils';

export default (state = {}, action) => {
  switch (action.type) {
    case 'EXPLORE_HEX': {
      const r = determineRelief(state.mapRadius, state.hexes, action.hex);
      return {
        ...state,
        hexes: r.hexes,
        newlyExploredHex: r.hex,
        reliefTypesAndWeights: r.reliefTypesAndWeights
      };
    }
      break;
    case 'EXPLORE_MAP':
      return {
        ...state,
        hexes: exploreMap(state.mapRadius, state.hexes),
        inspectedHex: undefined,
        newlyExploredHex: undefined,
        reliefTypesAndWeights: undefined
      };
      break;
    case 'INSPECT_HEX':
      return {
        ...state,
        inspectedHex: action.hex,
        newlyExploredHex: undefined
      };
      break;
    case 'RESET_MAP':
      return {
        ...state,
        reset: true,
        hexes: initHexes(state.mapRadius),
        hoveredHex: undefined,
        inspectedHex: undefined,
        newlyExploredHex: undefined,
        reliefTypesAndWeights: undefined
      };
      break;
    case 'REQUEST_RELIEF_STATS': {
      const r = determineRelief(state.mapRadius, state.hexes, action.hex);
      return {
        ...state,
        hoveredHex: action.hex,
        reliefTypesAndWeights: r.reliefTypesAndWeights
      };
    }
      break;
    case 'SET_MAP_RADIUS':
      return {
        ...state,
        hexes: initHexes(action.mapRadius),
        mapRadius: action.mapRadius
      };
      break;
    default:
      return {
        ...state
      };
      break;
  }
};
