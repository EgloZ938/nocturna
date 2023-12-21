localStorage.getItem("token");
if (localStorage.getItem("token") == "0") {
    localStorage.setItem("token", "1");
    location.reload();
}
else {

    let music = new Audio('/mp3/first-town.mp3');
    let effet = new Audio('/mp3/effet_click.mp3');
    let typeSound = new Audio('/mp3/text-sound.mp3');

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
            if (window.getComputedStyle(inventaireElem, null).display == "flex") {
                inventaireElem.style.display = "none";
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

    window.onbeforeunload = function () {
        localStorage.setItem("musicTime", music.currentTime.toString());
    };

    window.onload = function () {
        let autoReload = localStorage.getItem("autoReload");
        let savedMusicTime = localStorage.getItem("musicTime");

        if (autoReload === "true" && savedMusicTime !== null) {
            // Rechargement automatique : reprendre la musique
            music.currentTime = parseFloat(savedMusicTime);
            document.getElementById("sac-a-dos").click();
        } else {
            // Rechargement manuel : recommencer la musique depuis le début
            music.currentTime = 0;
        }

        music.play();
        // Réinitialiser l'indicateur
        localStorage.removeItem("autoReload");
    };

    const username = document.body.getAttribute('data-username');
    let currentDialogue = 0;
    const dialogues = [
        `Ah, te voilà enfin, ${username} ! Nous t'attendions avec impatience. Je suis Eldrin, le gardien de la sagesse de Highgard. Ton arrivée en ces temps sombres n'est pas un hasard.`,
        `Le royaume de Highgard, jadis un havre de paix et de prospérité, est maintenant plongé dans le chaos et l'obscurité. Une force maléfique, commandée par l'impitoyable Ilies, étend son ombre sur nos terres. Ses légions corrompent tout ce qui est bon et juste.`,
        `Mais ne t'inquiète pas, tu ne seras pas seul dans cette quête. Je serai là pour te guider, et tu trouveras des alliés en cours de route. Ta première tâche sera d'apprendre à maîtriser tes compétences et à comprendre les lois de ce monde.`,
        `Nous avons besoin de toi, ${username}. Tu es celui que les anciennes prophéties ont prédit, l'élu qui possède la force et le courage pour libérer Highgard de cette emprise maléfique.`,
        `Nous comptons sur toi, ${username}. Lorsque tu te sentiras prêt à commencer cette aventure, appuie sur le bouton et embrasse ton destin. Le futur de Highgard est entre tes mains.`
        // Ajoutez ici les autres dialogues
    ];
    const dialogueElement = document.getElementById('dialogue');
    const continueIndicator = document.getElementById('continue-indicator');

    function typeWriter(text, n) {
        if (n === 0) typeSound.play(); // Commence à jouer le son au début du texte
    
        if (n < (text.length)) {
            dialogueElement.innerHTML = text.substring(0, n + 1);
            n++;
            setTimeout(function() {
                typeWriter(text, n);
            }, 40); // Vitesse du défilement
        } else {
            typeSound.pause(); // Arrête le son lorsque le texte est complètement affiché
            typeSound.currentTime = 0; // Réinitialise le son pour la prochaine utilisation
            continueIndicator.style.display = 'block'; // Affiche l'indicateur à la fin
        }
    }

    function nextDialogue() {
        if (currentDialogue < dialogues.length) {
            continueIndicator.style.display = 'none'; // Cache l'indicateur
            typeWriter(dialogues[currentDialogue], 0);
            currentDialogue++;
        } else {
            // Une fois tous les dialogues affichés, cache le conteneur #pnj
            document.getElementById('pnj').style.display = 'none';
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && continueIndicator.style.display === 'block') {
            nextDialogue();
        }
    });

    continueIndicator.addEventListener('click', function() {
        if (continueIndicator.style.display === 'block') {
            nextDialogue();
        }
    });

    // Démarre le premier dialogue
    nextDialogue();


    document.getElementById("quitter-button").addEventListener("click", () => {
        location.href = "/";
    })
}