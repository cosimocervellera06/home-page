document.addEventListener("DOMContentLoaded", function() {
  const textElement = document.getElementById("typing-text");
  const texts = [
    "Cosimo",
    "a programmer",
    "an athlete",
    "a hacker"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        textElement.textContent = currentText.slice(0, charIndex);
        charIndex--;
      } else {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length; // Passa al prossimo testo
        setTimeout(type, 0);
        return;
      }
    } else {
      textElement.textContent = currentText.slice(0, charIndex);
      charIndex++;

      if (charIndex > currentText.length) {
        isDeleting = true;
        setTimeout(type, 5000); // Attendere 5 secondi prima di iniziare a cancellare
        return;
      }
    }

    setTimeout(type, isDeleting ? 100 : 200); // Imposta il ritardo tra le lettere (più lento quando cancella)
  }

  type(); // Avvia l'effetto di scrittura
});
