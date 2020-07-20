/*Projet de GAUDISSARD Florian et DELBARRE Theo */
function lancement() {
    /*La fonction est lancé des le chargement de la page.Elle permet de lancer le main au clique sur le bouton commencer.*/
    let commencer = document.getElementById("commencer");
    commencer.addEventListener("click", main, false);
}

function Joueur(couleur, x, y, haut, bas, gauche, droite, saut, dx, dy) {
    /*La fonction permet de recupérer les données d'un joueur.*/
    this.couleur = couleur;
    this.x = x;
    this.y = y;
    this.score = 0;
    this.dir = 0;
    this.debut = [dx, dy];
    this.touche = [haut, bas, gauche, droite, saut];
    this.file = [];
    this.saut = 0;

}

Joueur.prototype.reset = function (x, y) {
    /*La fonction permet de reset certaines données d'un joueur. */
    this.x = x;
    this.y = y;
    this.dir = 0;
    this.file = [];
    this.saut = 0;
};

function main() {
    /*La fonction lance la boucle principale du jeu.*/
    /*Dans la boucle, on gère le bouton de redemarrage, la fenetre de modal */
    gagnant = document.getElementById("gagnant");
    gagnant.textContent = "";
    commencer.textContent = "REREDEMARRER";
    modal = document.getElementById("myModal");

    
    let btn = document.getElementById("myBtn");

    btn.onclick = function () {
    /*Permet d'afficher la fenetre de modal*/
        modal.style.display = "block";
        clearInterval(maj);
    };

    /*Ici on gere la pause et l'affichage des scores des deux joueurs */
    input = document.getElementById("input");
    label = document.getElementById("titre");

    let pause = document.getElementById("pause");
    pause.style.display = "block";

    btn.style.display = "block";

    PAUSE = false;
    commencer.disabled = true;

    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    p = document.getElementById("score_1");
    p2 = document.getElementById("score_2");
    p.style.display = "inline-block";
    p2.style.display = "inline-block";
    x = [1, 0, -1, 0];
    y = [0, 1, 0, -1];
    /*On initialise les couleurs et commandes des deux joueurs */
    j1 = new Joueur("LightSkyBlue", 1, 28, "KeyW", "KeyS", "KeyA", "KeyD", "KeyE", 1, 28);
    j2 = new Joueur("OrangeRed", 1, 30, "KeyO", "KeyL", "KeyK", "Semicolon", "Space", 1, 30);
    j1.score = 0;
    j2.score = 0;

    racc = ["Haut Joueur 1", "Bas Joueur 1", "Gauche Joueur 1", "Droite Joueur 1", "Saut Joueur 1", "Haut Joueur 2", "Bas Joueur 2", "Gauche Joueur 2", "Droite Joueur 2", "Saut Joueur 2"];

    raccourcis = 0;
    /*Ici on gère le jeu, on initialise le tableau et on dessine les joueurs. */
    initTableau();

    drawArc();
    draw();
    afficheScore();

    maj = setInterval(update, 100);

    document.addEventListener("keydown", changeDir, false);
    pause.addEventListener("click", mettrePause, false);
}

function update() {
    /*Met à jour le jeu */
    drawArc();
    collision();
    avance();
    draw();
}

function mettrePause() {
    /*La fonction permet de gérer la pause, quand elle est activée,on change l'etat à faux, quand on réappuie, on change l'état à vrai */
    if (PAUSE == false) {
        PAUSE = true;
        clearInterval(maj);
        document.removeEventListener("keydown", changeDir, false);
    } else if (PAUSE == true) {
        PAUSE = false;
        maj = setInterval(update, 100);
        document.addEventListener("keydown", changeDir, false);
    }
}

function changeDir(e) {
    /*La fonction permet de gérer les commandes de direction des joueurs. */
    if (e.code === j1.touche[0]) {
        j1.file.push(3);
    } else if (e.code === j1.touche[3]) {
        j1.file.push(0);
    } else if (e.code === j1.touche[1]) {
        j1.file.push(1);
    } else if (e.code === j1.touche[2]) {
        j1.file.push(2);
    } else if (e.code === j1.touche[4]) {
        j1.file.push(5);
    }
    if (e.code === j2.touche[0]) {
        j2.file.push(3);
    }
    if (e.code === j2.touche[3]) {
        j2.file.push(0);
    }
    if (e.code === j2.touche[1]) {
        j2.file.push(1);
    }
    if (e.code === j2.touche[2]) {
        j2.file.push(2);
    }
    if (e.code === j2.touche[4]) {
        j2.file.push(5);
    }
}

