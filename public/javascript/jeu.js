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
        if (checkEtabli === "true") {
            localStorage.removeItem("etabli");
        }
        else {
            let sac = document.getElementById("sac-a-dos");
            if (sac !== null) {
                let narration_count = document.getElementById("input_narration_count").value;
                if(narration_count != "3"){
                    document.getElementById("sac-a-dos").click();
                }
            }
        }
    } else {
        // Rechargement manuel : recommencer la musique depuis le début
        music.currentTime = 0;
    }

    music.play();
    // Réinitialiser l'indicateur
    localStorage.removeItem("autoReload");
};

let currentDialogue = 0;

const dialogueElement = document.getElementById('dialogue');

let currentDialogueIndex = 0;
let currentDialogueArray = dialogues; // Commence avec les dialogues de PNJ1
let currentDialogueElement = dialogueElement; // L'élément de dialogue pour PNJ1
let continueIndicator = document.getElementById('continue-indicator'); // Indicateur pour PNJ1

if (continueIndicator != null) {
    function typeWriter(text, n) {
        if (n === 0) typeSound.play();

        if (n < (text.length)) {
            currentDialogueElement.innerHTML = text.substring(0, n + 1);
            n++;
            setTimeout(function () {
                typeWriter(text, n);
            }, 20);
        } else {
            typeSound.pause();
            typeSound.currentTime = 0;
            continueIndicator.style.display = 'block';
        }
    }

    function nextDialogue() {
        if (currentDialogueIndex < currentDialogueArray.length) {
            continueIndicator.style.display = 'none';
            typeWriter(currentDialogueArray[currentDialogueIndex], 0);
            currentDialogueIndex++;
        } else {
            // Gérer la transition entre PNJ1 et PNJ2
            if (currentDialogueArray === dialogues) {
                document.getElementById('pnj').style.display = 'none';
                initDialogue(dialogues2, 'dialogue2', 'continue-indicator2');
                document.getElementById('pnj2').style.display = 'block';
            }
            else {
                document.getElementById('pnj2').style.display = 'none';
                if (document.getElementById("input_narration_count") !== null){
                    let narration_count = document.getElementById("input_narration_count").value;
                    if(narration_count == "1"){
                        localStorage.setItem("token", "0");
                        localStorage.setItem("autoReload", "true");
                        location.href = "/jeu/narrationdeux";
                    }
                    else if(narration_count == "3"){
                        
                    }
                }
                else{
                    document.getElementById("craft").click();
                }
            }
        }
    }

    function initDialogue(dialogueArray, dialogueElementId, continueIndicatorId) {
        currentDialogueArray = dialogueArray;
        currentDialogueElement = document.getElementById(dialogueElementId);
        continueIndicator = document.getElementById(continueIndicatorId);
        currentDialogueIndex = 0;
        nextDialogue();
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
    initDialogue(dialogues, 'dialogue', 'continue-indicator');
}