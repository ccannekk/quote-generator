const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const button = document.getElementById("new-quote");

let quotes = [];

async function loadQuotes() {
  try {
    const response = await fetch("quotes.json");
    if (!response.ok) throw new Error("Ошибка загрузки цитат");
    quotes = await response.json();
    showRandomQuote();
  } catch (error) {
    console.error(error);
    quoteElement.textContent = "Ошибка загрузки цитат 😔";
  }
}

function showRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const q = quotes[randomIndex];
  quoteElement.textContent = `“${q.quote}”`;
  authorElement.textContent = `— ${q.author}`;

  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 + 40) % 360;
  document.body.style.background = `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 80%, 50%) 100%)`;

  localStorage.setItem("lastQuote", JSON.stringify(q));
}

function loadLastQuote() {
  const saved = localStorage.getItem("lastQuote");
  if (saved) {
    try {
      const q = JSON.parse(saved);
      quoteElement.textContent = `“${q.quote}”`;
      authorElement.textContent = `— ${q.author}`;
    } catch (e) {}
  }
}

button.addEventListener("click", showRandomQuote);
loadQuotes();
loadLastQuote();
