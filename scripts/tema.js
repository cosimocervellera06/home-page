document.addEventListener("DOMContentLoaded", function() {
  // Tema chiaro/tema scuro
  function toggleTema() {
    const temaToggle = document.getElementById("theme-toggle");
    temaToggle.addEventListener("click", function() {
      document.body.classList.toggle("theme-dark");
      const temaCorrente = document.body.classList.contains("theme-dark") ? "Tema Chiaro" : "Tema Scuro";
      temaToggle.textContent = temaCorrente;
    });
  }

  // Gestisci il toggle del tema
  toggleTema();
});