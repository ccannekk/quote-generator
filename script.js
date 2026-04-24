const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const button = document.getElementById("new-quote");

const API_URL = "https://api.quotable.io/random";

async function fetchQuote() {
  try {
    // Показываем загрузку
    quoteElement.textContent = "Загрузка...";
    authorElement.textContent = "—";

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    quoteElement.textContent = `“${data.content}”`;
    authorElement.textContent = `— ${data.author}`;

    // Сохраняем в localStorage
    localStorage.setItem(
      "lastQuote",
      JSON.stringify({
        text: data.content,
        author: data.author,
      })
    );

    // Меняем цвет фона случайным градиентом
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 40) % 360;
    document.body.style.background = `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 80%, 50%) 100%)`;
  } catch (error) {
    console.error("Ошибка при загрузке цитаты:", error);
    quoteElement.textContent = "Не удалось загрузить цитату 😔";
    authorElement.textContent = "Попробуйте позже";
  }
}

// Загружаем последнюю сохранённую цитату при загрузке страницы
function loadLastQuote() {
  const saved = localStorage.getItem("lastQuote");
  if (saved) {
    try {
      const { text, author } = JSON.parse(saved);
      quoteElement.textContent = `“${text}”`;
      authorElement.textContent = `— ${author}`;
    } catch (e) {
      console.warn("Не удалось загрузить сохранённую цитату");
    }
  }
}

button.addEventListener("click", fetchQuote);
loadLastQuote();
