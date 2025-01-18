document.addEventListener("DOMContentLoaded", function() {
  const caroselloContainer = document.querySelector(".carosello");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  let index = 0;

  const immagini = [
    { src: "immagini/ancona.jpg", nome: "Ancona", link:"https://www.comuneancona.it/" },
    { src: "immagini/aosta.jpg", nome: "Aosta", link:"https://www.comune.aosta.it/it" },
    { src: "immagini/aquila.jpg", nome: "L'Aquila", link:"https://www.comune.laquila.it/" },
    { src: "immagini/bari.jpg", nome: "Bari", link:"https://www.comune.bari.it/" },
    { src: "immagini/bologna.jpg", nome: "Bologna", link:"https://www.comune.bologna.it/" },
    { src: "immagini/cagliari.jpg", nome: "Cagliari", link:"https://www.comune.cagliari.it/" },
    { src: "immagini/campobasso.jpg", nome: "Campobasso", link:"https://www.comune.campobasso.it/" },
    { src: "immagini/catanzaro.jpg", nome: "Catanzaro", link:"https://www.comune.catanzaro.it/" },
    { src: "immagini/firenze.jpg", nome: "Firenze", link:"https://www.comune.firenze.it/" },
    { src: "immagini/genova.jpg", nome: "Genova", link:"https://www.comune.genova.it/" },
    { src: "immagini/milano.jpg", nome: "Milano", link:"https://www.comune.milano.it/" },
    { src: "immagini/napoli.jpg", nome: "Napoli", link:"https://www.comune.napoli.it/" },
    { src: "immagini/palermo.jpg", nome: "Palermo", link:"https://www.comune.palermo.it/" },
    { src: "immagini/perugia.jpg", nome: "Perugia", link:"https://www.comune.perugia.it/" },
    { src: "immagini/potenza.jpg", nome: "Potenza", link:"https://www.comune.potenza.it/" },
    { src: "immagini/roma.jpg", nome: "Roma", link:"https://www.comune.roma.it/" },
    { src: "immagini/torino.jpg", nome: "Torino", link:"https://www.comune.torino.it/" },
    { src: "immagini/trento.jpg", nome: "Trento", link:"https://www.comune.trento.it/" },
    { src: "immagini/trieste.jpg", nome: "Trieste", link:"https://www.comune.trieste.it/" },
    { src: "immagini/venezia.jpg", nome: "Venezia", link:"https://www.comune.venezia.it/" }
  ];

  //inserisco le immagini nei container
  for (let idx = 0; idx < immagini.length; idx++) {
    const immagine = immagini[idx];
    const divFoto = document.createElement("div");
    divFoto.classList.add("foto");
    if (idx === 0){ 
      divFoto.style.opacity = "1"; // Mostro solo la prima posizione
      divFoto.style.zIndex = "1";
    }
    divFoto.innerHTML = `
      <img src="${immagine.src}" alt="${immagine.nome}">
      <div class="nome">${immagine.nome}</div>
    `;
    divFoto.addEventListener("click", function() {
      window.open(immagine.link, "_blank");
    });
    caroselloContainer.appendChild(divFoto);
  }

  prevButton.addEventListener("click", function() {
    index = (index - 1 + immagini.length) % immagini.length;
    updateView();
  });

  nextButton.addEventListener("click", function() {
    index = (index + 1) % immagini.length;
    updateView();
  });

  function updateCarosello() {
    const fotoItems = document.querySelectorAll(".carosello .foto");
    fotoItems.forEach((item, idx) => {
      if (idx === index) {
        item.style.opacity = "1";
        item.style.zIndex = "1";
      } else {
        item.style.opacity = "0";       
        item.style.zIndex = "-1";
      }
    });
  }

  function uptadeContatore() {
    const currentSpan = document.getElementById("current");
    const totalSpan = document.getElementById("total");
    currentSpan.textContent = index + 1;
    totalSpan.textContent = immagini.length;
  }

  function updateView(){
    updateCarosello();
    uptadeContatore();
  }

});
