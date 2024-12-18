window.onbeforeunload = function () {
    localStorage.setItem("musicTime", music.currentTime.toString());
    localStorage.setItem("token", "0");
};

window.onload = function () {
    let autoReload = localStorage.getItem("autoReload");
    let savedMusicTime = localStorage.getItem("musicTime");
    let checkEtabli = localStorage.getItem("etabli");

    if (autoReload === "true" && savedMusicTime !== null) {
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
        music.currentTime = 0;
    }

    music.play();
    localStorage.removeItem("autoReload");
};

document.getElementById("fleche-direction-vallee").addEventListener("click", () =>{
    localStorage.setItem("village-anim", "true");
    location.href = "/jeu/vallee";
})

let terres = document.getElementById("fleche-direction-terre");
if(terres != null){
    terres.addEventListener("click", () =>{
        localStorage.setItem("village-anim", "true");
        location.href = "/jeu/terre";
    })
}

document.querySelectorAll('.quantite-achat').forEach(item => {
    item.addEventListener('input', function() {
        let objetId = this.id.split('_').pop();
        let quantite = parseInt(this.value);
        let prixUnitaireElement = document.getElementById("prix_unitaire_" + objetId);
        let prixUnitaire = parseInt(prixUnitaireElement.getAttribute('data-prix-unitaire'));
        let nouveauPrix = quantite * prixUnitaire;
        document.getElementById("submit_achat_" + objetId).value = `Acheter pour ${nouveauPrix} écus`;
        document.getElementById("argent_achat_" + objetId).value = nouveauPrix; // Mise à jour du champ caché pour le montant total
    });
});


document.querySelectorAll('.quantite-vente').forEach(item => {
    item.addEventListener('input', function() {
        let objetId = this.id.split('_').pop();
        let quantite = parseInt(this.value);
        let prixVenteUnitaire = parseInt(document.getElementById("argent_vente_" + objetId).value); // Prix unitaire
        let nouveauPrix = quantite * prixVenteUnitaire;
        document.getElementById("submit_vente_" + objetId).value = `Vendre pour ${nouveauPrix} écus`;
        document.getElementById("total_vente_" + objetId).value = `${nouveauPrix}`; // Mise à jour du champ caché pour le montant total
    });
});