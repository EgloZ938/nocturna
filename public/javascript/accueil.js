let unconnected = document.getElementById("unconnected");
if (unconnected !== null) {
    location.href = "/register/connexion";
}

let connected = localStorage.getItem("token");
if (connected == "0") {
    localStorage.setItem("token", "1");
    location.reload();
}
else {

    let music = new Audio('/mp3/accueil.mp3');
    let effet = new Audio('/mp3/effet_click.mp3');

    let storageMusique = localStorage.getItem('volume-musique');
    let storageEffet = localStorage.getItem('volume-effet');
    let storageStatus = localStorage.getItem("volume-status");

    let userAgent = navigator.userAgent;
    let resultat = userAgent.includes("Firefox");

    if (resultat == true) {
        let param = "none";
        audioMusique(param);
        if (storageStatus == "false") {
            music.volume = 0;
            effet.volume = 0;
            document.getElementById("status-volume-off").style.display = "block";
        }
        else {
            document.getElementById("status-volume-on").style.display = "block";
        }
    }
    else {
        document.getElementById("status-volume-off").style.display = "block";
    }


    window.addEventListener("load", () => {
        if (storageMusique == null) {
            localStorage.setItem("volume-musique", "1");
        }
        if (storageEffet == null) {
            localStorage.setItem("volume-effet", "1");
        }
        if (storageStatus == null) {
            if (resultat == true) {
                localStorage.setItem("volume-status", true);
            }
        }
        volumeStorage();
        let statusVolumeId = document.getElementById("status-volume-off");
        let display = window.getComputedStyle(statusVolumeId, null).display;
        if (display != "none") {
            music.volume = 0;
            effet.volume = 0;
        }
    });

    let statusVolume = document.getElementsByClassName("status-volume");
    let lengthV = statusVolume.length;
    for (let i = 0; i < lengthV; i++) {
        statusVolume[i].addEventListener("click", (e) => {
            let storageMusique = localStorage.getItem('volume-musique');
            let storageEffet = localStorage.getItem('volume-effet');

            let id = e.target.getAttribute("id");
            if (resultat == false) {
                music.play();
            }
            if (id == "status-volume-on") {
                e.target.style.display = "none";
                document.getElementById("status-volume-off").style.display = "block";
                music.volume = 0;
                effet.volume = 0;
                localStorage.setItem("volume-status", false);
            }
            else {
                e.target.style.display = "none";
                document.getElementById("status-volume-on").style.display = "block";
                music.volume = storageMusique;
                effet.volume = storageEffet;
                localStorage.setItem("volume-status", true);
            }
        })
    }

    let elem = document.getElementsByClassName("bg");
    let length = elem.length;
    for (let i = 0; i < length; i++) {
        elem[i].addEventListener("mouseenter", (e) => {
            mouseover(e);
        })
    }

    function mouseover(e) {
        audioEffet("none");
    }

    function audioMusique(param) {
        if (param == "none") {
            music.play();
        }
        else {
            let value = param / 10;
            music.volume = value;
        }

        music.addEventListener('ended', function () {
            music.currentTime = 0;
            music.play();
        }, false);

    }

    function audioEffet(param) {
        if (param == "none") {
            effet.play();
        }
        else {
            let value = param / 10;
            effet.volume = value;
        }
    }

    function volumeStorage() {
        let storageMusique = localStorage.getItem('volume-musique');
        let storageEffet = localStorage.getItem('volume-effet');

        music.volume = storageMusique;
        effet.volume = storageEffet;

        document.getElementById("volume-music").value = storageMusique * 10;
        document.getElementById("volume-effect").value = storageEffet * 10;
    }

    document.getElementById("option-button").addEventListener("click", () => {
        let elemOption = document.getElementById("options-menu");
        let elemMenu = document.getElementById("main-menu");
        let logo = document.getElementById("logo");
        let container = document.getElementsByClassName("container")[0];
        elemOption.style.display = "block";
        elemMenu.style.display = "none";
        logo.style.display = "none";
        container.style.marginTop = "0px";
    })

    document.getElementById("retour-option").addEventListener("click", () => {
        let elemOption = document.getElementById("options-menu");
        let elemMenu = document.getElementById("main-menu");
        let logo = document.getElementById("logo");
        let container = document.getElementsByClassName("container")[0];
        elemOption.style.display = "none";
        elemMenu.style.display = "block";
        logo.style.display = "block";
        container.style.marginTop = "150px";
    })

    document.getElementById("audio-button").addEventListener("click", () => {
        let elemAudio = document.getElementById("audio-menu");
        let elemOption = document.getElementById("options-menu");
        elemAudio.style.display = "block";
        elemOption.style.display = "none";
    })

    document.getElementById("retour-audio").addEventListener("click", () => {
        let elemAudio = document.getElementById("audio-menu");
        let elemOption = document.getElementById("options-menu");
        elemAudio.style.display = "none";
        elemOption.style.display = "block";
    })

    document.getElementById("volume-music").addEventListener("input", (e) => {
        let param = e.target.value;
        audioMusique(param);
        localStorage.setItem("volume-musique", param / 10);
    })

    document.getElementById("volume-effect").addEventListener("input", (e) => {
        let param = e.target.value;
        audioEffet(param);
        localStorage.setItem("volume-effet", param / 10);
    })

    document.getElementById("profil-button").addEventListener("click", () => {
        let elemProfil = document.getElementById("profil-menu");
        let elemOption = document.getElementById("options-menu");
        elemProfil.style.display = "block";
        elemOption.style.display = "none";
    })

    document.getElementById("retour-profil").addEventListener("click", () => {
        let elemProfil = document.getElementById("profil-menu");
        let elemOption = document.getElementById("options-menu");
        elemProfil.style.display = "none";
        elemOption.style.display = "block";
    })

    if (document.getElementById("nouvelle-partie") !== null) {
        document.getElementById("nouvelle-partie").addEventListener("click", () => {
            location.href = "/personnage/new";
        })
    }
    else {
        document.getElementById("partie-existante").addEventListener("click", () => {
            document.getElementById("alert").style.display = "flex";
            document.getElementById("menu").style.display = "none";
        })
        document.getElementById("button-annuler").addEventListener("click", () => {
            document.getElementById("menu").style.display = "block";
            document.getElementById("alert").style.display = "none";
        })
        document.getElementById("button-continuer").addEventListener("click", () => {
            location.href = "/personnage/new";
        })
    }
    if (document.getElementById("gamemaster-button") !== null) [
        document.getElementById("gamemaster-button").addEventListener("click", () => {
            location.href = "/gamemaster/index";
        })
    ]
    if (document.getElementById("continuer-partie") !== null) {
        document.getElementById("continuer-partie").addEventListener("click", () => {
            location.href = "/jeu/cinematic";
        })
    }
}
