document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('currencyForm');
    const resultDiv = document.getElementById('result');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent default form submission
  
      const fromCurrency = document.getElementById('from').value;
      const toCurrency = document.getElementById('to').value;
      const amount = document.getElementById('amount').value;
  
      // Check if both "from" and "to" currencies are provided
      if (!fromCurrency || !toCurrency) {
        resultDiv.innerHTML = "<p>Please provide both 'from' and 'to' currencies.</p>";
        return;
      }
  
      // Show a loading message while the result is being fetched
      resultDiv.innerHTML = "<p>Loading...</p>";
  
      // Fetch the conversion result using AJAX
      fetch(`/currency?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.convertedAmount) {
      resultDiv.innerHTML = `<h2>Conversion Result</h2><p>${amount} ${fromCurrency} is equal to ${data.convertedAmount} ${toCurrency}</p>`;
    } else {
      resultDiv.innerHTML = "<p>Sorry, there was an issue with the conversion.</p>";
    }
  })
  .catch(error => {
    console.error('Error:', error);
    resultDiv.innerHTML = "<p>Sorry, there was an error fetching the conversion rate.</p>";
        });
    });
});
