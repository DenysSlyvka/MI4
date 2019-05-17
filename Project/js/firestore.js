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
var firestore = firebase.firestore();

const docRef = firestore.doc("/game_vragen/vraag1");

const vraag = document.querySelector("#vraag")
const antwoord1 = document.querySelector("#antwoord1")
const antwoord2 = document.querySelector("#antwoord2")
const antwoord3 = document.querySelector("#antwoord3")
const antwoord4 = document.querySelector("#antwoord4")
var antwoordc;

var antwoordRadio1 = document.getElementById("antwoord1").innerText;
var antwoordRadio2 = document.getElementById("antwoord2").innerText;
var antwoordRadio3 = document.getElementById("antwoord3").innerText;
var antwoordRadio4 = document.getElementById("antwoord4").innerText;
var radioEmpty;

const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const controleButton = document.querySelector("#controleButton");

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


function getData() {
    docRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            vraag.innerText = myData.vraag;
            antwoord1.innerText = myData.antwoord1;
            antwoord2.innerText = myData.antwoord2;
            antwoord3.innerText = myData.antwoord3;
            antwoord4.innerText = myData.antwoord4;
            antwoordc = myData.antwoordc;
        }
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
}

if (radioEmpty = true) {
    getData();
}

controleButton.addEventListener("click", function () {

    if (document.getElementById("radio1").checked) {
        var gekozenantwoord = document.getElementById("antwoord1").innerText

        if (gekozenantwoord == antwoordc) {
            console.log("correct")
        } else {
            console.log("Fout")
        }
    } else if (document.getElementById("radio2").checked) {
        var gekozenantwoord2 = document.getElementById("antwoord2").innerText

        if (gekozenantwoord2 == antwoordc) {
            console.log("correct")
        } else {
            console.log("Fout")
        }
    } else if (document.getElementById("radio3").checked) {
        var gekozenantwoord2 = document.getElementById("antwoord3").innerText

        if (gekozenantwoord2 == antwoordc) {
            console.log("correct")
            clearRadioButtons()
        } else {
            console.log("Fout")
        }
    } else if (document.getElementById("radio4").checked) {
        var gekozenantwoord2 = document.getElementById("antwoord4").innerText

        if (gekozenantwoord2 == antwoordc) {
            console.log("correct")
        } else {
            console.log("Fout")
        }
    }
})

function checkRadioEmpty() {
    if ((antwoordRadio1 = "") &&
        (antwoordRadio2 = "") &&
        (antwoordRadio3 = "") &&
        (antwoordRadio4 = "")) {
        radioEmpty = true;
    }
}

function clearRadioButtons() {
    antwoordRadio1 = ""
    antwoordRadio2 = ""
    antwoordRadio3 = ""
    antwoordRadio4 = ""
}
