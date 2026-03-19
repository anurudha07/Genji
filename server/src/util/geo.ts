import { calculateDistance } from './distance';

export const getDistance = (
  from: [number, number],
  to: [number, number]
): number => {
  const [fromLon, fromLat] = from;
  const [toLon, toLat] = to;

  const meters = calculateDistance(fromLat, fromLon, toLat, toLon);
  return Math.round(meters / 1000);
};
