//(function()){

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCW6QZyEmMqh00tkWhUZNOH_McRSh0qjZ4",
    authDomain: "ytgameguide-44902.firebaseapp.com",
    databaseURL: "https://ytgameguide-44902.firebaseio.com",
    projectId: "ytgameguide-44902",
    storageBucket: "ytgameguide-44902.appspot.com",
    messagingSenderId: "175073065993",
    appId: "1:175073065993:web:3df0f4206ac2303b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Database aanspreekbaar maken
var firestore = firebase.firestore();
// Referentie naar database collection maken
var gameRef = firestore.collection("Game");
//Random getal genereren met als grootste het aantal vragen in Firebase Collection
var getoondeVragen = [];

let randomGetal = "";

//Methode voor gegegevens op te halen wordt opgeroepen
haalGegevensOp();

function maakRandomGetal() {
    randomGetal = "";
    randomGetal = (Math.floor((Math.random() * 5) + 1)).toString();
    //Random getal tonen mag later weg
    console.log(randomGetal);
}

//Variabele voor correct antwoord in te steken tonen
var antwoordc = "";

//Ophalen van vlognummer dat overeenkomt met het random gegenereerde getal
//Indien het Type MCSA is worden de radaiobuttons gerenderd en alle nodige gegevens worden erin gestoken
function haalGegevensOp() {
    maakRandomGetal();
    console.log(getoondeVragen);
    if (getoondeVragen.includes(randomGetal) == false) {
        gameRef.where("Volgnummer", "==", randomGetal.toString())
            .get()
            .then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    let aantalAntwoorden = (doc.id, " => ", doc.data().aantalAntwoorden);

                    getoondeVragen.push(randomGetal);
                    if (doc.data().Type == "MCSA") {
                        renderRadiobuttons(doc, aantalAntwoorden);
                    } else if (doc.data().Type == "MCMA") {
                        renderCheckboxes(doc, aantalAntwoorden);
                    }


                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    } else {
        maakRandomGetal();
        haalGegevensOp();
    }
}



//Radio Buttons opvullen met antwoorden van de database
function renderRadiobuttons(doc, aantalAntwoorden) {
    document.getElementById("controleRadioButton").style.display = "block";
    //console.log(aantalAntwoorden)
    document.getElementById("vraag").innerText = doc.data().Vraag;
    for (i = 0; i < aantalAntwoorden; i++) {
        let labelNummer = ("labelRadio" + i).toString();
        document.getElementById(labelNummer).style.display = "block";

        //Antwoord in html is verander naar een GROTE A PLS LEES DIT STRAKS
        let antwoordNummer = ("AntwoordRadio" + i).toString();

        //console.log(doc.data().Antwoorden[i]);
        document.getElementById(antwoordNummer).innerText = doc.data().Antwoorden[i];
    }
    antwoordc = doc.data().Correct;
}

//Controle van gekozen radiobutton met correct antwoord
controleRadioButton.addEventListener("click", function () {
    for (i = 0; i < document.quiz.group1.length; i++) {
        var radioString = "radio" + i;
        var spanAntwoord = "AntwoordRadio" + i;
        if (document.getElementById(radioString).checked) {
            var gekozenantwoord = document.getElementById(spanAntwoord).innerText;
            if (gekozenantwoord == antwoordc) {
                console.log("correct");
            } else {
                console.log("fout");
            }
        }
    }
    antwoordc = "";
    clearVraag();
    clearRadioButtons();
})


//Checkboxes opvullen met antwoorden van de database
function renderCheckboxes(doc, aantalAntwoorden) {
    document.getElementById("controleCheckButton").style.display = "block";
    //console.log(aantalAntwoorden)
    document.getElementById("vraag").innerText = doc.data().Vraag;
    for (i = 0; i < aantalAntwoorden; i++) {
        let labelNummer = ("labelCheck" + i).toString();
        document.getElementById(labelNummer).style.display = "block";

        //Antwoord in html is verander naar een GROTE A PLS LEES DIT STRAKS
        let antwoordNummer = ("AntwoordCheck" + i).toString();

        //console.log(doc.data().Antwoorden[i]);
        document.getElementById(antwoordNummer).innerText = doc.data().Antwoorden[i];
    }
    antwoordc = doc.data().Correct;

}

controleCheckButton.addEventListener("click", function () {
    var gekozenantwoord = [];
    for (i = 0; i < document.quiz.group2.length; i++) {
        var checkString = "check" + i;
        var spanAntwoord = "AntwoordCheck" + i;
        if (document.getElementById(checkString).checked === true) {
            gekozenantwoord[i] = document.getElementById(spanAntwoord).innerText;
            console.log(gekozenantwoord);
        }
    }
    var filteredGekozenAntwoord = gekozenantwoord.filter(function (el) {
        return el != null;
    });
    console.log(filteredGekozenAntwoord)
    console.log(antwoordc);


    if (JSON.stringify(filteredGekozenAntwoord) === JSON.stringify(antwoordc)) {
        console.log("correct");
    } else {
        console.log("fout");
    }

    antwoordc = "";
    clearVraag();
    clearCheckboxButtons();

})


function clearVraag() {
    document.getElementById("vraag").innerText = "";
}

function clearRadioButtons() {
    document.getElementById("controleRadioButton").style.display = "none";
    for (i = 0; i < document.quiz.group1.length; i++) {
        var radioString = "radio" + i;
        var radioLabelString = ("labelRadio" + i).toString();
        let antwoordNummer = ("AntwoordRadio" + i).toString();
        document.getElementById(radioString).checked = false;
        document.getElementById(radioLabelString).style.display = "none";
        document.getElementById(antwoordNummer).innerText = "";
    }
    randomGetal = "";
    maakRandomGetal()
    haalGegevensOp();
}

function clearCheckboxButtons() {
    document.getElementById("controleCheckButton").style.display = "none";
    for (i = 0; i < document.quiz.group2.length; i++) {
        var checkString = "check" + i;
        let labelNummer = ("labelCheck" + i).toString();
        var spanAntwoord = "AntwoordCheck" + i;
        document.getElementById(checkString).checked = false;
        document.getElementById(labelNummer).style.display = "none";
        document.getElementById(spanAntwoord).innerText = "";
    }
    randomGetal = "";
    maakRandomGetal()
    haalGegevensOp();
}



//Save Data to Firebase
/*
saveButton.addEventListener("click", function () {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRef.set({
        hotDogStatus: textToSave
    }).then(function () {
        console.log("Status saved!");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});


loadButton.addEventListener("click", function () {
    docRef.get().then(function (doc) { //get document snapshot
        if (doc && doc.exists) {
            const myData = doc.data();
            outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
        }
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});*/

//checkIfEmpty();

/*
function checkIfEmpty() {
    if (pEmpty == "") {
        getDataQuestion();
    }

    if (radioEmpty = true) {
        getDataAnswers();
    }
}

function getDataQuestion() {
    gameRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            vraag.innerText = myData.Vraag;
        }
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
}


*/
