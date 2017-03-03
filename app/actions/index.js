export const exploreHex = (hex) => ({
  type: 'EXPLORE_HEX',
  hex: hex
});

export const exploreMap = () => ({
  type: 'EXPLORE_MAP'
});

export const inspectHex = (hex) => ({
  type: 'INSPECT_HEX',
  hex: hex
});

export const resetMap = () => ({
  type: 'RESET_MAP'
});

export const setMapRadius = (mapRadius) => ({
  type: 'SET_MAP_RADIUS',
  mapRadius: mapRadius
});