function avance() {
    /*La fonction permet de faire avancer les joueurs. On ajoute la valeur entrée grâce à la fonction changedir*/
    let saut1 = 0;
    let saut2 = 0;
    if (j1.saut == 1) {
        if (tableau[j1.x + x[j1.dir]][j1.y + y[j1.dir]] == 2 || tableau[j1.x + x[j1.dir]][j1.y + y[j1.dir]] == 1) {
            tableau[j1.x][j1.y] = 2;
            j1.x += x[j1.dir];
            j1.y += y[j1.dir];
            drawArc();
            tableau[j1.x][j1.y] = 2;
            j1.x += x[j1.dir];
            j1.y += y[j1.dir];
            saut1 = 1;
        }
        j1.saut = 0;
    }
    if (j2.saut == 1) {
        if (tableau[j2.x + x[j2.dir]][j2.y + y[j2.dir]] == 1 || tableau[j2.x + x[j2.dir]][j2.y + y[j2.dir]] == 2) {
            tableau[j2.x][j2.y] = 1;
            j2.x += x[j2.dir];
            j2.y += y[j2.dir];
            drawArc();
            tableau[j2.x][j2.y] = 1;

            j2.x += x[j2.dir];
            j2.y += y[j2.dir];
            saut2 = 1;
        }
        j2.saut = 0;

    }
    if (j1.saut == 0 && saut1 == 0) {
        tableau[j1.x][j1.y] = 2;
        j1.x += x[j1.dir];
        j1.y += y[j1.dir];
    }

    if (j2.saut == 0 && saut2 == 0) {
        tableau[j2.x][j2.y] = 1;
        j2.x += x[j2.dir];
        j2.y += y[j2.dir];
    }
    saut1 = 0;
    saut2 = 0;
}


function initTableau() {
    /*La fonction initialise le tableau de jeu sur lequel on dessine les joueurs. */
    tableau = [];
    let i;
    for ( i = 0; i < 80; i++) {
        let tab = [];
        for (let j = 0; j < 59; j++) {
            tab.push([]);
        }
        tableau.push(tab);
    }

    tableau[j1.debut[0]][j1.debut[1]] = 2;
    tableau[j2.debut[0]][j2.debut[1]] = 1;
}

function reset() {
    /*La fonction permet de de verifier quel joueur à gagné la partie.Elle remet ensuite toutes les données à zéro et affiche le score et quel joueur à gagné. */
    if (j1.score == 3 || j2.score == 3) {
        if (j1.score == 3) {
            gagnant.textContent = "Le joueur 1 a gagné";
            gagnant.style.color = j1.couleur;
        } else if (j2.score == 3) {
            gagnant.textContent = "Le joueur 2 a gagné";
            gagnant.style.color = j2.couleur;
        }
        document.getElementById("commencer").disabled = false;
        clearInterval(maj);
        commencer.disabled = false;
    }

    afficheScore();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    j1.reset(1, 28);
    j2.reset(1, 30);
    initTableau();


}

function collision() {
    /*La fonction permet de vérifier si il y a collision entre les deux joueurs ou entre un joueur et une extrémité du canvas ou entre un joueur et son propre tracé. */
    var p1, p2;
    if (((j1.x > 79) || (j1.x < 0) || (j1.y > 59) || (j1.y < 0))) {
        p1 = 1;
    } else if (tableau[j1.x][j1.y] == 1 || tableau[j1.x][j1.y] == 2) {
        p1 = 1;
    }
    if (((j2.x > 79) || (j2.x < 0) || (j2.y > 59) || (j2.y < 0))) {
        p2 = 1;
    } else if (tableau[j2.x][j2.y] == 2 || tableau[j2.x][j2.y] == 1) {
        p2 = 1;
    }


    if (p1 == 1 && p2 == 1) {
        reset();
        return;
    } else if (p1 == 1) {
        j2.score += 1;
        reset();
        return;
    } else if (p2 == 1) {
        j1.score += 1;
        reset();
        return;
    }
}

