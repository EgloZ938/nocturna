let music = new Audio('/mp3/personnages.mp3');
let effet = new Audio('/mp3/effet_click.mp3');

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

let id = document.getElementsByClassName("hidden")[0].innerHTML;
document.getElementById("personnage_user_id").value = id;

for(let i = 0; i < length; i++){
    classe[i].addEventListener("click", (e) =>{
        effet.play();
        let id = e.target.getAttribute("id");
        let inputAvatar = document.getElementById("personnage_avatar");
        let inputClasse = document.getElementById("personnage_classe");
        let inputAvatarUnlock = document.getElementById("personnage_avatar_unlock");
        let inputForce = document.getElementById("personnage_force");
        let inputExp = document.getElementById("personnage_exp_joueur");
        inputExp.value = "0";
        let inputInventaire = document.getElementById("personnage_inventaire");
        inputInventaire.value = "vide";
        let inputSacADos = document.getElementById("personnage_sac_a_dos");
        inputSacADos.value = "15";
        let inputArgent = document.getElementById("personnage_argent");
        inputArgent.value = "0";
        let inputPv = document.getElementById("personnage_pv");
        let inputVitesse = document.getElementById("personnage_vitesse");
        removeScale();
        e.target.classList.add("scale");
        if(id == "avatar-1"){
            let classeJoueur = "archer";
            let cheminAvatar = "/images/1.jpg";
            inputAvatar.value = cheminAvatar;
            inputClasse.value = classeJoueur;
            inputAvatarUnlock.value = "1";
            inputForce.value = "300";
            inputPv.value = "1000";
            inputVitesse.value = "350";
        }
        else if(id == "avatar-3"){
            let classeJoueur = "assassin";
            let cheminAvatar = "/images/3.jpg";
            inputAvatar.value = cheminAvatar;
            inputClasse.value = classeJoueur;
            inputAvatarUnlock.value = "3";
            inputForce.value = "400";
            inputPv.value = "900";
            inputVitesse.value = "400";
        }
        else if(id == "avatar-5"){
            let classeJoueur = "chevalier";
            let cheminAvatar = "/images/5.jpg";
            inputAvatar.value = cheminAvatar;
            inputClasse.value = classeJoueur;
            inputAvatarUnlock.value = "5";
            inputForce.value = "300";
            inputPv.value = "1200";
            inputVitesse.value = "300";
        }
        else{
            let classeJoueur = "mage";
            let cheminAvatar = "/images/7.jpg";
            inputAvatar.value = cheminAvatar;
            inputClasse.value = classeJoueur;
            inputAvatarUnlock.value = "7";
            inputForce.value = "400";
            inputPv.value = "1000";
            inputVitesse.value = "350";
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

document.getElementById("submit").addEventListener("mouseenter", () =>{
    effet.play();
})