document.addEventListener("DOMContentLoaded", function () {
    const fullScreenAnimation = document.querySelector(".full-screen-animation");
    const dialogueBox = document.querySelector(".dialogue-box");
    const containerCapacites = document.getElementById("container-capacites");

    fullScreenAnimation.addEventListener("animationend", function () {
        this.style.display = "none";
        setTimeout(() => {
            dialogueBox.style.display = "none";
        }, 2500);
    });

    containerCapacites.style.display = "none";

    dialogueBox.addEventListener("animationend", function () {
        dialogueBox.style.display = "none";

        containerCapacites.style.display = "flex";
    });
});

function animerPV(pvDebut, pvFin, pvMax, idPvTexte, duree) {
    var pvTexte = document.getElementById(idPvTexte);
    var difference = Math.abs(pvFin - pvDebut);
    var pas = difference / (duree / 20);
    var pvActuels = pvDebut;

    function miseAJourPV() {
        if ((pvDebut < pvFin && pvActuels < pvFin) || (pvDebut > pvFin && pvActuels > pvFin)) {
            pvActuels += (pvDebut < pvFin) ? pas : -pas;
            pvTexte.textContent = Math.round(pvActuels) + ' / ' + pvMax;
            setTimeout(miseAJourPV, 20);
        } else {
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

    barre.style.width = pourcentagePV + '%';

    animerPV(pvDebut, pvActuels, pvMax, idPvTexte, 2800);

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

function actionFinCombat() {
    const action = document.getElementById("boutonAction").textContent;
    if (action === "Obtenir Récompenses") {
        window.location.href = "/chemin/vers/recompenses";
    } else {
        location.reload();
    }
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
        this.combatTermine = false;
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
                    if (this.combatTermine) {
                        return;
                    }
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
                if (this.combatTermine) {
                    return;
                }
                this.messageCombat(this.ennemi.nom + " utilise " + ennemiAttack);
                this.executerAttaque(this.ennemi, this.joueur, ennemiAttack);
                await delay(750);
                this.actualiserInterface();
                await delay(3000);
                this.verifierFinCombat();
                if (this.combatTermine) {
                    return;
                }
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
                    if (this.combatTermine) {
                        return;
                    }
                }
            }
            else {
                this.setAbriUtiliseJoueur(false);
                this.messageCombat(this.ennemi.nom + " utilise " + ennemiAttack);
                this.executerAttaque(this.ennemi, this.joueur, ennemiAttack);
                await delay(750);
                this.actualiserInterface();
                await delay(3000);
                this.verifierFinCombat();
                if (this.combatTermine) {
                    return;
                }
                this.messageCombat(this.joueur.nom + " utilise " + attaque);
                this.executerAttaque(this.joueur, this.ennemi, attaque);
                await delay(750);
                this.actualiserInterface();
                await delay(3000);
                this.verifierFinCombat();
                if (this.combatTermine) {
                    return;
                }
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
                    if (this.combatTermine) {
                        return;
                    }
                }
            }
        }

        this.appliquerPoison();
        if (this.joueurEmpoisone || this.ennemiEmpoisone) {
            await delay(3000);
        }
        this.dialogueBox();
        this.verifierFinCombat();
        if (this.combatTermine) {
            return;
        }
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
                    await delay(3000);
                }
                else if (attaqueur.nom == this.ennemi.nom && this.joueurParalyse == false) {
                    this.setJoueurParalyse(true);
                    this.playParalysieSound();
                    this.messageCombat(cible.nom + " est paralysé ");
                    document.getElementById("paralysie-joueur").style.display = "block";
                    let value = cible.vitesseMax / 2;
                    this.setJoueurVitesse(value);
                    await delay(3000);
                }
                else {
                    this.messageCombat(this.attaqueur.nom + "essaye de paralyser mais cela échoue");
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
            this.miseKO("joueur");
            this.miseKO("ennemi");
            this.combatTermine = true;
            this.dialogueBox();
            setTimeout(() => this.finDuCombat("Égalité"), 1000);
        }
        else if (this.joueur.pv <= 0) {
            this.miseKO("joueur");
            this.combatTermine = true;
            this.dialogueBox();
            setTimeout(() => this.finDuCombat("Défaite"), 1000);
        } 
        else if (this.ennemi.pv <= 0) {
            this.miseKO("ennemi");
            this.combatTermine = true;
            this.dialogueBox();
            setTimeout(() => this.finDuCombat("Victoire"), 1000);
        }
    }

    finDuCombat(resultat) {
        this.desactiverBoutonsCombat();
        let messageEpic = "";
        let texteBouton = "";
    
        if (resultat === "Victoire") {
            messageEpic = "Félicitations! Vous avez triomphé avec bravoure.";
            document.getElementById("boutonAction").style.display = "none";
        }
        else{
            messageEpic = "La défaite est amère, mais chaque bataille est une leçon.";
            texteBouton = "Recommencer";
            document.getElementById("boutonAction").textContent = texteBouton;
            document.getElementById("containerRecompenses").style.display = "none";
        } 
        
        document.getElementById("resultatCombat").textContent = `Combat terminé: ${resultat}!`;
        document.getElementById("messageEpic").textContent = messageEpic;
        document.getElementById("boiteFinCombat").style.display = "flex";
    }

    appliquerPoison() {
        if (this.joueurEmpoisone && this.ennemiEmpoisone) {
            this.joueur.pv -= this.intensitePoisonJoueur;
            this.joueur.pv = Math.max(0, this.joueur.pv);
            this.intensitePoisonJoueur += 50;

            this.ennemi.pv -= this.intensitePoisonEnnemi;
            this.ennemi.pv = Math.max(0, this.ennemi.pv);
            this.intensitePoisonEnnemi += 50;

            this.playPoisonSound();
            this.messageCombat(this.joueur.nom + " et " + this.ennemi.nom + " souffrent du poison");
        }
        else {
            if (this.joueurEmpoisone) {
                this.joueur.pv -= this.intensitePoisonJoueur;
                this.joueur.pv = Math.max(0, this.joueur.pv);
                this.intensitePoisonJoueur += 50;
                this.playPoisonSound();
                this.messageCombat(this.joueur.nom + " souffre du poison");
            }

            if (this.ennemiEmpoisone) {
                this.ennemi.pv -= this.intensitePoisonEnnemi;
                this.ennemi.pv = Math.max(0, this.ennemi.pv);
                this.intensitePoisonEnnemi += 50;
                this.playPoisonSound();
                this.messageCombat(this.ennemi.nom + " souffre du poison");
            }
        }

        this.actualiserInterface();
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

    desactiverBoutonsCombat() {
        const boutons = document.querySelectorAll(".bouton-medieval");
        boutons.forEach(bouton => {
            bouton.style.display = "none";
            bouton.disabled = true;
        });
    }

    miseKO(personnage) {
        const elementPersonnage = document.getElementById(personnage === "joueur" ? "avatar-joueur" : "avatar-ennemi");
        elementPersonnage.classList.add("personnage-ko");
    }
}

let combat = new Combat(joueur, ennemi);