// Luciérnagas
const NUM_LUCIERNAGAS = 40;
for (let i = 0; i < NUM_LUCIERNAGAS; i++) {
  const firefly = document.createElement("div");
  firefly.classList.add("firefly");
  firefly.style.left = Math.random() * 100 + "vw";
  firefly.style.top = Math.random() * 100 + "vh";
  firefly.style.animationDuration = 4 + Math.random() * 6 + "s";
  firefly.style.animationDelay = Math.random() * 5 + "s";
  document.body.appendChild(firefly);
}

  const NUM_ESTRELLAS = 30;
  for (let i = 0; i < NUM_ESTRELLAS; i++) {
    const star = document.createElement("div");
    star.classList.add("stars");
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.animationDuration = 1 + Math.random() * 2 + "s";
    document.body.appendChild(star);
  }


// Galería automática
const fotos = [
  "images/dd4.jpg",
  "images/dd9.jpg",
  "images/dd13.jpg",
  "images/dd8.jpg",
  "images/dd2.jpg"

];
let indice = 0;
const imgGaleria = document.getElementById("foto-galeria");

function cambiarFoto(direccion) {
  indice = (indice + direccion + fotos.length) % fotos.length;
  imgGaleria.classList.add("fade");
  setTimeout(() => {
    imgGaleria.src = fotos[indice];
    imgGaleria.classList.remove("fade");
  }, 300);
}
setInterval(() => cambiarFoto(1), 5000);

// Contador regresivo
const fechaObjetivo = new Date("2025-08-15T17:30:00").getTime();

function actualizarContador() {
  const ahora = Date.now();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    document.getElementById("cuenta-regresiva").innerHTML = "¡Hoy es el gran día!";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
  document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
  document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");
}

setInterval(actualizarContador, 1000);
actualizarContador();

// Lightbox galería expandible
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const cerrarLightbox = document.getElementById("cerrar-lightbox");
const prevBtn = document.getElementById("prev-lightbox");
const nextBtn = document.getElementById("next-lightbox");

const todasFotosExpandibles = Array.from(document.querySelectorAll(".expandible"));
let indexLightbox = 0;

function abrirLightbox(idx) {
  indexLightbox = idx;
  lightbox.style.display = "flex";
  lightboxImg.src = todasFotosExpandibles[indexLightbox].src;
}

function cerrar() {
  lightbox.style.display = "none";
}

function fotoAnterior() {
  indexLightbox = (indexLightbox - 1 + todasFotosExpandibles.length) % todasFotosExpandibles.length;
  lightboxImg.src = todasFotosExpandibles[indexLightbox].src;
}

function fotoSiguiente() {
  indexLightbox = (indexLightbox + 1) % todasFotosExpandibles.length;
  lightboxImg.src = todasFotosExpandibles[indexLightbox].src;
}

// Eventos
todasFotosExpandibles.forEach((img, i) => {
  img.addEventListener("click", () => abrirLightbox(i));
});
cerrarLightbox.addEventListener("click", cerrar);
prevBtn.addEventListener("click", fotoAnterior);
nextBtn.addEventListener("click", fotoSiguiente);

// Cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrar();
  if (e.key === "ArrowLeft") fotoAnterior();
  if (e.key === "ArrowRight") fotoSiguiente();
});

// Luciérnagas

// Mini juego
const numeroMagico = Math.floor(Math.random() * 10) + 1;
function adivinar() {
  const entrada = parseInt(document.getElementById("input-juego").value);
  const resultado = document.getElementById("resultado-juego");
  if (entrada === numeroMagico) {
    resultado.textContent = "¡Correcto! 🎉 Adivinaste el número mágico.";
  } else {
    resultado.textContent = "Ups, intenta de nuevo 🌟";
  }
}

const preguntas = [
  {
    pregunta: "¿Cuál es el color del vestido de la quinceañera?",
    respuestas: ["verde", "verde pistache", "verde cemento", "verde"] 
  },
  {
    pregunta: "¿En qué fecha es la fiesta?",
    respuestas: ["15 de agosto", "15/08", "15 agosto", "15-agosto"]
  },
  {
    pregunta: "¿Cómo se llama la quinceañera?",
    respuestas: ["Dulce", "dulce", "Dulce Maria", "dulce maria"]
  }
];

let indicePregunta = 0;

const preguntaElem = document.getElementById("pregunta-adivinanza");
const inputAdivinanza = document.getElementById("input-adivinanza");
const botonAdivinar = document.getElementById("boton-adivinar");
const mensajeAdivinanza = document.getElementById("mensaje-adivinanza");

function mostrarPregunta() {
  if (indicePregunta < preguntas.length) {
    preguntaElem.textContent = preguntas[indicePregunta].pregunta;
    inputAdivinanza.value = "";
    mensajeAdivinanza.textContent = "";
    // inputAdivinanza.focus(); ← COMÉNTALA O ELIMÍNALA
  }
}


function verificarRespuesta() {
  const respuestaUsuario = inputAdivinanza.value.trim().toLowerCase();

  if (preguntas[indicePregunta].respuestas.includes(respuestaUsuario)) {
    mensajeAdivinanza.textContent = "¡Correcto! 🎉";
    mensajeAdivinanza.classList.remove("incorrecto");
    mensajeAdivinanza.classList.add("correcto");

    inputAdivinanza.classList.remove("incorrecto");
    inputAdivinanza.classList.add("correcto");

    indicePregunta++;

    setTimeout(() => {
      inputAdivinanza.classList.remove("correcto");
      mensajeAdivinanza.classList.remove("correcto");
    }, 1000);

    if (indicePregunta < preguntas.length) {
      setTimeout(mostrarPregunta, 1500);
    } else {
      setTimeout(() => {
        mensajeAdivinanza.textContent = "¡Felicidades! Terminaste la trivia 🎉✨";
        botonAdivinar.disabled = true;
        inputAdivinanza.disabled = true;
      }, 1500);
    }
  } else {
    mensajeAdivinanza.textContent = "Respuesta incorrecta, intenta de nuevo 🌟";
    mensajeAdivinanza.classList.remove("correcto");
    mensajeAdivinanza.classList.add("incorrecto");

    inputAdivinanza.classList.remove("correcto");
    inputAdivinanza.classList.add("incorrecto");

    setTimeout(() => {
      inputAdivinanza.classList.remove("incorrecto");
      mensajeAdivinanza.classList.remove("incorrecto");
    }, 1000);
  }
}

botonAdivinar.addEventListener("click", verificarRespuesta);

// Para que se pueda presionar Enter en el input y verificar también
inputAdivinanza.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    verificarRespuesta();
  }
});

window.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bg-music");
  const toggleButton = document.getElementById("toggle-music");
  const icon = toggleButton.querySelector(".icono-musica");

  // Intenta reproducir de inmediato
  const playMusic = () => {
    audio.play().catch((error) => {
      console.log("Reproducción automática bloqueada, esperando clic del usuario");
    });
  };

  playMusic();

  // Botón de control
  toggleButton.addEventListener("click", function (e) {
    e.stopPropagation();

    if (audio.paused) {
      audio.play();
      icon.classList.replace("fa-play", "fa-pause");
    } else {
      audio.pause();
      icon.classList.replace("fa-pause", "fa-play");
    }
  });
});




// Mostrar la primera pregunta cuando cargue todo
document.addEventListener("DOMContentLoaded", mostrarPregunta);






document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".scroll-anim");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elementos.forEach(el => observer.observe(el));
});
