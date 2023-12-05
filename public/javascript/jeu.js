let token = localStorage.getItem("token");
if (token == "0") {
    localStorage.setItem("token", "1");
    location.reload();
}
else {

    setTimeout(function() {
        document.getElementById("contenu").classList.remove("contenu");
        document.getElementById("contenu").classList.add("fadeout");
    }, 5000);

    setTimeout(function() {
        document.getElementById("contenu").style.opacity = "0";
    }, 10000);

    let music = new Audio('/mp3/jeu.mp3');
    let effet = new Audio('/mp3/effet_click.mp3');

    let storageMusique = localStorage.getItem('volume-musique');
    let storageEffet = localStorage.getItem('volume-effet');
    let storageStatus = localStorage.getItem("volume-status");

    let userAgent = navigator.userAgent;
    let resultat = userAgent.includes("Firefox");

    volumeStorage()

    if (resultat == true) {
        if (storageStatus == "false") {
            music.volume = 0;
            effet.volume = 0;
            document.getElementById("status-volume-off").style.display = "block";
            startMusic();
        }
        else {
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

    document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
        keyCode(e)
    })

    function keyCode(e) {
        var x = e.keyCode;
        if (x == 27) {
            let optionsElem = document.getElementById("options");
            if (window.getComputedStyle(optionsElem, null).display == "none") {
                optionsElem.style.display = "flex";
            }
            else {
                optionsElem.style.display = "none";
                document.getElementById("main-menu").style.display = "block";
                document.getElementById("options-menu").style.display = "none";
                document.getElementById("audio-menu").style.display = "none";
                document.getElementById("profil-menu").style.display = "none";
            }
        }
    }

    let elem = document.getElementsByClassName("bg");
    let length = elem.length;
    for (let i = 0; i < length; i++) {
        elem[i].addEventListener("mouseenter", () => {
            effet.play();
        })
    }

    function volumeStorage() {
        let storageMusique = localStorage.getItem('volume-musique');
        let storageEffet = localStorage.getItem('volume-effet');

        music.volume = storageMusique;
        effet.volume = storageEffet;

        document.getElementById("volume-music").value = storageMusique * 10;
        document.getElementById("volume-effect").value = storageEffet * 10;
    }

    document.getElementById("volume-music").addEventListener("input", (e) => {
        let value = e.target.value;
        music.volume = value / 10;
        localStorage.setItem("volume-musique", value / 10);
    })

    document.getElementById("volume-effect").addEventListener("input", (e) => {
        let value = e.target.value;
        effet.volume = value / 10;
        localStorage.setItem("volume-effet", value / 10);
    })

    document.getElementById("option-button").addEventListener("click", () => {
        document.getElementById("options-menu").style.display = "block";
        document.getElementById("main-menu").style.display = "none";
    })

    document.getElementById("retour-option").addEventListener("click", () => {
        document.getElementById("options-menu").style.display = "none";
        document.getElementById("main-menu").style.display = "block";
    })

    document.getElementById("audio-button").addEventListener("click", () => {
        document.getElementById("audio-menu").style.display = "block";
        document.getElementById("options-menu").style.display = "none";
    })

    document.getElementById("retour-audio").addEventListener("click", () => {
        document.getElementById("options-menu").style.display = "block";
        document.getElementById("audio-menu").style.display = "none";
    })

    document.getElementById("profil-button").addEventListener("click", () =>{
        document.getElementById("options-menu").style.display = "none";
        document.getElementById("profil-menu").style.display = "block";
    })

    document.getElementById("retour-profil").addEventListener("click", () =>{
        document.getElementById("options-menu").style.display = "block";
        document.getElementById("profil-menu").style.display = "none";
    })

    document.getElementById("reprendre-partie").addEventListener("click", () => {
        document.getElementById("options").style.display = "none";
        document.getElementById("main-menu").style.display = "block";
        document.getElementById("options-menu").style.display = "none";
        document.getElementById("audio-menu").style.display = "none";
    })

    document.getElementById("quitter-button").addEventListener("click", () => {
        location.href = "/";
    })
}