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

    let villageAnim = localStorage.getItem("village-anim");
    if(villageAnim == null){
        localStorage.setItem("village-anim", "true");
    }
    villageAnim = localStorage.getItem("village-anim");
    
    if(villageAnim == "true"){
        var intro = document.getElementById('village-intro');
        intro.style.display = 'block';
    
        setTimeout(function() {
            intro.classList.add('fadeOut');
        }, 2000);
    
        setTimeout(function() {
            intro.style.display = 'none';
        }, 4000);

        localStorage.setItem("village-anim", "false");
    }
};


let combatBtn = document.getElementsByClassName("combat-btn");
for(let i = 0; i < combatBtn.length; i++){
    combatBtn[i].addEventListener("click", (e) =>{
        let id = e.target.id;
        location.href = `/jeu/combat?pnj_id=${id}`;
    })
}