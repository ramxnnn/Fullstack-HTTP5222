const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const currency = require("./modules/api/currency");
const places = require("./modules/api/places"); // Import your places.js file here, only once
const timezone = require("./modules/api/timezone");

dotenv.config();
const app = express();
const port = process.env.PORT || 8888;

// Setup Pug as the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse query parameters as floats when needed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.render("index", { title: "Freelancer Toolkit" });
});

app.get("/currency", async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.json({
      convertedAmount: null,
      error: "Please provide both 'from' and 'to' currencies and an amount."
    });
  }

  const amountValue = parseFloat(amount) || 1;

  try {
    const converted = await currency.getExchangeRates(from, to, amountValue);  // Call your currency conversion logic
    return res.json({
      convertedAmount: converted,
    });
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
    return res.json({});
  }
});

// Existing route for the Workspace Locator
app.get("/workspaces", async (req, res) => {
  const location = req.query.location || "Toronto";  // Default to Toronto if no location is provided
  try {
    const workspaces = await places.findWorkspaces(location);
    res.json(workspaces);  // Return workspaces as JSON
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/timezones", async (req, res) => {
  const { lat, lng } = req.query; // Extract lat and lng from query

  // Validate that lat and lng are provided
  if (!lat || !lng) {
    return res.render("timezones", {
      title: "Time Zones",
      error: "Please provide both latitude and longitude."
    });
  }

  const timestamp = Math.floor(Date.now() / 1000); // Use the current timestamp

  try {
    // Call the timezone API with valid lat, lng
    const tz = await timezone.getTimezone(lat, lng, timestamp);

    // Render the timezones view with timezone data
    return res.render("timezones", {
      title: "Time Zones",
      timezone: tz
    });
  } catch (error) {
    console.error("Error fetching timezone data:", error.message);
    res.render("timezones", {
      title: "Time Zones",
      error: "Failed to fetch timezone data. Please try again."
    });
  }
});


// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
