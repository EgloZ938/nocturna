let music = new Audio('https://evarthel.com/mp3/cloud-of-sorrow-13984.mp3');
let effet = new Audio('https://evarthel.com/mp3/click-button-140881-%5bAudioTrimmer.com%5d(1).mp3');

let elem = document.getElementsByClassName("focus");
let lengthElem = elem.length;

let userAgent = navigator.userAgent;
let resultat = userAgent.includes("Firefox");

if (resultat == true) {
    document.getElementById("status-volume-on").style.display = "block";
    startMusic();
}
else {
    document.getElementById("status-volume-off").style.display = "block";
}

for(let i = 0; i < lengthElem; i++){
    elem[i].addEventListener("focus", () =>{
        effet.play();
    })    
}    

document.getElementById("hover").addEventListener("mouseenter", () =>{
    effet.play();
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
        }
        else {
            e.target.style.display = "none";
            document.getElementById("status-volume-on").style.display = "block";
            music.volume = 1;
            effet.volume = 1;
        }
    })
}

function startMusic(){
    music.play();
    
    music.addEventListener('ended', function () {
        music.currentTime = 0;
        music.play();
    }, false);
}