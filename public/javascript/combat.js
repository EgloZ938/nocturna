document.addEventListener("DOMContentLoaded", function () {
    const fullScreenAnimation = document.querySelector(".full-screen-animation");
    const dialogueBox = document.querySelector(".dialogue-box");
    const containerCapacites = document.getElementById("container-capacites");

    fullScreenAnimation.addEventListener("animationend", function () {
        this.style.display = "none";
        setTimeout(() => {
            dialogueBox.style.display = "none"; // Cache la dialogue-box après 2,5 secondes
        }, 2500); // 2500 millisecondes = 2,5 secondes
    });

    // Au départ, cachez les boutons
    containerCapacites.style.display = "none";

    dialogueBox.addEventListener("animationend", function () {
        // Quand l'animation de la dialogue-box se termine, la cacher
        dialogueBox.style.display = "none";

        // Et affichez les boutons de capacité
        containerCapacites.style.display = "flex";
    });
});

function animerPV(pvDebut, pvFin, pvMax, idPvTexte, duree) {
    var pvTexte = document.getElementById(idPvTexte);
    var difference = Math.abs(pvFin - pvDebut);
    var pas = difference / (duree / 20); // Diviser la durée totale par le temps d'intervalle (20 ms ici)
    var pvActuels = pvDebut;

    function miseAJourPV() {
        if ((pvDebut < pvFin && pvActuels < pvFin) || (pvDebut > pvFin && pvActuels > pvFin)) {
            pvActuels += (pvDebut < pvFin) ? pas : -pas;
            pvTexte.textContent = Math.round(pvActuels) + ' / ' + pvMax;
            setTimeout(miseAJourPV, 20);
        } else {
            // S'assurer que le texte final est correct
            pvTexte.textContent = pvFin + ' / ' + pvMax;
        }
    }

    miseAJourPV();
}

function ajusterBarreDeVie(pvActuels, pvMax, idBarre, idPvTexte) {
    var pourcentagePV = (pvActuels / pvMax) * 100;
    var barre = document.getElementById(idBarre);
    var pvTexte = document.getElementById(idPvTexte);
    var pvDebut = parseInt(pvTexte.textContent.split(' / ')[0]);

    // Définir la largeur de la barre avec une transition fluide
    barre.style.width = pourcentagePV + '%';

    // Animer les PV sur une durée de 3 secondes (3000 millisecondes)
    animerPV(pvDebut, pvActuels, pvMax, idPvTexte, 2800);

    // Changer la couleur de la barre en fonction du pourcentage de PV
    barre.classList.remove('verte', 'orange', 'rouge');
    if (pourcentagePV > 50) {
        barre.classList.add('verte');
    } else if (pourcentagePV > 20) {
        barre.classList.add('orange');
    } else {
        barre.classList.add('rouge');
    }
}

