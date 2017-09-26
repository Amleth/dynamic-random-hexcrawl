import {Record} from 'immutable';

export const Hex = Record({
  q: Number.MIN_SAFE_INTEGER,
  r: Number.MIN_SAFE_INTEGER,
  charted: false,
  relief: undefined,
  vegetation: undefined,
  naturalObstacle: undefined,
  naturalObstaclePosition: undefined,
  community: undefined,
  communityPosition: undefined
});

export const makeId = hex => `${hex.q},${hex.r}`;