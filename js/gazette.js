document.addEventListener("DOMContentLoaded", function (_e) {

    var prefix = (document.location.href.indexOf("index.html") > 0) ? "." : "..";

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

    var chatbot = new ChatBot(prefix);

}, false);



function ChatBot(prefix) {

    var CHAT = "left";
    var CLIENT = "right";

    var view = document.createElement("div");
    view.id = "chatbot";

    var content = document.createElement("div");
    content.className = "content";

    var btnClose = document.createElement("div");
    btnClose.className = "close";
    btnClose.addEventListener("click", function (_e) {
        state = 81;
        that.ditQuelqueChose(null);
        this.style.display = "none";
    }, false);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.addEventListener("keypress", function (_e) {
        if (_e.keyCode == 13) { // retour chariot 
            that.afficher(CLIENT, this.value);
            if (!reponse && enAttente) {
                var intentions = identifyIntention(this.value);
                reponse = setTimeout(function () {
                    that.ditQuelqueChose(intentions);
                    reponse = null;
                }, 1000);
            }
            this.value = "";
        }
    }, false);

    view.appendChild(content);
    view.appendChild(btnClose);
    view.appendChild(input);

    var overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    document.body.appendChild(view);
    

    var that = this;

    var reponse = null;

    setTimeout(function() { that.montrer(); }, Math.random() * 1000 |  0);

    this.montrer = function () {
        view.classList.add("actif");
        content.innerHTML = "";
        this.ditQuelqueChose();
        input.focus();
    }

    this.cacher = function () {
        view.classList.remove("actif");
    } 
    
    var state = null;
    var enAttente = false;
    var sujetsLibres = [0,1,2,3,4,5];
    
    this.ditQuelqueChose = function (lastIntent) {
        
        enAttente = false;
        
        switch (state) {
            case null:
                this.afficher(CHAT, "Bonjour !");
                state = 0;
                enAttente = true;
                break;
            case -1:
                setTimeout(function() { that.cacher(); state = null; }, 2000);
                break;    
            case 0: 
                if (lastIntent == "aurevoir" || sujetsLibres.length == 0) {
                    this.afficher(CHAT, "Allez bye, je dois filer.");
                    state = -1;
                    break;
                }
                var conversations = [ 
                    { txt: "Tu es en quelle année ?", next: 11 },
                    { txt: "Tu veux entendre une jolie chanson ?", next: 21 },
                    { txt: "Comment tu t'appelles ?", next: 31 },
                    { txt: "Est-ce que tu sais que derrière ce chatbot il y a un bel automate déterministe et minimal ?", next: 41 },
                    { txt: "Qu'est-ce que tu as demandé au Père Noël ?", next: 51 },
                    { txt: "Tu veux voir un truc marrant ?", next: 61 }
                ];
                var n = sujetsLibres[Math.random() * sujetsLibres.length | 0];
                this.afficher(CHAT, conversations[n].txt);
                enAttente = true;
                state = conversations[n].next;
                sujetsLibres.splice(sujetsLibres.indexOf(n), 1);
                break;
            case 11:
                var noms = ["Bernard", "Dadeau", "Masson", "Peureux", "Hufflen"];
                this.afficher(CHAT, "Et qu'est-ce que tu penses de M. " + noms[Math.random() * noms.length | 0] + " ?");
                enAttente = true;
                state = 12;
                break;
            case 12:
                if (lastIntent == "positif") {
                    this.afficher(CHAT, "Ah OK je lui dirai.");
                    state = 0;
                    break;
                }
                if (lastIntent == "negatif") {
                    this.afficher(CHAT, "Oh non, ça va lui briser son petit coeur...");   
                    state = 0;
                    break;
                }
                if (lastIntent == "neutre") {
                    this.afficher(CHAT, "Bah c'est pas grave.");
                    state = 0;
                    break;
                }
                if (lastIntent == "aurevoir") {
                    this.afficher(CHAT, "OK bye. Je reviendrai plus tard.");
                    state = -1;
                    break;
                }
                this.afficher(CHAT, "Je n'ai pas bien compris, redis.");
                enAttente = true;
                break;
            case 21: 
                if (lastIntent == "accord") {
                    var chansons = ["fPwkDoTcvG8", "USzXXaRdji0", "T-fzIRImvvk"];
                    this.afficher(CHAT, '<iframe width="216" height="117" src="https://www.youtube.com/embed/' + chansons[Math.random() * chansons.length | 0] + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                    state = 22;
                    break;
                }
                if (lastIntent == "desaccord") {
                    this.afficher(CHAT, "OK...");
                    state = 999;
                    break;
                }                
                if (lastIntent == "aurevoir") {
                    this.afficher(CHAT, "OK bye. Je reviendrai plus tard.");
                    state = -1;
                    break;
                }
                this.afficher(CHAT, "Je n'ai pas bien compris, redis.");
                enAttente = true;
                break;
            case 22: 
                this.afficher(CHAT, "Ca te plait ?");
                enAttente = true;
                state = 23;
                break;
            case 23: 
                if (lastIntent == "accord") {
                    this.afficher(CHAT, "Je savais que tu apprécierais.");
                    state = 999;
                    break;
                }
                if (lastIntent == "desaccord") {
                    this.afficher(CHAT, "Pourtant, c'est ma chanson préférée !");
                    state = 24;
                    break;
                }
                if (lastIntent == "aurevoir") {
                    this.afficher(CHAT, "OK bye. Je reviendrai plus tard.");
                    state = -1;
                    break;
                }
                this.afficher(CHAT, "Je n'ai pas bien compris, redis.");
                enAttente = true;
                break;
            case 24:
                this.afficher(CHAT, "Je suis vexé, je m'en vais.");
                state = -1;
                break;
            case 31:
                this.afficher(CHAT, "C'est joli, j'aime beaucoup.");
                state = 31.1;
                break;
            case 31.1:
                this.afficher(CHAT, "Je crois savoir que tu es dans le TOP 3 des étudiants préférés de M. Dadeau.");
                state = 32;
                break;
            case 32:
                this.afficher(CHAT, "Sinon, tu aimes les films de Gladiateurs ?");
                state = 33;
                enAttente = true;
                break;
            case 33: 
                if (lastIntent == "accord") {
                    this.afficher(CHAT, "Moi aussi ! Ca nous fait des points en commun !");
                    state = 0;   
                    break;
                }
                if (lastIntent == "desaccord") {
                    this.afficher(CHAT, "Est-ce que je peux savoir pourquoi ?");
                    enAttente = true;
                    state = 34;   
                    break;
                }
                if (lastIntent == "aurevoir") {
                    this.afficher(CHAT, "OK bye. Je reviendrai plus tard.");
                    state = -1;
                    break;
                }
                this.afficher(CHAT, "Je n'ai pas bien compris, redis.");
                enAttente = true;
                break;
            case 34:
                this.afficher(CHAT, "En fait, je m'en fiche. Je n'ai plus envie de te parler.");
                state = -1;
                break;
            case 41: 
                this.afficher(CHAT, "Ouais moi aussi ça me fait une belle jambe.");
                state = 999;
                break;
            case 51: 
                this.afficher(CHAT, "Et tu penses avoir été assez sage pour mériter ça ?");
                state = 52;
                enAttente = true;
                break;
            case 52:
                if (lastIntent == "accord") {
                    this.afficher(CHAT, "Tant mieux.");
                    state = 999;
                    break;
                }
                if (lastIntent == "desaccord") {
                    this.afficher(CHAT, "Hummm, toi tu as fait des trucs pas jolis-jolis...");
                    state = 999;
                    break;
                }
                if (lastIntent == "aurevoir") {
                    this.afficher(CHAT, "OK bye. Je reviendrai plus tard.");
                    state = -1;
                    break;
                }
                this.afficher(CHAT, "Je n'ai pas bien compris, redis.");
                enAttente = true;
                break;
            case 61: 
                if (lastIntent == "accord") {
                    this.afficher(CHAT, "Attention...");
                    state = 62;
                    break;
                }
                if (lastIntent == "desaccord") {
                    this.afficher(CHAT, "Arf... tant pis.");
                    state = -1;
                    break;
                }
                if (lastIntent == "aurevoir") {
                    this.afficher(CHAT, "OK bye. Je reviendrai plus tard.");
                    state = -1;
                    break;
                }
                this.afficher(CHAT, "Je n'ai pas bien compris, redis.");
                enAttente = true;
                break;
            case 62:
                overlay.classList.add("visible");
                this.afficher(CHAT, "<i>\"Ca va être noir !\"</i>");
                state = 63;
                break;
            case 63:
                overlay.style.opacity = "1";
                state = 64;
                break;
            case 64:
                this.afficher(CHAT, "C'est fun hein ?");
                state = 65;
                break;
            case 65:
                this.afficher(CHAT, "Bon allez j'arrête.");
                state = 66;
                break;
            case 66:
                overlay.style.opacity = "0";
                state = 67;
                break;
            case 67:
                overlay.classList.remove("visible");
                state = -1;
                break;
            case 81: 
                this.afficher(CHAT, "Dis donc, tu voulais te débarrasser de moi ?");
                state = 82;
                break;
            case 82: 
                this.afficher(CHAT, "Je te dérange ??");
                state = 83;
                break;
            case 83:
                this.afficher(CHAT, "Je prends trop de place peut-être ?");
                state = 84;
                break;
            case 84: 
                this.afficher(CHAT, "Je t'empêche de voir ?");
                view.classList.add("large");
                state = 85;
                break;
            case 85: 
                this.afficher(CHAT, "Tu fais moins le malin maintenant.");
                state = 86;
                break;
            case 86:
                this.afficher(CHAT, "Allez je me barre. Ciao la compagnie.");
                state = -1;
                setTimeout(function() { view.classList.remove("large"); }, 1000); 
                break;
            default: 
                this.afficher(CHAT, "Parlons d'autre chose...");
                state = 0;
                break;
        }
        
        if (!enAttente && state != null) {
            setTimeout(function() { that.ditQuelqueChose(null); }, 2000);
        }
        else {
            input.focus();   
        }
    }    

    this.afficher = function (cl, txt) {
        var p = document.createElement("p");
        p.className = cl;
        content.appendChild(p);
        if (cl == CHAT) {
            p.innerHTML = "<span class='attente'></span><span class='attente'></span><span class='attente'></span>";
            p.scrollIntoView(true);
            var delai = txt.length * 70;
            setTimeout(function() { p.innerHTML = txt; p.scrollIntoView(true); }, delai > 2000 ? 2000 : delai); 
        }
        else {
            p.innerHTML = txt;
            p.scrollIntoView(true);
        }
    }
    
}
    
    
    var intentions = {
        accord: ["oui", "oh oui alors", "je veux bien", "d'accord", "je suis d'accord", "pourquoi pas", "c'est sûr", "ok", "pas de soucis", "ca ne me dérange pas", "envoie", "zyva", "allons y", "vas-y", "sur", "sure", "sûr", "sûre", "bien sur", "bien sûr", "of course", "évidemment", "oh que oui", "bah oui"], 
        desaccord: ["non", "je n'ai pas envie", "pas envie", "ca me fait chier", "aucune envie", "pas du tout", "aucunement", "tu me fais chier", "c'est pas la peine", "pas vraiment", "pas trop"],
        positif: ["j'aime", "j'aime bien", "j'aime beaucoup", "cool", "trop bien", "j'adore", "c'est meilleur", "il est super", "il est trop fort", "super", "génial", "c'est pas mal"],
        negatif: ["je n'aime pas", "pas cool", "c'est un con", "c'est un abruti", "j'aime pas", "c'est nul", "c'est pas top", "pas terrible", "pas génial", "pas glop", "il est méchant", "c'est le mal incarné", "il est diabolique"],
        neutre: ["je ne sais pas", "je sais pas", "aucune idée", "aucune idee", "bof", "pas trop", "sais pas", "idk", "don't know"],
        salut: ["hello", "bonjour", "salut", "salut ca va ?", "coucou", "hi", "ola que tal", "ola", "guten tag", "hello boy", "salut les darons"],
        aurevoir: ["au revoir", "bye", "bye bye", "a+", "a plus", "a plus tard", "à plus tard", "à plus", "adios", "a+ dans le bus", "a++"]
    }
    
    
    function identifyIntention(s) {
        s = s.toLowerCase();
        var found = null;
        var dist = -1;
        var threshold = 0.5;
        for (var intent in intentions) {
            for (var i=0; i < intentions[intent].length; i++) {
                var sPrime = intentions[intent][i];
                var d = distance(s, sPrime) / Math.max(s.length, sPrime.length);
                if (d < threshold) {
                    if (found == null || d < dist) {
                        dist = d;
                        found = intent;
                        console.log(intent + " --> " + (100 - dist*100 | 0) + " (" + intentions[intent][i] + ")");
                    }
                }
            }
        }
        return found;
    }
    
    
    // Compute the levenstein distance between the two given strings
    function distance(a, b) {
        if (a.length == 0) return b.length;
        if (b.length == 0) return a.length;

        var matrix = [];

        // increment along the first column of each row
        var i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        var j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1)); // deletion
                }
            }
        }

        return matrix[b.length][a.length];
    };
    


