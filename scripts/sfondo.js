document.addEventListener("DOMContentLoaded", function() {
  // Creazione del canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var numsfere = 75;
  var line_length = 150;
  // Impostazione delle dimensioni del canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Creazione delle sfere
  var sfere = [];
  function Sfera(x, y, raggio, colore) {
    this.x = x;
    this.y = y;
    this.raggio = raggio;
    this.colore = colore;
    this.dx = Math.random() - 1; // Velocità orizzontale
    this.dy = Math.random() - 1; // Velocità verticale
    this.disegna = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.raggio, 0, Math.PI * 2);
      ctx.fillStyle = this.colore;
      ctx.fill();
      ctx.closePath();
    };
    this.aggiorna = function() {
      this.x += this.dx;
      this.y += this.dy;
      // Rimbalzo alle estremità del canvas
      if (this.x + this.raggio > canvas.width || this.x - this.raggio < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.raggio > canvas.height || this.y - this.raggio < 0) {
        this.dy = -this.dy;
      }
      this.disegna();
    };
  }
  // Generazione delle sfere
  //num_sfere = document.getElementById("num-sfere").value;
  for (var i = 0; i < numsfere; i++) {
    var raggio = Math.random() * 10 + 5;
    var x = Math.random() * (canvas.width - raggio * 2) + raggio;
    var y = Math.random() * (canvas.height - raggio * 2) + raggio;
    var colore = "rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")";
    sfere.push(new Sfera(x, y, raggio, colore));
  }
  // Funzione per rilevare le collisioni tra le sfere
  function controllaCollisioni() {
    for (var i = 0; i < sfere.length; i++) {
      for (var j = i + 1; j < sfere.length; j++) {
        var dx = sfere[i].x - sfere[j].x;
        var dy = sfere[i].y - sfere[j].y;
        var distanza = Math.sqrt(dx * dx + dy * dy);
        if (distanza < sfere[i].raggio + sfere[j].raggio) {
          //cambio colore
          sfere[i].colore = "rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")";
          sfere[j].colore = "rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")";
          // Collisione rilevata, calcola il vettore di direzione tra le sfere
          var vettoreCollisione = {
            x: sfere[i].x - sfere[j].x,
            y: sfere[i].y - sfere[j].y
          };
          // Normalizzazione del vettore di direzione
          var lunghezza = Math.sqrt(vettoreCollisione.x * vettoreCollisione.x + vettoreCollisione.y * vettoreCollisione.y);
          vettoreCollisione.x /= lunghezza;
          vettoreCollisione.y /= lunghezza;
          // Inversione delle direzioni delle sfere
          sfere[i].dx = vettoreCollisione.x;
          sfere[i].dy = vettoreCollisione.y;
          sfere[j].dx = -vettoreCollisione.x;
          sfere[j].dy = -vettoreCollisione.y;
        }
      }
    }
  }
  // Funzione per disegnare le linee tra le sfere vicine
  function disegnaLinee() {
    for (var i = 0; i < sfere.length; i++) {
      var sferaA = sfere[i];
      for (var j = 0; j < sfere.length; j++) {
        if (i !== j) {
          var sferaB = sfere[j];
          var dx = sferaA.x - sferaB.x;
          var dy = sferaA.y - sferaB.y;
          var distanza = Math.sqrt(dx * dx + dy * dy);
          if (distanza < line_length) { // Connetti solo le sfere entro una certa distanza
            ctx.beginPath();
            ctx.moveTo(sferaA.x, sferaA.y);
            ctx.lineTo(sferaB.x, sferaB.y);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }
  
  // Funzione per l'animazione
  function anima() {
    requestAnimationFrame(anima);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < sfere.length; i++) {
      sfere[i].aggiorna();
    }
    controllaCollisioni();
    disegnaLinee(); // Disegna le linee tra le sfere
  }
  // Avvio dell'animazione
  anima();
  // Gestione del ridimensionamento della finestra
  window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});