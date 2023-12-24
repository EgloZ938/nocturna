window.onbeforeunload = function () {
    localStorage.setItem("musicTime", music.currentTime.toString());
};

window.onload = function () {
    let autoReload = localStorage.getItem("autoReload");
    let savedMusicTime = localStorage.getItem("musicTime");
    let checkEtabli = localStorage.getItem("etabli");

    if (autoReload === "true" && savedMusicTime !== null) {
        // Rechargement automatique : reprendre la musique
        music.currentTime = parseFloat(savedMusicTime);
        if(checkEtabli === "true"){
            localStorage.removeItem("etabli");
        }
        else{
            document.getElementById("sac-a-dos").click();
        }
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
if (continueIndicator != null) {
    function typeWriter(text, n) {
        if (n === 0) typeSound.play(); // Commence à jouer le son au début du texte

        if (n < (text.length)) {
            dialogueElement.innerHTML = text.substring(0, n + 1);
            n++;
            setTimeout(function () {
                typeWriter(text, n);
            }, 30); // Vitesse du défilement
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
            sendNarrationData();
            document.getElementById("pnj2").style.display = "block";
        }
    }

    function sendNarrationData() {
        const data = { count: "1" };

        fetch('/jeu/create_narration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCsrfToken() // Assurez-vous d'obtenir le token CSRF
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function getCsrfToken() {
        // Récupérer le token CSRF depuis un élément meta dans votre HTML
        return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }


    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && continueIndicator.style.display === 'block') {
            nextDialogue();
        }
    });

    continueIndicator.addEventListener('click', function () {
        if (continueIndicator.style.display === 'block') {
            nextDialogue();
        }
    });

    // Démarre le premier dialogue
    nextDialogue();
}