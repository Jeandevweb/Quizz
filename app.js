const form               = document.querySelector('.form-quizz');
let tableauResultat      = [];
const reponses           = ['c','a','b','a','c'];
const emojis             = ['✔️','✨','👀','😭','👎'];
const titreResultat      = document.querySelector('.resultats h2');
const noteResultat      = document.querySelector('.note');
const aideResultat       = document.querySelector('.aide');
const toutesLesQuestions = document.querySelectorAll('.question-block');
let verifTableau = [];

form.addEventListener('submit', (e) => {
    e.preventDefault(); //permet de ne pas actualiser la page

    console.log(document.querySelector('input[name="q1"]:checked').value);

    //on va iterer 5fois car il y a 5 questions et donc 5résultats
    for(i = 1; i < 6; i++) {
        tableauResultat.push(document.querySelector(`input[name="q${i}"]:checked`).value)
        //on recupère les données dynamiquement que l'on va pusher dans le tableau vide déja créer
        //on utilise les `` et le $ pour les afficher dynamiquement. c'est i qui donnera les question1, 2,3... grace a la boucle for
    }
    //console.log(tableauResultat);
    verifFunc(tableauResultat);
    tableauResultat = [];
})

function verifFunc(tabResultat){
    for(let a = 0; a < 5; a++) {
        
        if(tabResultat[a] === reponses[a]) {
            verifTableau.push(true);
        } else {
            verifTableau.push(false);
        }

    }

    //console.log(verifTableau);
    afficherResultats(verifTableau);
    couleursFonction(verifTableau);
    verifTableau = [];
}

function afficherResultats(tabCheck) {
    const nombreDeFautes = tabCheck.filter(el => el !== true).length;  //ici on filtre chaque élément qui est strcitement différent de true. la methode filter() permet de filtrer et de créer un nouveau tableau avec les éléments voulu. et on renvoi la longueur du tableau comme réponse

    switch(nombreDeFautes) {

        case 0:
            titreResultat.innerText = "Bravo, c'est un sans faute ! ✔️";
            aideResultat.innerText = '';
            noteResultat.innerText = '5/5 !';
            break;

        case 1:
            titreResultat.innerText = `✨ Vous y êtes presque ! ✨`;
            aideResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
            noteResultat.innerText = '4/5';
            break;

        case 2:
            titreResultat.innerText = `✨ Encore un effort ... 👀`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '3/5';
            break;

        case 3:
            titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`;
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '2/5';
            break;

        case 4:
            titreResultat.innerText = `😭 Peux mieux faire ! 😭`;
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '1/5';
            break;

        case 5:
            titreResultat.innerText = `👎 Peux mieux faire ! 👎`;
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '0/5';
        break;

        default:
            'Wops, cas innatendu.';

        
    }
};

function couleursFonction(tabValBool) {
    for(let j = 0; j < tabValBool.length; j++) {
        if(tabValBool[j] === true) {
            toutesLesQuestions[j].style.background = 'lightgreen';
    } else {
        toutesLesQuestions[j].style.background = '#ffb8b8';
        toutesLesQuestions[j].classList.add('echec');

        setTimeout(() => {
            toutesLesQuestions[j].classList.remove('echec');    
        }, 500) 
    }
}};

toutesLesQuestions.forEach(item => { //item représente ici chaque bloc de questions(question 1, question 2... Onvient donc boucler sur chaque item)
    //forEach permet de boucler sur chaque item forEach = pour chaque
    item.addEventListener('click', () => {
        item.style.background = 'white';
        //littéralement ici au click pour chaque item/questions le background du bloc repassera en blanc.
    })
});