function toggleCapacites() {
    let containerCapacites = document.getElementById("container-capacites");
    containerCapacites.style.display = containerCapacites.style.display === 'none' ? 'flex' : 'none';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Combat {
    constructor(joueur, ennemi) {
        this.joueur = joueur;
        this.ennemi = ennemi;
        this.abriUtiliseJoueur = false;
        this.abriUtiliseEnnemi = false;
        this.joueurEmpoisone = false;
        this.ennemiEmpoisone = false;
        this.joueurParalyse = false;
        this.ennemiParalyse = false;
        this.intensitePoisonJoueur = 50;
        this.intensitePoisonEnnemi = 50;
    }

    setAbriUtiliseEnnemi(value) {
        this.abriUtiliseEnnemi = value;
    }

    setAbriUtiliseJoueur(value) {
        this.abriUtiliseJoueur = value;
    }

    setJoueurEmpoisone(value) {
        this.joueurEmpoisone = value;
    }

    setEnnemiEmpoisone(value) {
        this.ennemiEmpoisone = value;
    }

    setJoueurParalyse(value) {
        this.joueurParalyse = value;
    }

    setEnnemiParalyse(value) {
        this.ennemiParalyse = value;
    }

    setJoueurVitesse(value) {
        this.joueur.vitesse = value;
    }

    setEnnemiVitesse(value) {
        this.ennemi.vitesse = value;
    }

    async effectuerTour(attaque) {
        let joueurRapide = this.joueur.vitesse >= this.ennemi.vitesse;
        let ennemiAttack = this.pnjRandomAttaque();

        if (joueurRapide == true && ennemiAttack !== 'abri') {
            if (this.abriUtiliseEnnemi == true) {
                this.setAbriUtiliseEnnemi(false);
            }
            if (attaque == 'abri') {
                if (this.abriUtiliseJoueur == false) {
                    this.setAbriUtiliseJoueur(true);
                    this.messageCombat(this.joueur.nom + " se protège ");
                    this.executerAttaque(this.joueur, this.ennemi, 'abri');
                    await delay(3000);
                    this.messageCombat(this.ennemi.nom + " utilise " + ennemiAttack + " mais " + this.joueur.nom + " se protège");
                    await delay(3000);
                }
                else {
                    this.setAbriUtiliseJoueur(false);
                    this.messageCombat(this.joueur.nom + " essaye de se protéger mais cela échoue ");
                    await delay(3000);
                    this.messageCombat(this.ennemi.nom + " utilise " + ennemiAttack);
                    this.executerAttaque(this.ennemi, this.joueur, ennemiAttack);
                    await delay(750);
                    this.actualiserInterface();
                    await delay(3000);
                    this.verifierFinCombat();
                }
            }
            else {
                this.setAbriUtiliseJoueur(false);
                this.messageCombat(this.joueur.nom + " utilise " + attaque);
                this.executerAttaque(this.joueur, this.ennemi, attaque);
                await delay(750);
                this.actualiserInterface();
                await delay(3000);
                this.verifierFinCombat();
                this.messageCombat(this.ennemi.nom + " utilise " + ennemiAttack);
                this.executerAttaque(this.ennemi, this.joueur, ennemiAttack);
                await delay(750);
                this.actualiserInterface();
                await delay(3000);
                this.verifierFinCombat();
            }
        }
        else if (joueurRapide == false && ennemiAttack !== 'abri') {
            if (this.abriUtiliseEnnemi == true) {
                this.setAbriUtiliseEnnemi(false);
            }
            if (attaque == 'abri') {
                if (this.abriUtiliseJoueur == false) {
                    this.setAbriUtiliseJoueur(true);
                    this.messageCombat(this.joueur.nom + " se protège ");
                    this.executerAttaque(this.joueur, this.ennemi, 'abri');
                    await delay(3000);
                    this.messageCombat(this.ennemi.nom + " utilise " + ennemiAttack + " mais " + this.joueur.nom + " se protège");
                    await delay(3000);
                }
                else {
                    this.setAbriUtiliseJoueur(false);
                    this.messageCombat(this.joueur.nom + " essaye de se protéger mais cela échoue ");
                    await delay(3000);
                    this.messageCombat(this.ennemi.nom + " utilise " + attaque);
                    this.executerAttaque(this.ennemi, this.joueur, ennemiAttack);
                    await delay(750);
                    this.actualiserInterface();
                    await delay(3000);
                    this.verifierFinCombat();
                }
            }
            else {
                this.setAbriUtiliseJoueur(false);
                this.messageCombat(this.ennemi.nom + " utilise " + ennemiAttack);
                this.executerAttaque(this.joueur, this.ennemi, attaque);
                await delay(750);
                this.actualiserInterface();
                await delay(3000);
                this.verifierFinCombat();
                this.messageCombat(this.joueur.nom + " utilise " + attaque);
                this.executerAttaque(this.ennemi, this.joueur, ennemiAttack);
                await delay(750);
                this.actualiserInterface();
                await delay(3000);
                this.verifierFinCombat();
            }
        }
        else if (ennemiAttack == 'abri') {
            if (this.abriUtiliseEnnemi == false) {
                this.setAbriUtiliseEnnemi(true);
                if (attaque == 'abri') {
                    if (this.abriUtiliseJoueur == false) {
                        this.setAbriUtiliseJoueur(true);
                        if (joueurRapide == true) {
                            this.messageCombat(this.joueur.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                            this.messageCombat(this.ennemi.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                        }
                        else {
                            this.messageCombat(this.ennemi.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                            this.messageCombat(this.joueur.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                        }
                    }
                    else {
                        this.setAbriUtiliseJoueur(false);
                        if (joueurRapide == true) {
                            this.messageCombat(this.joueur.nom + " essaye de se protéger mais cela échoue ");
                            await delay(3000);
                            this.messageCombat(this.ennemi.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                        }
                        else {
                            this.messageCombat(this.ennemi.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                            this.messageCombat(this.joueur.nom + " essaye de se protéger mais cela échoue ");
                            await delay(3000);
                        }
                    }
                }
                else {
                    this.setAbriUtiliseJoueur(false);
                    this.messageCombat(this.ennemi.nom + " se protège ");
                    this.executerAttaque(this.joueur, this.ennemi, 'abri');
                    await delay(3000);
                    this.messageCombat(this.joueur.nom + " utilise " + attaque + " mais " + this.ennemi.nom + " se protège ");
                    await delay(3000);
                }
            }
            else if (this.abriUtiliseEnnemi == true) {
                this.setAbriUtiliseEnnemi(false);
                if (attaque == 'abri') {
                    if (this.abriUtiliseJoueur == false) {
                        this.setAbriUtiliseJoueur(true);
                        if (joueurRapide == true) {
                            this.messageCombat(this.joueur.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                            this.messageCombat(this.ennemi.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                        }
                        else {
                            this.messageCombat(this.ennemi.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                            this.messageCombat(this.joueur.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                        }
                    }
                    else {
                        this.setAbriUtiliseJoueur(false);
                        if (joueurRapide == true) {
                            this.messageCombat(this.joueur.nom + " essaye de se protéger mais cela échoue ");
                            await delay(3000);
                            this.messageCombat(this.ennemi.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                        }
                        else {
                            this.messageCombat(this.ennemi.nom + " se protège ");
                            this.executerAttaque(this.joueur, this.ennemi, 'abri');
                            await delay(3000);
                            this.messageCombat(this.joueur.nom + " essaye de se protéger mais cela échoue ");
                            await delay(3000);
                        }
                    }
                }
                else {
                    this.setAbriUtiliseJoueur(false);
                    this.messageCombat(this.ennemi.nom + " essaye de se protéger mais cela échoue ");
                    await delay(3000);
                    this.messageCombat(this.joueur.nom + " utilise " + attaque);
                    this.executerAttaque(this.joueur, this.ennemi, attaque);
                    await delay(750);
                    this.actualiserInterface();
                    await delay(3000);
                    this.verifierFinCombat();
                }
            }
        }

        this.appliquerPoison();
        if (this.joueurEmpoisone || this.ennemiEmpoisone) {
            await delay(3000);
        }
        this.dialogueBox();
        this.verifierFinCombat();
        toggleCapacites();
    }

    async executerAttaque(attaqueur, cible, attaque) {

        let peutAttaquer = true;

        if ((attaqueur.nom === this.joueur.nom && this.joueurParalyse) || (attaqueur.nom === this.ennemi.nom && this.ennemiParalyse)) {
            peutAttaquer = Math.random() < 0.5;
            if (!peutAttaquer && attaque != 'abri') {
                this.playParalysieSound();
                this.messageCombat(`${attaqueur.nom} est paralysé et n'a pas pu attaquer`);
                await delay(3000);
                return;
            }
        }

        // Si l'attaquant peut attaquer ou utilise 'abri'
        if (peutAttaquer || attaque === 'abri') {
            if (attaque == 'attaque classique') {
                if (cible.pv > 0) {
                    let degatsEffectifs = Math.min(attaqueur.force, cible.pv);
    
                    cible.pv -= degatsEffectifs;
    
                    cible.pv = Math.max(0, cible.pv);
    
                    this.playAttaqueSound()
                }
            }
            else if (attaque == 'abri') {
                this.playAbriSound()
            }
    
            else if (attaque == 'paralysie') {
                if (attaqueur.nom == this.joueur.nom && this.ennemiParalyse == false) {
                    this.setEnnemiParalyse(true);
                    this.playParalysieSound();
                    this.messageCombat(cible.nom + " est paralysé ");
                    document.getElementById("paralysie-ennemi").style.display = "block";
                    let value = cible.vitesseMax / 2;
                    this.setEnnemiVitesse(value);
                    await delay(3000); // Ajouté pour que le message "est paralysé" reste visible pendant 3 secondes
                }
                else if (attaqueur.nom == this.ennemi.nom && this.joueurParalyse == false) {
                    this.setJoueurParalyse(true);
                    this.playParalysieSound();
                    this.messageCombat(cible.nom + " est paralysé ");
                    document.getElementById("paralysie-joueur").style.display = "block";
                    let value = cible.vitesseMax / 2;
                    this.setJoueurVitesse(value);
                    await delay(3000); // Ajouté pour que le message "est paralysé" reste visible pendant 3 secondes
                }
                else {
                    this.messageCombat("Mais cela échoue");
                    await delay(3000);
                }
            }

            else if (attaque == 'poison') {
                if (attaqueur.nom == this.joueur.nom) {
                    if (this.ennemiEmpoisone == false) {
                        this.setEnnemiEmpoisone(true);
                        this.playPoisonSound();
                        await delay(3000);
                        this.messageCombat(cible.nom + " est empoisoné ");
                        document.getElementById("poison-ennemi").style.display = "block";
                    }
                    else {
                        await delay(3000);
                        this.messageCombat("Mais cela échoue");
                    }
                }
                else {
                    if (this.joueurEmpoisone == false) {
                        this.setJoueurEmpoisone(true);
                        this.playPoisonSound();
                        await delay(3000);
                        this.messageCombat(cible.nom + " est empoisoné ");
                        document.getElementById("poison-joueur").style.display = "block";
                    }
                    else {
                        await delay(3000);
                        this.messageCombat("Mais cela échoue");
                    }
                }
            }

        } 
        else {
            await delay(3000);
            this.playParalysieSound();
            this.messageCombat(`${attaqueur.nom} est paralysé et n'a pas pu attaquer`);
        }
    }

    verifierFinCombat() {
        if(this.joueur.pv <= 0 && this.ennemi.pv <= 0){
            this.finDuCombat('Égalité');
        }
        else if (this.joueur.pv <= 0) {
            this.finDuCombat("Défaite");
        } 
        else if (this.ennemi.pv <= 0) {
            this.finDuCombat("Victoire");
        }

    }

    finDuCombat(resultat) {
        alert(`Combat terminé: ${resultat}!`);
    }

    appliquerPoison() {
        if (this.joueurEmpoisone && this.ennemiEmpoisone) {
            this.joueur.pv -= this.intensitePoisonJoueur;
            this.joueur.pv = Math.max(0, this.joueur.pv); // Éviter les PV négatifs
            this.intensitePoisonJoueur += 50; // Augmenter l'intensité pour le prochain tour

            this.ennemi.pv -= this.intensitePoisonEnnemi;
            this.ennemi.pv = Math.max(0, this.ennemi.pv); // Éviter les PV négatifs
            this.intensitePoisonEnnemi += 50; // Augmenter l'intensité pour le prochain tour

            this.playPoisonSound();
            this.messageCombat(this.joueur.nom + " et " + this.ennemi.nom + " souffrent du poison");
        }
        else {
            if (this.joueurEmpoisone) {
                this.joueur.pv -= this.intensitePoisonJoueur;
                this.joueur.pv = Math.max(0, this.joueur.pv); // Éviter les PV négatifs
                this.intensitePoisonJoueur += 50; // Augmenter l'intensité pour le prochain tour
                this.playPoisonSound();
                this.messageCombat(this.joueur.nom + " souffre du poison");
            }

            if (this.ennemiEmpoisone) {
                this.ennemi.pv -= this.intensitePoisonEnnemi;
                this.ennemi.pv = Math.max(0, this.ennemi.pv); // Éviter les PV négatifs
                this.intensitePoisonEnnemi += 50; // Augmenter l'intensité pour le prochain tour
                this.playPoisonSound();
                this.messageCombat(this.ennemi.nom + " souffre du poison");
            }
        }

        this.actualiserInterface(); // Mettre à jour l'interface pour refléter les changements
    }

    dialogueBox() {
        let messageCombat = document.getElementById("messageCombat");
        messageCombat.style.display = "none";
    }

    pnjRandomAttaque() {
        let index = this.getRandomInt(6);
        if (index == 1 || index == 2 || index == 3) {
            return 'attaque classique';
        }
        else if (index == 4) {
            return 'abri';
        }
        else if (index == 5) {
            return 'poison';
        }
        else {
            return 'paralysie';
        }
    }

    messageCombat(message) {
        let messageCombat = document.getElementById("messageCombat");
        messageCombat.innerHTML = `<h1>${message}</h1>`;
        messageCombat.style.display = "block";
    }

    playAttaqueSound() {
        let attaque = new Audio('/mp3/attaque.mp3');
        attaque.play();
    }

    playAbriSound() {
        let abri = new Audio('/mp3/abri.mp3');
        abri.play();
    }

    playPoisonSound() {
        let poison = new Audio('/mp3/poison.mp3');
        poison.play();
    }

    playParalysieSound() {
        let paralyse = new Audio('/mp3/paralysie.mp3');
        paralyse.play();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    actualiserInterface() {
        ajusterBarreDeVie(this.joueur.pv, this.joueur.pvMax, 'barre-pv-joueur', 'pv-actuel-joueur');
        ajusterBarreDeVie(this.ennemi.pv, this.ennemi.pvMax, 'barre-pv-ennemi', 'pv-actuel-ennemi');
    }
}

let combat = new Combat(joueur, ennemi);