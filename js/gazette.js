

document.addEventListener("DOMContentLoaded", function(_e) {
    
    var prefix = (document.location.href.endsWith("index.html") > 0) ? "." : "..";
    
    var nav = document.querySelector("nav");
    nav.innerHTML = "<ul>" +
            '<li><a href="' + prefix + '/index.html">Accueil</a></li>' +
            '<li><a href="#">Les actus</a>' + 
                '<ul>' + 
                    '<li><a href="' + prefix + '/html/2018-dec-24.html">Semaine du 24/12</a></li>' + 
                    '<li><a href="' + prefix + '/html/2018-dec-17.html">Semaine du 17/12</a></li>' + 
                    '<li><a href="' + prefix + '/html/archives.html">archives</a></li>' + 
                '</ul>' + 
            '</li>' +
            '<li><a href="' + prefix + '/html/abonnement.html">S\'abonner</a></li>' +
            '<li><a href="' + prefix + '/html/apropos.html">A propos</a></li>' + 
            '<li><a href="mailto:contact@gazette-cmi.fr?subject=J%20aime%20beaucoup%20ce%20que%20vous%20faites">Nous contacter</a></li>' +
        '</ul>';
    
    var footer = document.querySelector("body > footer");
    footer.innerHTML = "&copy; CMI Informatique - Décembre 2018 - Tous droits réservés";


}, false);
