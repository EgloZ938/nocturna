let music = new Audio('https://evarthel.com/mp3/beyond-new-horizons-free-epic-viking-medieval-soundtrack-22081.mp3');
let effet = new Audio('https://evarthel.com/mp3/click-button-140881-%5bAudioTrimmer.com%5d(1).mp3');

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


let classe = document.getElementsByClassName("avatar");
let length = classe.length;

for(let i = 0; i < length; i++){
    classe[i].addEventListener("click", (e) =>{
        effet.play();
        let id = e.target.getAttribute("id");
        let inputAvatar = document.getElementById("avatar");
        let inputClasse = document.getElementById("classe");
        removeScale();
        e.target.classList.add("scale");
        if(id == "avatar-1"){
            let classeJoueur = "archer";
            let cheminAvatar = "/images/1.jpg";
            inputAvatar.value = cheminAvatar;
            inputClasse.value = classeJoueur;
        }
        else if(id == "avatar-3"){
            let classeJoueur = "assassin";
            let cheminAvatar = "/images/3.jpg";
            inputAvatar.value = cheminAvatar;
            inputClasse.value = classeJoueur;
        }
        else if(id == "avatar-5"){
            let classeJoueur = "chevalier";
            let cheminAvatar = "/images/5.jpg";
            inputAvatar.value = cheminAvatar;
            inputClasse.value = classeJoueur;
        }
        else{
            let classeJoueur = "mage";
            let cheminAvatar = "/images/7.jpg";
            inputAvatar.value = cheminAvatar;
            inputClasse.value = classeJoueur;
        }
    })
}

function removeScale(){
    for(let i = 0; i < length; i++){
        classe[i].classList.remove("scale");
    }
}

document.getElementById("retourPrincipal").addEventListener("click", () =>{
    location.href = "/";
})