document.addEventListener("DOMContentLoaded", function() {
  // Funzione per animare il testo di ricerca
  function animateSearchText(text, callback) {
    // Creazione di un elemento div per sovrapporre il testo
    const searchOverlay = document.createElement("div");
    searchOverlay.className = "search-overlay";

    // Creazione di un elemento span per il testo
    const textElement = document.createElement("span");
    textElement.textContent = text;
    textElement.className = "search-text";

    // Aggiunta dell'elemento del testo al div di sovrapposizione
    searchOverlay.appendChild(textElement);

    // Aggiunta del div di sovrapposizione al corpo del documento
    document.body.appendChild(searchOverlay);

    // Generazione di un colore casuale per lo sfondo
    const colors = ["#FFD700", "#FF6347", "#7FFF00", "#00BFFF", "#EE82EE"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    searchOverlay.style.backgroundColor = randomColor;

    // Animazione con la libreria anime.js
    anime({
      targets: ".search-overlay",
      scale: [0, 1],
      duration: 1000,
      easing: "easeInOutQuad",
      complete: function() {
        // Rimozione del div di sovrapposizione alla fine dell'animazione
        searchOverlay.parentNode.removeChild(searchOverlay);
        if (typeof callback === "function") {
          callback();
        }
      }
    });
  }

  // Funzione per eseguire la ricerca su Internet
  function searchOnInternet() {
    const searchInput = document.getElementById("search-input");
    const selectedEngine = document.querySelector('input[name="browser"]:checked');

    if (selectedEngine) {
      const engineUrl = selectedEngine.value;
      const query = searchInput.value.trim();

      if (query !== "") {
        // Verifica se la query è un URL
        const isLink = isURL(query);

        if (isLink) {
          // Se è un URL, anima il testo e apri in una nuova finestra
          animateSearchText(getDomainName(query), function() {
            window.open("https://" + query, "_blank");
          });
        } else {
          // Se non è un URL, costruisci l'URL di ricerca e apri in una nuova finestra
          const searchUrl = engineUrl + encodeURIComponent(query);
          animateSearchText("Ricerca", function() {
            window.open(searchUrl, "_blank");
          });
        }

        // Pulizia dell'input e animazione
        searchInput.value = "";
        searchInput.style.animation = "searchAnimation 0.5s";
        setTimeout(function() {
          searchInput.style.animation = "";
        }, 500);
      }
    }
  }

  // Funzione per verificare se una stringa è un URL
  function isURL(str) {
    const pattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/[\w .-]*)*\/?$/i;
    return pattern.test(str);
  }

  // Funzione per ottenere il nome di dominio da un URL
  function getDomainName(url) {
    // Rimozione del protocollo (http:// o https://)
    let domain = url.replace(/^(https?:\/\/)?/, "");

    // Rimozione del prefisso "www."
    domain = domain.replace(/^www\./, "");

    // Rimozione dell'estensione del dominio (.com, .org, .it, ecc.)
    domain = domain.replace(/\.[^.]+$/, "");

    return domain;
  }

  // Funzione per gestire l'evento di premere il tasto "Invio" sulla tastiera
  function handleKeyPress(event) {
    // 13 è il codice del tasto "Invio"
    if (event.keyCode === 13) {
      searchOnInternet();
    }
  }

  // Aggiunta del gestore di eventi per il tasto "Invio" all'elemento di input
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", handleKeyPress);
  // Gestione dell'evento di clic sul pulsante di ricerca
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", searchOnInternet);
});
