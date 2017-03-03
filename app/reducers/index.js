import {determineRelief, exploreMap, initHexes} from '../hex/hex-utils';

export default (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case 'EXPLORE_HEX':
      const r = determineRelief(state.mapRadius, state.hexes, action.hex);
      return {
        ...state,
        hexes: r.hexes,
        newlyExploredHex: r.hex,
        reliefTypesAndWeights: r.reliefTypesAndWeights
      };
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
        inspectedHex: action.hex
      };
      break;
    case 'RESET_MAP':
      return {
        ...state,
        reset: true,
        hexes: initHexes(state.mapRadius),
        inspectedHex: undefined,
        newlyExploredHex: undefined,
        reliefTypesAndWeights: undefined
      };
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
