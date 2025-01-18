document.addEventListener("DOMContentLoaded", function() {
  // Funzione per gestire il clic sulle skill-card
  function toggleCard() {
    const card = this.querySelector(".card-inner");
    card.classList.toggle("flipped");
  }

  // Aggiungi l'evento di clic a tutte le skill-card
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach(card => {
    card.addEventListener("click", toggleCard);
  });
});
