
// Géocoder une région
export const geocodeSingleRegion = async (regionName, regionsList) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      regionName + ", Madagascar"
    )}&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const result = data[0];
      const locationData = {
        name: regionName,
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        fullName: result.display_name,
        found: true,
        order: regionsList.indexOf(regionName) + 1,
      };

      return locationData;
    } else {
      return { name: regionName, found: false, error: "Non trouvé" };
    }
  } catch (error) {
    return { name: regionName, found: false, error: error.message };
  }
};

// Géocoder toutes les régions
export const geocodeAllRegions = async (
  regionsList,
  setLoading,
  setLocations,
  setMapErrors,
  setProgress
) => {
  setLoading(true);
  setLocations([]);
  setMapErrors([]);
  setProgress(0);

  const results = [];
  const errorList = [];

  for (let i = 0; i < regionsList.length; i++) {
    const regionName = regionsList[i];

    const result = await geocodeSingleRegion(regionName, regionsList);

    if (result.found) {
      results.push(result);
    } else {
      errorList.push(result);
    }

    setProgress(((i + 1) / regionsList.length) * 100);

    if (i < regionsList.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // Trier les résultats selon l'ordre de la liste originale
  results.sort(
    (a, b) => regionsList.indexOf(a.name) - regionsList.indexOf(b.name)
  );

  setLocations(results);
  setMapErrors(errorList);
  setLoading(false);
};

// Créer les coordonnées pour les lignes
export const getConnectionCoordinates = (locations) => {
  // Retourner un tableau de coordonnées dans l'ordre de la liste
  return locations.map((location) => [location.lat, location.lng]);
};

// Calculer le centre de la carte
export const calculateMapBounds = (locations) => {
  if (locations.length === 0) return [-18.8792, 47.5079];

  const lats = locations.map((loc) => loc.lat);
  const lngs = locations.map((loc) => loc.lng);

  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

  return [centerLat, centerLng];
};
