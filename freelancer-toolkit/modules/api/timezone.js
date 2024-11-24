const timezoneAPIBaseUrl = "https://maps.googleapis.com/maps/api/timezone/json"; // Base URL for the Time Zone API

/*
 * Functions for Time Zone API requests.
 */

// Function to retrieve time zone information based on latitude, longitude, and timestamp
async function getTimeZone(latitude, longitude, timestamp) {
  const reqUrl = `${timezoneAPIBaseUrl}?location=${latitude},${longitude}&timestamp=${timestamp}&key=${process.env.GOOGLE_API_KEY}`;

  // Sending the GET request to fetch the time zone information
  let response = await fetch(reqUrl, {
    method: "GET", // Default GET method
    headers: {
      "Content-Type": "application/json", // Set content type to application/json
    },
  });

  // Check if the response is successful
  if (!response.ok) {
    throw new Error(`Failed to fetch time zone: ${response.statusText}`);
  }

  return await response.json(); // Return the JSON response containing the time zone information
}

module.exports = {
  getTimeZone,
};
