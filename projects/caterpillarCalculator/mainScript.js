var catPrice = 4686000;
var togetherMoney;


function drawElements() {
    var contentWrapperElement = document.getElementById("contentWrapper");

    var resultWrapperElement = document.createElement("div");
    resultWrapperElement.setAttribute("id", "resultWrapper");

    var textHeader = document.createElement("span");
    textHeader.textContent = "Is it enough for a Caterpillar?";
    textHeader.setAttribute("class", "biloLight smallHeader isEnough");

    var resultPrintElement = document.createElement("div");
    resultPrintElement.setAttribute("id", "resultPrint");

    var restAmountElement = document.createElement("span");
    restAmountElement.setAttribute("id", "restAmount");
    restAmountElement.setAttribute("class", "biloLight smallHeader");

    var btnElement = document.createElement("button");
    btnElement.setAttribute("class", "biloLight btn btn-primary");
    btnElement.setAttribute("onclick", "back();")
    btnElement.textContent = "back";

    resultWrapperElement.appendChild(textHeader);
    resultWrapperElement.appendChild(resultPrintElement);
    resultWrapperElement.appendChild(restAmountElement);
    resultWrapperElement.appendChild(btnElement);

    contentWrapperElement.prepend(resultWrapperElement);
}

function nextExec() {

    var valuesHTMLcollection = document.getElementsByClassName("inputCheck");
    var playerAmount = 0;

    for(i = 0; i < Array.from(valuesHTMLcollection).length; i++) {

        let tempAmount = parseInt(valuesHTMLcollection[i].value.split(".").join("").match(/\d/g).join(''), 10);

        playerAmount = playerAmount + tempAmount;
    }
    
    if(playerAmount >= catPrice) {
        drawElements();
        document.getElementById("resultPrint").textContent = "Yes";

    } else {
        drawElements();
        document.getElementById("resultPrint").textContent = "No";
        document.getElementById("restAmount").textContent = "Rest amount needed: " + (catPrice - playerAmount) + " aUEC";

    }
}

function back() {
    document.getElementById("resultWrapper").remove();
}


function addListener() {
    var valuesHTMLcollection = document.getElementsByClassName("inputCheck");

    for(i = 0; i < Array.from(valuesHTMLcollection).length; i++) {

        valuesHTMLcollection[i].addEventListener("keyup", function(){
            managePrices();
        });
    }
}

function managePrices() {

    // gesamtes Geld
    var togetherElement = document.getElementById("together")

    // empty Array for all number inputs
    var input = [];

    // run 3 times, for 3 input fields
    for (i = 1; i < 4 ; i++) {

        // get all IDs
        var searchInput = "input" + i.toString();

        // only try input field if there's a number
        if (document.getElementById(searchInput).value.match(/\d/g) == null) {
            input[i] = 0;
        } 
        else {
            input[i] = document.getElementById(searchInput).value.match(/\d/g).join(''), 10;
        }
    }

    // assign global var; Is all money combined
    togetherMoney = parseInt(input[1]) + parseInt(input[2]) + parseInt(input[3])
    
    // assign all money to gesamt Element
    togetherElement.textContent =  togetherMoney;
    

    // Split it
    let ele = togetherElement;

    ele = ele.textContent.split('.').join('');

    let finalVal = ele.match(/.{1,3}(?=(.{3})*$)/g).join('.');
    togetherElement.textContent = finalVal;

}

function addDot(element) {

    let ele = document.getElementById(element.id);

    ele = ele.value.split('.').join('');

    if(document.getElementById(element.id).value.match(/\d/g) != null) {

        let finalVal = ele.match(/.{1,3}(?=(.{3})*$)/g).join('.');
        document.getElementById(element.id).value = finalVal;

    }
}

function loadDefaults() {

    var dataCollection = document.getElementsByClassName("sqlData");
    var inputFieldCollection = document.getElementsByClassName("inputCheck");
 
    for (i = 0; i < dataCollection.length; i++) {

        inputFieldCollection[i].value = parseInt(dataCollection[i].textContent);
        addDot(inputFieldCollection[i]);
  
    }
    managePrices();

}

