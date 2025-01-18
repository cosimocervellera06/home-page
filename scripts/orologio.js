document.addEventListener("DOMContentLoaded", function() {
  // Orologio
  function aggiornaOrologio() {
    const adesso = new Date();
    const elementoOrologio = document.getElementById("clock");
    const ore = String(adesso.getHours()).padStart(2, "0");
    const minuti = String(adesso.getMinutes()).padStart(2, "0");
    const secondi = String(adesso.getSeconds()).padStart(2, "0");
    elementoOrologio.textContent = `${ore}:${minuti}:${secondi}`;
  }
  function avviaOrologio() {
    setInterval(aggiornaOrologio, 1000);
  }
  // Avvia l'orologio
  avviaOrologio();
});