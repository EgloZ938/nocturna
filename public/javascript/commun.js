localStorage.getItem("token");
if (localStorage.getItem("token") == "0") {
    localStorage.setItem("token", "1");
    location.reload();
}
else {

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
            typeSound.volume = 0;
            document.getElementById("status-volume-off").style.display = "block";
            startMusic();
        }
        else {
            document.getElementById("status-volume-on").style.display = "block";
            music.volume = storageMusique;
            effet.volume = storageEffet;
            typeSound.volume = storageEffet;
            startMusic();
        }
    }
    else {
        document.getElementById("status-volume-off").style.display = "block";
    }

    document.getElementById("sac-a-dos").addEventListener("click", () => {
        effet.play();
        document.getElementById("inventaire").style.display = "flex";
    })

    document.getElementById("craft").addEventListener("click", () => {
        effet.play();
        document.getElementById("etable").style.display = "flex";
        let elementSource = document.getElementById("objets-craftables");
        let autreElement = document.getElementById("info-objets-craft");
        autreElement.style.minWidth = `${elementSource.offsetWidth}px`;
        autreElement.style.minHeight = `${elementSource.offsetHeight}px`;
    })


    let objet_craftable = document.getElementsByClassName("objet_craftable");
    let testDiv = document.getElementById("info-objets-craft");

    for (let i = 0; i < objet_craftable.length; i++) {
        objet_craftable[i].addEventListener("click", function (e) {
            localStorage.setItem("token", "0");
            localStorage.setItem("autoReload", "true");
            // Cacher tous les éléments craft-info
            let craft_info = document.getElementsByClassName("craft-info");
            for (let j = 0; j < craft_info.length; j++) {
                craft_info[j].style.display = "none";
            }

            // Identifier l'ID de l'élément cliqué
            let id = this.id;
            let craftInfoContent = document.getElementById("craft-info" + id);

            // Vider la div 'test' et y ajouter le contenu de craft-info
            testDiv.innerHTML = '';
            if (craftInfoContent) {
                testDiv.appendChild(craftInfoContent.cloneNode(true));
                testDiv.lastChild.style.display = "block";
                $('[data-toggle="tooltip"]').tooltip()
            }
        });
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
                typeSound.volume = 0;
                localStorage.setItem("volume-status", "false");
            }
            else {
                e.target.style.display = "none";
                document.getElementById("status-volume-on").style.display = "block";
                music.volume = storageMusique;
                effet.volume = storageEffet;
                typeSound.volume = storageEffet;
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
            let inventaireElem = document.getElementById("inventaire");
            let etableElem = document.getElementById("etable");
            if (window.getComputedStyle(inventaireElem, null).display == "flex") {
                inventaireElem.style.display = "none";
            }
            else if (window.getComputedStyle(etableElem, null).display == "flex") {
                etableElem.style.display = "none";
            }
            else {
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
        typeSound.volume = storageEffet;

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
        typeSound.volume = value / 10;
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

    document.getElementById("profil-button").addEventListener("click", () => {
        document.getElementById("options-menu").style.display = "none";
        document.getElementById("profil-menu").style.display = "block";
    })

    document.getElementById("retour-profil").addEventListener("click", () => {
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