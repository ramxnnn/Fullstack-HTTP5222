const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const currency = require("./modules/api/currency"); // Importing currency.js
const places = require("./modules/api/places");    // Importing places.js
const timezone = require("./modules/api/timezone"); // Importing timezone.js

dotenv.config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 8888;

// Setting up Pug as the templating engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public"))); // Serve static files like CSS, JS, images

// Home route (main page)
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Currency Exchange route
app.get("/currency", async (req, res) => {
  const { from = "USD", to = "CAD" } = req.query; // Default to USD to CAD if no query provided
  try {
    const rates = await currency.getExchangeRates(from, to);
    res.json(rates); // Sending exchange rate data as JSON
  } catch (error) {
    res.status(500).send(`Error fetching exchange rates: ${error.message}`);
  }
});

// Workspace Locator route
app.get("/workspaces", async (req, res) => {
  const location = req.query.location || "Toronto"; // Use query parameter or default to "Toronto"
  try {
    const workspaces = await places.findWorkspaces(location);
    res.render("workspace", { title: "Workspace Locator", workspaces: workspaces });
  } catch (error) {
    res.status(500).send(`Error finding workspaces: ${error.message}`);
  }
});

// Timezone route
app.get("/timezones", async (req, res) => {
  const { lat = 43.65107, lng = -79.347015 } = req.query; // Default to Toronto coordinates
  const timestamp = Math.floor(Date.now() / 1000); // Current timestamp (in seconds)
  try {
    const tz = await timezone.getTimezone(lat, lng, timestamp);
    res.render("timezones", {
      title: "Time Zones",
      location: `Latitude: ${lat}, Longitude: ${lng}`,
      timezoneName: tz.timeZoneId,
      rawOffset: tz.rawOffset
    });
  } catch (error) {
    res.status(500).send(`Error fetching timezone: ${error.message}`);
  }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
