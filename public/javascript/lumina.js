window.onload = function() {
    var intro = document.getElementById('village-intro');
    intro.style.display = 'block';

    setTimeout(function() {
        intro.classList.add('fadeOut');
    }, 5000); // Commencer le fade-out après 5 secondes

    setTimeout(function() {
        intro.style.display = 'none';
    }, 7000); // Masquer complètement après 7 secondes
};