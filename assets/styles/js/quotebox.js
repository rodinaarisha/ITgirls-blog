const quoteElement = document.getElementById('quote');

  async function fetchQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Ошибка при получении цитаты:', error.message);
      return 'Не удалось получить цитату';
    }
  }

  async function displayQuote() {
    const quote = await fetchQuote();
    quoteElement.textContent = quote;
  }

  // Initial call to display a quote when the page loads
  displayQuote();

  // Show the container with a fade-in effect
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('quoteOfTheDay');
    container.style.opacity = '1';
  });
