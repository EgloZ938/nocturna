let music = new Audio('/mp3/register.mp3');
let effet = new Audio('/mp3/effet_click.mp3');

let elem = document.getElementsByClassName("focus");
let lengthElem = elem.length;

for (let i = 0; i < lengthElem; i++) {
    elem[i].addEventListener("focus", () => {
        effet.play();
    })
}

let storageMusique = localStorage.getItem('volume-musique');
let storageEffet = localStorage.getItem('volume-effet');
let storageStatus = localStorage.getItem("volume-status");

let userAgent = navigator.userAgent;
let resultat = userAgent.includes("Firefox");


if (resultat == true) {
    if(storageStatus == "false"){
        music.volume = 0;
        effet.volume = 0;
        document.getElementById("status-volume-off").style.display = "block";
        startMusic();
    }
    else{
        document.getElementById("status-volume-on").style.display = "block";
        music.volume = storageMusique;
        effet.volume = storageEffet;
        startMusic();
    }
}
else {
    document.getElementById("status-volume-off").style.display = "block";
}


let statusVolume = document.getElementsByClassName("status-volume");
let lengthV = statusVolume.length;
for (let i = 0; i < lengthV; i++) {
    statusVolume[i].addEventListener("click", (e) => {

        let id = e.target.getAttribute("id");
        if (resultat == false) {
            music.play();
        }
        if (id == "status-volume-on") {
            e.target.style.display = "none";
            document.getElementById("status-volume-off").style.display = "block";
            music.volume = 0;
            effet.volume = 0;
            localStorage.setItem("volume-status", "false");
        }
        else {
            e.target.style.display = "none";
            document.getElementById("status-volume-on").style.display = "block";
            music.volume = storageMusique;
            effet.volume = storageEffet;
            localStorage.setItem("volume-status", "true");
        }
    })
}



function startMusic() {
    music.play();

    music.addEventListener('ended', function () {
        music.currentTime = 0;
        music.play();
    }, false);
}


let redirect = document.getElementById("redirect-register");
if(redirect == null){
    let redirect = document.getElementById("redirect-login");
    redirect.addEventListener("click", () =>{
        window.location.href = "/register/connexion";
    })
}
else{
    redirect.addEventListener("click", () =>{
        window.location.href = "/register/new";
    })
}

document.getElementsByTagName("form")[0].addEventListener("submit", () =>{
    localStorage.setItem("token","0");
})