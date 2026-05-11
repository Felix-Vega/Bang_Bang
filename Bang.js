function jugar() {
    ponerBG();
    setTimeout(
        function() {
            window.location.assign("Personaje.html");
        },2000)
        var sfxStart = new Audio('sfx/start.m4a');
        sfxStart.play();
}

function ponerBG(){
    document.querySelector('.bg-transicion').classList.add('bg-transicion-show');
}

function quitarBG(){
    const overlay = document.querySelector('.bg-transicion');
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    overlay.style.pointerEvents = "none";
    setTimeout(
        function() {
            overlay.classList.remove('bg-transicion-show');
        },2000)
}

let personajeActual = 1;
function siguientePersonaje(){
    personajeActual++;
    if(personajeActual == 7){
        personajeActual = 1;
    }
    document.getElementById("personaje").src = "img/p"+personajeActual+".png"
    var sfxclick = new Audio('sfx/Moneda.m4a');
    sfxclick.play();
}

function anteriorPersonaje(){
    personajeActual--;
    if(personajeActual == 0){
        personajeActual = 6;
    }
    document.getElementById("personaje").src = "img/p"+personajeActual+".png"
    var sfxclick = new Audio('sfx/Moneda.m4a');
    sfxclick.play();

}


function personaje2(){
    localStorage.setItem("personaje1", personajeActual);
    localStorage.setItem("jugador1", document.getElementById("jugador1").value);

    ponerBG();
    setTimeout(
        function() {
            window.location.assign("Personaje2.html");
        },2000)
    var sfxStart = new Audio('sfx/Moneda.m4a');
    sfxStart.play();
}

function comenzarJuego(){
    localStorage.setItem("personaje2", personajeActual);
    localStorage.setItem("jugador2", document.getElementById("jugador2").value);

    ponerBG();
    setTimeout(
        function() {
            window.location.assign("Juego.html");
        },2000)
    var sfxStart = new Audio('sfx/start.m4a');
    sfxStart.play();
}

function cargarEscenario() {
    if(!localStorage.getItem("marcador1")){
        localStorage.setItem("marcador1", "0");
        localStorage.setItem("marcador2", "0");
        marcador1 = parseInt(localStorage.getItem("marcador1"));
        marcador2 = parseInt(localStorage.getItem("marcador2"));
    }else{
        marcador1 = parseInt(localStorage.getItem("marcador1"));
        marcador2 = parseInt(localStorage.getItem("marcador2"));
    }

    //Limpiador de calaveras
    document.querySelector('.vidas1').innerHTML = "";
    document.querySelector('.vidas2').innerHTML = "";
    //Contador de muertes
    for(let i=0; i<marcador1; i++){
        document.querySelector('.vidas2').innerHTML += "<img src='img/calavera.png'>";
    }
    for(let i=0; i<marcador2; i++){
        document.querySelector('.vidas1').innerHTML += "<img src='img/calavera.png'>";
    }

    //Ganador
    if(marcador1 >= 3 || marcador2 >= 3){
        document.querySelector('.ganador').style.display = "block";
        document.querySelector('.bg-juego').style.backgroundImage = "url('img/bg_personaje.png')";
        //Escondemos los personajes
        document.querySelector('#p1').style.display = "none";
        document.querySelector('#p2').style.display = "none";

        if(marcador1 >= 3){
            document.querySelector('#nombreganador').innerHTML = localStorage.getItem("jugador1");
            document.querySelector('#imgGanador').src = "img/p"+localStorage.getItem("personaje1")+".png";
        }else if(marcador2 >= 3){
            document.querySelector('#nombreganador ').innerHTML = localStorage.getItem("jugador2");
            document.querySelector('#imgGanador').src = "img/p"+localStorage.getItem("personaje2")+".png";
        }
        //Reiniciar el marcador
        localStorage.setItem("marcador1", "0");
        localStorage.setItem("marcador2", "0");

        marcador1 = 0;
        marcador2 = 0;

        document.querySelector('.vidas1').innerHTML = "";
        document.querySelector('.vidas2').innerHTML = "";

    }else{
        listos();

        document.querySelector('.ganador').style.display = "none";

        // VOLVER A MOSTRAR PERSONAJES
        document.querySelector('#p1').style.display = "block";
        document.querySelector('#p2').style.display = "block";

        let bg = Math.floor(Math.random() * 3) + 1;

        document.querySelector('.bg-juego').style.backgroundImage =
        `url('img/bg${bg}.png')`;

        document.querySelector('.bg-juego').style.backgroundSize = "cover";
        document.querySelector('.bg-juego').style.backgroundPosition = "center";
}

  let nombre1 = localStorage.getItem("jugador1");
  let nombre2 = localStorage.getItem("jugador2");

  let personaje1 = localStorage.getItem("personaje1");
  let personaje2 = localStorage.getItem("personaje2");

  let n1 = document.getElementById("nombre1");
  let n2 = document.getElementById("nombre2");
  let p1 = document.getElementById("p1");
  let p2 = document.getElementById("p2");

  //Los nombres de los personajes
  if (n1) n1.textContent = nombre1;
  if (n2) n2.textContent = nombre2;

  if (p1 && personaje1) p1.src = "img/p" + personaje1 + ".png";
  if (p2 && personaje2) p2.src = "img/p" + personaje2 + ".png";

  //Los personajes se ven
  if (p1) p1.style.transform = "scaleX(1)";
  if (p2) p2.style.transform = "scaleX(-1)";

}