function drawArc() {
    /*La fonction permet de dessiner l'arrondie au bout des deux joueurs.
    Le cercle se dessine toujours dans la direction ,vers laquelle le joueur se dirige. */
    if (j1.file.length != 0) {
        let direc = j1.file.shift();
        if (direc == 0 && j1.dir != 2) {
            j1.dir = 0;
        } else if (direc == 1 && j1.dir != 3) {
            j1.dir = 1;
        } else if (direc == 2 && j1.dir != 0) {
            j1.dir = 2;
        } else if (direc == 3 && j1.dir != 1) {
            j1.dir = 3;
        }
        if (direc == 5) {
            j1.saut = 1;
        }
    }
    if (j2.file.length != 0) {
        let dir = j2.file.shift()
        if (dir == 0 && j2.dir != 2) {
            j2.dir = 0;
        } else if (dir == 1 && j2.dir != 3) {
            j2.dir = 1;
        } else if (dir == 2 && j2.dir != 0) {
            j2.dir = 2;
        } else if (dir == 3 && j2.dir != 1) {
            j2.dir = 3;
        }
        if (dir == 5) {
            j2.saut = 1;
        }
    }

    switch (j1.dir) {
        case 0:
            ctx.beginPath();
            ctx.fillStyle = j1.couleur;
            ctx.arc((j1.x * 10) + 10, j1.y * 10 + 5, 4.5, 0, Math.PI * 2, false);
            ctx.fill();
            break;

        case 1:
            ctx.beginPath();
            ctx.fillStyle = j1.couleur;
            ctx.arc(j1.x * 10 + 5, j1.y * 10 + 10, 4.5, 0, Math.PI * 2, false);
            ctx.fill();
            break;

        case 2:
            ctx.beginPath();
            ctx.fillStyle = j1.couleur;
            ctx.arc(j1.x * 10, j1.y * 10 + 5, 4.5, 0, Math.PI * 2, false);
            ctx.fill();
            break;

        case 3:
            ctx.beginPath();
            ctx.fillStyle = j1.couleur;
            ctx.arc(j1.x * 10 + 5, j1.y * 10, 4.5, 0, Math.PI * 2, false);
            ctx.fill();
            break;
    }
    switch (j2.dir) {
        case 0:
            ctx.beginPath();
            ctx.fillStyle = j2.couleur;
            ctx.arc((j2.x * 10) + 10, j2.y * 10 + 5, 4.5, 0, Math.PI * 2, false);
            ctx.fill();
            break;

        case 1:
            ctx.beginPath();
            ctx.fillStyle = j2.couleur;
            ctx.arc(j2.x * 10 + 5, j2.y * 10 + 10, 4.5, 0, Math.PI * 2, false);
            ctx.fill();
            break;

        case 2:
            ctx.beginPath();
            ctx.fillStyle = j2.couleur;
            ctx.arc(j2.x * 10, j2.y * 10 + 5, 4.5, 0, Math.PI * 2, false);
            ctx.fill();
            break;

        case 3:
            ctx.beginPath();
            ctx.fillStyle = j2.couleur;
            ctx.arc(j2.x * 10 + 5, j2.y * 10, 4.5, 0, Math.PI * 2, false);
            ctx.fill();
            break;
    }
}

function draw() {
    /*La fonction permet de dessiner les joueurs */
    for (l in tableau) {
        for (c in tableau) {
            if (tableau[l][c] == 1) {
                ctx.beginPath();
                ctx.fillStyle = j2.couleur;
                ctx.fillRect(l * 10, c * 10, 10, 10);
                ctx.fill();
            } else if (tableau[l][c] == 2) {
                ctx.beginPath();
                ctx.fillStyle = j1.couleur;
                ctx.fillRect(l * 10, c * 10, 10, 10);
                ctx.fill();
            }
        }
    }
}

function afficheScore() {
    /*La fonction permet d'afficher le score des deux joueurs. */
    p.textContent = j1.score;
    p2.textContent = j2.score;
}

function affiche() {
    label.textContent = racc[raccourcis];
}

function touche(e) {
    /*Cette fonction recupère les touches entrées par le joueur dans la fenetre modale. */
    event.stopPropagation();
    if (raccourcis < 10) {
        switch (raccourcis) {
            case 0:
                j1.touche[0] = e.code;
                break;
            case 1:
                j1.touche[1] = e.code;
                break;
            case 2:
                j1.touche[2] = e.code;
                break;
            case 3:
                j1.touche[3] = e.code;
                break;
            case 4:
                j1.touche[4] = e.code;
                break;
            case 5:
                j2.touche[0] = e.code;
                break;
            case 6:
                j2.touche[1] = e.code;
                break;
            case 7:
                j2.touche[2] = e.code;
                break;
            case 8:
                j2.touche[3] = e.code;
                break;
            case 9:
                j2.touche[4] = e.code;
                break;
            default:
                break;
        }
        raccourcis++;
        affiche();
        input.value = "";
    }
    /*Une fois que les deux joueurs ont choisis toutes leurs touches, on relance le jeu. */
    if (raccourcis == 10) {
        modal.style.display = "none";
        raccourcis = 0;
        input.textContent = "";
        label.textContent = "";

        if (PAUSE == true) {
            mettrePause();
        } else {
            maj = setInterval(update, 100);
        }
        document.addEventListener("keydown", changeDir, false);
    }
}


document.addEventListener("DOMContentLoaded", lancement, false);
