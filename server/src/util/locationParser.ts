/**
 * Parse location string in format "latitude, longitude"
 * Deprecated: Use GeoJSON Point format instead
 * @param location Location string like "21.1323418, 79.0952874"
 * @returns Object with latitude and longitude, or null if invalid
 */
export function parseLocationString(
  location: string
): { latitude: number; longitude: number } | null {
  if (!location || typeof location !== 'string') {
    return null;
  }

  const parts = location.trim().split(',');
  if (parts.length !== 2) {
    return null;
  }

  const latitude = parseFloat(parts[0].trim());
  const longitude = parseFloat(parts[1].trim());

  // Validate coordinates
  if (isNaN(latitude) || isNaN(longitude)) {
    return null;
  }

  if (latitude < -90 || latitude > 90) {
    return null;
  }

  if (longitude < -180 || longitude > 180) {
    return null;
  }

  return { latitude, longitude };
}

/**
 * Format latitude and longitude to location string
 * Deprecated: Use GeoJSON Point format instead
 * @param latitude Latitude value
 * @param longitude Longitude value
 * @returns Formatted location string "latitude, longitude"
 */
export function formatLocationString(latitude: number, longitude: number): string {
  return `${latitude}, ${longitude}`;
}

/**
 * Validate GeoJSON Point location
 * @param location Location object in GeoJSON Point format
 * @returns True if valid, false otherwise
 */
export function isValidGeoJSONPoint(
  location: { type: 'Point'; coordinates: [number, number] }
): location is { type: 'Point'; coordinates: [number, number] } {
  if (!location || typeof location !== 'object') {
    return false;
  }

  if (location.type !== 'Point') {
    return false;
  }

  if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
    return false;
  }

  const [longitude, latitude] = location.coordinates;

  if (typeof longitude !== 'number' || typeof latitude !== 'number') {
    return false;
  }

  if (latitude < -90 || latitude > 90) {
    return false;
  }

  if (longitude < -180 || longitude > 180) {
    return false;
  }

  return true;
}

/**
 * Convert GeoJSON Point to object with latitude and longitude
 * @param location GeoJSON Point location
 * @returns Object with latitude and longitude
 */
export function geoJSONToCoordinates(location: { type: 'Point'; coordinates: [number, number] }): {
  latitude: number;
  longitude: number;
} {
  const [longitude, latitude] = location.coordinates;
  return { latitude, longitude };
}
