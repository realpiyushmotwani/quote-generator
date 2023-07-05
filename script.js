const quotecontainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const nextButton = document.getElementById("new-quote");
const loader = document.getElementById("loader")

let apiQuotes = [];

function loading()
{
  loader.hidden =false;
  quotecontainer.hidden=true;

}

// Hide loading
function complete()
{
  quotecontainer.hidden=false;
  loader.hidden=true;
}

function newQuote() {
  loading();
  // Pick a random quote from APIquote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author is blank, then replace with Anonymous
  if (!quote.author) {
    authorText.textContent = "Anonymous";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  }
  // Set quote, hide loader
  complete();
  quoteText.textContent = quote.text;
  
}
// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("Errorrrr");
  }
}

// To tweet a quote
function shareOnTwitter() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event listeners
nextButton.addEventListener('click', newQuote)
twitterButton.addEventListener('click', shareOnTwitter)

// On load
getQuotes();
// loading();
