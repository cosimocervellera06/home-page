document.addEventListener("DOMContentLoaded", function() {
  var dimensione = 4; // Dimensione della griglia
  var elementiHTML; // Array per memorizzare gli elementi HTML delle celle
  var celle; // Array bidimensionale per memorizzare i valori delle celle

  function creaCampo() {
    if (elementiHTML) {
      return; // Se il campo è già stato creato, esci dalla funzione
    }
    elementiHTML = [];
    var tabella = document.getElementById('field'); // Ottieni l'elemento HTML della tabella
    for (var y = 0; y < dimensione; y++) {
      var riga = document.createElement('tr'); // Crea una nuova riga della tabella
      var elementiRiga = [];
      for (var x = 0; x < dimensione; x++) {
        var cella = document.createElement('td'); // Crea una nuova cella
        cella.setAttribute('class', 'cell'); // Aggiungi la classe 'cell' alla cella
        riga.appendChild(cella); // Aggiungi la cella alla riga
        elementiRiga.push(cella); // Aggiungi la cella all'array elementiRiga
      }
      elementiHTML.push(elementiRiga); // Aggiungi l'array elementiRiga all'array elementiHTML
      tabella.appendChild(riga); // Aggiungi la riga alla tabella
    }
  }

  function creaCelle() {
    celle = [];
    for (var y = 0; y < dimensione; y++) {
      celle.push(new Array(dimensione).fill(0)); // Crea una riga di celle vuote
    }
  }

  function generaInCellaVuota() {
    var x, y;
    do {
      x = Math.floor(Math.random() * dimensione), y = Math.floor(Math.random() * dimensione);
      if (celle[y][x] == 0) {
        // Definisci i possibili valori in base al valore massimo raggiunto
        var valoriPossibili = [2, 2, 2]; // Valori possibili iniziali
        var valoreMassimoRaggiunto = Math.max(...celle.flat());
        document.getElementById("max-score-value").textContent = valoreMassimoRaggiunto;
        if (valoreMassimoRaggiunto >= 2) {
          valoriPossibili = [2, 2, 2];
        }
        if (valoreMassimoRaggiunto >= 4) {
          valoriPossibili = [2, 2, 4];
        }
        if (valoreMassimoRaggiunto >= 8) {
          valoriPossibili = [2, 4, 8];
        }
        if (valoreMassimoRaggiunto >= 128) {
          valoriPossibili = [valoreMassimoRaggiunto / 32, valoreMassimoRaggiunto / 16, valoreMassimoRaggiunto / 8];
        }
        var indiceCasuale = Math.floor(Math.random() * valoriPossibili.length);
        celle[y][x] = valoriPossibili[indiceCasuale]; // Assegna un valore casuale alla cella vuota
        break;
      }
    } while (true);
  }

  function disegna() {
    for (var y = 0; y < dimensione; y++) {
      for (var x = 0; x < dimensione; x++) {
        var cellaHTML = elementiHTML[y][x]; // Ottieni l'elemento HTML della cella
        var valore = celle[y][x]; // Ottieni il valore della cella
        cellaHTML.innerHTML = valore == 0 ? '' : String(valore); // Mostra il valore nella cella
        if (valore == 0) {
          cellaHTML.setAttribute('style', 'background-color: white'); // Imposta lo sfondo a bianco se il valore è 0
        } else {
          var h = 20 + 24 * Math.log2(2048 / valore); // Calcola il colore in base al valore
          cellaHTML.setAttribute('style', 'background-color: hsl(' + h + ', 100%, 50%)');
        }
      }
    }
  }

  function scorri(array, dimensione) {
    // [0, 2, 2, 2] => [2, 2, 2] => [4, 0, 2] => [4, 2] => [4, 2, 0, 0]
    function filtraVuoti(a) {
      return a.filter(x => x != 0);
    }

    array = filtraVuoti(array);
    if (array.length > 0) {
      for (var i = 0; i < array.length - 1; i++) {
        if (array[i] == array[i + 1]) {
          array[i] *= 2;
          array[i + 1] = 0;
        }
      }
    }
    array = filtraVuoti(array);
    while (array.length < dimensione) {
      array.push(0);
    }
    return array;
  }

  // Scorre un array di valori e combina le celle uguali, spostandole tutte a sinistra
  function scorriSinistra() {
    var cambiato = false; // Variabile per tracciare se è avvenuto un cambiamento nelle celle
    for (var y = 0; y < dimensione; y++) { // Scorre le righe della griglia
      var vecchia = Array.from(celle[y]); // Crea una copia dell'array di celle corrente
      celle[y] = scorri(celle[y], dimensione); // Applica la funzione scorri() per spostare le celle a sinistra
      cambiato = cambiato || (celle[y].join(',') != vecchia.join(',')); // Verifica se le celle sono cambiate
    }
    return cambiato; // Restituisce true se è avvenuto un cambiamento, altrimenti false
  }

  // Scambia il valore di due celle nelle posizioni (x1, y1) e (x2, y2)
  function scambia(x1, y1, x2, y2) {
    var tmp = celle[y1][x1]; // Memorizza temporaneamente il valore della prima cella
    celle[y1][x1] = celle[y2][x2]; // Assegna il valore della seconda cella alla prima
    celle[y2][x2] = tmp; // Assegna il valore memorizzato alla seconda cella
  }

  // Riflette la griglia rispetto a un asse verticale, scambiando le celle simmetriche
  function specchio() {
    for (var y = 0; y < dimensione; y++) { // Scorre le righe della griglia
      for (var xSinistra = 0, xDestra = dimensione - 1; xSinistra < xDestra; xSinistra++, xDestra--) {
        // Scambia il valore delle celle simmetriche rispetto all'asse verticale
        scambia(xSinistra, y, xDestra, y);
      }
    }
  }

  // Trasponi la griglia scambiando le righe con le colonne
  function trasponi() {
    for (var y = 0; y < dimensione; y++) { // Scorre le righe della griglia
      for (var x = 0; x < y; x++) {
        // Scambia il valore delle celle tra la riga e la colonna corrispondenti
        scambia(x, y, y, x);
      }
    }
  }

  // Muove tutte le celle verso sinistra applicando la funzione scorriSinistra()
  function muoviSinistra() {
    return scorriSinistra(); // Restituisce true se ci sono state mosse valide, altrimenti false
  }

  // Muove tutte le celle verso destra riflettendo la griglia, applicando la funzione scorriSinistra() e riflettendo nuovamente
  function muoviDestra() {
    specchio(); // Riflette la griglia
    var cambiato = muoviSinistra(); // Applica muoviSinistra() (sposta tutto a sinistra)
    specchio(); // Riflette nuovamente per riportare alla posizione originale
    return cambiato; // Restituisce true se ci sono state mosse valide, altrimenti false
  }

  // Muove tutte le celle verso l'alto trasponendo la griglia, applicando muoviSinistra(), e trasponendo nuovamente
  function muoviSu() {
    trasponi(); // Trasponi la griglia (righe diventano colonne e viceversa)
    var cambiato = muoviSinistra(); // Applica muoviSinistra() (sposta tutto a sinistra)
    trasponi(); // Trasponi nuovamente per riportare alla posizione originale
    return cambiato; // Restituisce true se ci sono state mosse valide, altrimenti false
  }
  function muoviGiù() {
    trasponi(); // Trasponi la griglia (righe diventano colonne e viceversa)
    var cambiato = muoviDestra(); // Applica muoviDestra() (sposta tutto a destra)
    trasponi(); // Trasponi nuovamente per riportare alla posizione originale
    return cambiato; // Restituisce true se ci sono state mosse valide, altrimenti false
  }

  function èGameOver() {
    // Verifica la presenza di celle vuote disponibili
    for (var y = 0; y < dimensione; y++) {
      for (var x = 0; x < dimensione; x++) {
        if (celle[y][x] == 0) {
          return false;
        }
      }
    }

    // Verifica la presenza di abbinamenti possibili in orizzontale e verticale
    for (var y = 0; y < dimensione; y++) {
      for (var x = 0; x < dimensione; x++) {
        var valoreCella = celle[y][x];
        if (
          (y < dimensione - 1 && celle[y + 1][x] == valoreCella) ||
          (x < dimensione - 1 && celle[y][x + 1] == valoreCella)
        ) {
          return false;
        }
      }
    }

    return true;
  }
  // Gestisci il click sul pulsante su
  document.getElementById("up-button").addEventListener("click", function() {
    muoviSu();
    generaInCellaVuota();
    disegna();
  });
  // Gestisci il click sul pulsante destra
  document.getElementById("right-button").addEventListener("click", function() {
    muoviDestra();
    generaInCellaVuota();
    disegna();
  });
  // Gestisci il click sul pulsante giù
  document.getElementById("down-button").addEventListener("click", function() {
    muoviGiù();
    generaInCellaVuota();
    disegna();
  });
  // Gestisci il click sul pulsante sinistra
  document.getElementById("left-button").addEventListener("click", function() {
    muoviSinistra();
    generaInCellaVuota();
    disegna();
  });
  //gestisci pulsanti da tastiera
  document.addEventListener('keydown', function(e) {
    var codice = e.keyCode;
    var ok;
    switch (codice) {
      case 40: ok = muoviGiù(); break;
      case 38: ok = muoviSu(); break;
      case 37: ok = muoviSinistra(); break;
      case 39: ok = muoviDestra(); break;
      default: return;
    }
    if (ok) {
      generaInCellaVuota();
      disegna();
    }
    if (èGameOver()) {
      setTimeout(function() {
        alert('Partita terminata');
        document.getElementById("start-button").hidden = false;
        document.getElementById("field").hidden = true;
      }, 1000);
    }
  });
  // Funzione per inizializzare il gioco
  function inizializza() {
    creaCampo(); // Crea il campo di gioco
    creaCelle(); // Crea l'array bidimensionale per i valori delle celle
    new Array(2).fill(0).forEach(generaInCellaVuota); // Genera 2 valori nelle celle vuote
    document.getElementById("field").hidden = false;
    disegna(); // Disegna la griglia di gioco
  }

  // Gestisci il click sul pulsante di avvio del gioco
  document.getElementById("start-button").addEventListener("click", function() {
    this.hidden = true;
    // Avvia il gioco chiamando la funzione di inizializzazione
    inizializza();
  });
});