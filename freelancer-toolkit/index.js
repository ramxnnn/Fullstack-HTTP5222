const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const currency = require("./modules/api/currency");
const places = require("./modules/api/places");
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
  console.log("Received query parameters:", from, to, amount);

  if (!from || !to) {
    return res.render("convert", {
      title: "Currency Converter",
      from: from || '',
      to: to || '',
      amount: amount || '',
      convertedAmount: null,
      error: "Please provide both 'from' and 'to' currencies."
    });
  }

  const amountValue = parseFloat(amount) || 1;

  try {
    // Call the currency conversion function
    const converted = await currency.getExchangeRates(from, to, amountValue);
    console.log(`Converted Amount: ${converted}`);
    res.render("convert", {
      title: "Currency Converter",
      from,
      to,
      amount: amountValue,
      convertedAmount: converted,  // Pass the converted amount to pug template
      error: null
    });
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
    res.render("convert", {
      title: "Currency Converter",
      from,
      to,
      amount: amountValue,
      convertedAmount: null,
      error: "Sorry, there was an error fetching the conversion rate."
    });
  }
});

app.get("/workspaces", async (req, res) => {
    const location = req.query.location || "Toronto";
    try {
        const workspaces = await places.findWorkspaces(location);
        res.render("workspace", { title: "Workspace Locator", workspaces });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/timezones", async (req, res) => {
  const { lat, lng } = req.query; // Ensure lat and lng are passed correctly
  const timestamp = Math.floor(Date.now() / 1000); // Use the current timestamp

  try {
      const tz = await timezone.getTimezone(lat, lng, timestamp);
      res.render("timezones", { 
          title: "Time Zones", 
          timezone: tz 
      });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
