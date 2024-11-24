const https = require('https');

const placesAPIBaseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"; // Correct API endpoint

/*
 * Functions for Places API requests.
 */

// Function to retrieve workspaces (e.g., coworking spaces) near a location.
async function findWorkspaces(location) {
  const radius = 5000; // Define the search radius in meters (5 km)
  const type = "coworking_space"; // Type of place to search for (coworking spaces)
  const key = process.env.GOOGLE_API_KEY; // API key

  // Ensure location is in the correct format (lat,lng)
  const [lat, lng] = location.split(','); // Split location string to get lat, lng

  if (!lat || !lng) {
    throw new Error('Invalid location format. Please provide latitude and longitude.');
  }

  // Construct the URL for the Places API search endpoint
  const reqUrl = `${placesAPIBaseUrl}?location=${lat},${lng}&radius=${radius}&type=${type}&key=${key}`;

  return new Promise((resolve, reject) => {
    const req = https.request(reqUrl, { method: 'GET' }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          
          if (jsonResponse.status === 'OK') {
            resolve(jsonResponse.results); // Return the list of workspaces (places)
          } else {
            reject(new Error(`Error from Google Places API: ${jsonResponse.status}`));
          }
        } catch (error) {
          reject("Error parsing response JSON.");
        }
      });
    });

    req.on('error', (error) => {
      reject(`Request failed: ${error.message}`);
    });

    req.end(); // End the request
  });
}

// Function to retrieve address components for a given place ID.
async function getAddressComponents(placeId) {
  const key = process.env.GOOGLE_API_KEY; // API key
  const reqUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`;

  return new Promise((resolve, reject) => {
    const req = https.request(reqUrl, { method: 'GET' }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          
          if (jsonResponse.status === 'OK') {
            resolve(jsonResponse.result.address_components); // Return address components
          } else {
            reject(new Error(`Error from Google Places API: ${jsonResponse.status}`));
          }
        } catch (error) {
          reject("Error parsing response JSON.");
        }
      });
    });

    req.on('error', (error) => {
      reject(`Request failed: ${error.message}`);
    });

    req.end(); // End the request
  });
}

module.exports = {
  findWorkspaces,
  getAddressComponents
};