function listos(){
    setTimeout(function() {
        document.querySelector('.msj').style.opacity = "1";
    }, 500);
}

function conteo(){
    var sfxclick = new Audio('sfx/Moneda.m4a');
    document.querySelector('.msj').style.opacity = "0";
    document.querySelector('.no3').style.opacity = "1";
    sfxclick.play();

    setTimeout(function() {
        document.querySelector('.no3').style.opacity = "0";
        document.querySelector('.no2').style.opacity = "1";
        sfxclick.play();

        setTimeout(function() {
            document.querySelector('.no2').style.opacity = "0";
            document.querySelector('.no1').style.opacity = "1";
            sfxclick.play();
            let tiempoRandom = (Math.floor(Math.random() * 3) + 1) * 500;

            setTimeout(function() {
                document.querySelector('.no1').style.opacity = "0";
                document.querySelector('.conteo').style.display = "none";
                sfxclick.play();
            }, tiempoRandom);
        }, 1000);
    }, 1000);
}

function disparo1(){
    console.log("disparo1");

    document.querySelector('.right').onclick = null;
    document.querySelector('.left').onclick = null;

    let p1 = document.querySelector('#p1');
    let p2 = document.querySelector('#p2');

    p2.style.right = "-800px";

    p1.style.left = "15%";

    setTimeout(function() {
        p1.style.left = "10%"; 
    }, 150);
    marcador1++;
    localStorage.setItem("marcador1", marcador1);
    setTimeout(function() {
        window.location.assign("Juego.html");
    }, 2000);

    var sfxDisparo = new Audio('sfx/Pium.m4a');
    sfxDisparo.play();
}

function disparo2(){
    console.log("disparo2");
    document.querySelector('.right').onclick = null;
    document.querySelector('.left').onclick = null;

    let p1 = document.querySelector('#p1');
    let p2 = document.querySelector('#p2');

    p2.style.right = "10px";

    p1.style.left = "-800px";

    setTimeout(function() {
        p2.style.right = "10%";
    }, 150);
    marcador2++;
    localStorage.setItem("marcador2", marcador2);
    setTimeout(function() {
        window.location.assign("Juego.html");
    }, 2000);

    var sfxDisparo = new Audio('sfx/Pium.m4a');
    sfxDisparo.play();
}

function restart(){
    localStorage.setItem("marcador1", "0");
    localStorage.setItem("marcador2", "0");

    document.querySelector('.bg-juego').style.backgroundImage =
    "url('img/bg_personaje.png')";

    document.querySelector('.ganador').style.display = "none";

    document.querySelector('.left').style.display = "block";
    document.querySelector('.right').style.display = "block";

    document.querySelector('#p1').style.display = "block";
    document.querySelector('#p2').style.display = "block";

    document.querySelector('.vidas1').innerHTML = "";
    document.querySelector('.vidas2').innerHTML = "";
}
