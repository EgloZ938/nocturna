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
                if (narration_count != "3") {
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

document.getElementById("fleche-direction-lumina").addEventListener("click", () => {
    localStorage.setItem("village-anim", "true");
    location.href = "/jeu/lumina"
})