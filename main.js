//Defineixo les variables
let paraulaPenjat = "";
let paraulaSecreta = "";
let intentsFallits = 0;
let puntsPartida = 0;

//Defineixo els objectes de jugadors
let jugador1 = {
    puntsActuals: 0,
    totalPartides: 0,
    partidesGuanyades: 0,
    millorPartida: 0,
    dataMillorPartida: ""
};

let jugador2 = {
    puntsActuals: 0,
    totalPartides: 0,
    partidesGuanyades: 0,
    millorPartida: 0,
    dataMillorPartida: ""
};

let tornJugador = 1;

const mostrar = () => {
    let paraulaInput = document.getElementById("paraula");
    let buttonEye = document.getElementById("eye");

    if (paraulaInput.type == "password") {
        paraulaInput.type = "text";
        buttonEye.textContent = "🔒";
    } else {
        paraulaInput.type = "password";
        buttonEye.textContent = "👁️";
    }
}

const comprovarParaula = () => {
    paraulaSecreta = document.getElementById("paraula").value.toUpperCase();

    if (paraulaSecreta === "") {
        alert("Si us plau, introdueix una paraula :)");
    } else if (/\d/.test(paraulaSecreta) || paraulaSecreta.includes(" ")) {
        alert("Introdueix una paraula sense números ni espais :)");
    } else if (paraulaSecreta.length <= 3) {
        alert("Introdueix una paraula de més de 3 caràcters");
    } else {
        comencarPartida();
    }
}

const comencarPartida = () => {
    let paraulaPenjatTitol = document.getElementById("title");
    paraulaPenjat = "_ ".repeat(paraulaSecreta.length).trim();
    intentsFallits = 0;
    puntsPartida = 0;
    actualitzarPenjat();
    paraulaPenjatTitol.textContent = paraulaPenjat;
    tornJugador = 1;  // Reinicia perquè el jugador 1 comenci la partida
}

const provarLletra = (button) => {
    let lletraProvada = button.textContent;
    button.disabled = true;

    if (paraulaPenjat.includes("_")) {
        let paraulaActualitzada = "";
        let encert = false;

        for (let i = 0; i < paraulaSecreta.length; i++) {
            if (paraulaSecreta[i] === lletraProvada) {
                paraulaActualitzada += lletraProvada + " ";
                encert = true;
                if (tornJugador === 1) {
                    jugador1.puntsActuals += 10;  
                } else {
                    jugador2.puntsActuals += 10;
                }
            } else {
                paraulaActualitzada += paraulaPenjat[i * 2] + " ";
            }
        }

        paraulaPenjat = paraulaActualitzada.trim();
        document.getElementById("title").textContent = paraulaPenjat;

        if (!encert) {
            intentsFallits++;
            button.style.backgroundColor = "red";
            actualitzarPenjat();
            tornJugador = tornJugador === 1 ? 2 : 1; 
        }

        if (intentsFallits === 10) {
            alert("Game Over! La paraula era: " + paraulaSecreta);
            determinarGuanyador();
            reiniciarPartida();
        } else if (!paraulaPenjat.includes("_")) {
            alert("Felicitats! Has endevinat la paraula!");
            determinarGuanyador();
            reiniciarPartida();
        }
    }
}

const determinarGuanyador = () => {
    let haGuanyatJugador1 = jugador1.puntsActuals > jugador2.puntsActuals;
    let dataActual = new Date();
    let dataFormatejada = dataActual.toLocaleString();

    if (haGuanyatJugador1) {
        jugador1.partidesGuanyades += 1;
        if (jugador1.puntsActuals > jugador1.millorPartida) {
            jugador1.millorPartida = jugador1.puntsActuals;
            jugador1.dataMillorPartida = dataFormatejada;
        }
    } else {
        jugador2.partidesGuanyades += 1;
        if (jugador2.puntsActuals > jugador2.millorPartida) {
            jugador2.millorPartida = jugador2.puntsActuals;
            jugador2.dataMillorPartida = dataFormatejada;
        }
    }

    jugador1.totalPartides += 1;
    jugador2.totalPartides += 1;

    mostrarEstadistiques();
}

const mostrarEstadistiques = () => {
    document.getElementById("punts-jugador1").textContent = jugador1.puntsActuals;
    document.getElementById("partides-jugador1").textContent = jugador1.totalPartides;
    document.getElementById("partides-guanyades-jugador1").textContent = jugador1.partidesGuanyades;
    document.getElementById("millor-partida-jugador1").textContent = `${jugador1.millorPartida} (${jugador1.dataMillorPartida})`;

    document.getElementById("punts-jugador2").textContent = jugador2.puntsActuals;
    document.getElementById("partides-jugador2").textContent = jugador2.totalPartides;
    document.getElementById("partides-guanyades-jugador2").textContent = jugador2.partidesGuanyades;
    document.getElementById("millor-partida-jugador2").textContent = `${jugador2.millorPartida} (${jugador2.dataMillorPartida})`;
}

const actualitzarPenjat = () => {
    let imgPath = `./assets/penjat_${intentsFallits}.jpg`;
    document.querySelector(".c-penjat__contingut-img").src = imgPath;
}

const reiniciarPartida = () => {
    document.getElementById("paraula").value = "";
    paraulaPenjat = "";
    paraulaSecreta = "";
    intentsFallits = 0;
    document.getElementById("title").textContent = "Començar Partida";
    document.querySelector(".c-penjat__contingut-img").src = "./assets/penjat_0.jpg";
    let botonsLletres = document.querySelectorAll(".c-penjat__lletra");
    botonsLletres.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = ""; 
    });
    jugador1.puntsActuals = 0;
    jugador2.puntsActuals = 0;
    tornJugador = 1;
}
