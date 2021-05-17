function sleep(ms) {
    
    return new Promise(resolve => setTimeout(resolve, ms));
}

var searchedDay = "Dienstag";
var isday;
var Date = new Date();
var currentDay = Date.getDay();

var dayArray = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

function checkDay() {

    console.log(dayArray.indexOf(searchedDay));

    dayArray.forEach(element => {
        if (dayArray.indexOf(searchedDay) == currentDay) {
            isday = "ja."
        } else {
            isday = "nein."
        }
    });

    return isday;
}

function drawDay() {
    var dayTextElement = document.getElementById("answer");
    dayTextElement.textContent = checkDay();
}