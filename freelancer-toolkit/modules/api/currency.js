// currency.js

const https = require('https');  // Using native https module

const getExchangeRates = (baseCurrency, callback) => {
    const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

    https.get(url, (response) => {
        let data = '';

        // Collecting data chunks
        response.on('data', (chunk) => {
            data += chunk;
        });

        // On response end, parse data
        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                callback(null, jsonData.rates);  // Return the rates
            } catch (error) {
                callback('Error parsing data');
            }
        });
    }).on('error', (error) => {
        callback('Error fetching data: ' + error.message);
    });
};

const convertCurrency = (amount, fromCurrency, toCurrency, callback) => {
    getExchangeRates(fromCurrency, (error, rates) => {
        if (error) {
            callback(error, null);
        } else {
            const convertedAmount = amount * rates[toCurrency];
            callback(null, convertedAmount.toFixed(2));  // Return the converted amount
        }
    });
};

module.exports = { convertCurrency };
