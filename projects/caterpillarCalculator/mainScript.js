var catPrice = 4686000;
var togetherMoney;

function sleep(ms) {
    
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawElements() {

    var calcWrapperElement = document.getElementById("calcWrapper");


    // generate HTML for resultWrapper
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

    // fade out calc wrapper
    calcWrapperElement.style.opacity = "0";
    // wait for transition to finish
    await sleep(250);
    // get rid of the Wrapper so it doesnt interfere
    calcWrapperElement.style.display = "none";

    // get rid of the next btn
    var nextbtnElement = document.getElementById("nextBTN");
    nextbtnElement.style.display = "none";

    // prepare result wrapper for fade-in
    resultWrapperElement.style.opacity = "0";

    // adjust contentWrapper size
    contentWrapperElement.style.width = "80%";
    contentWrapperElement.style.marginLeft = "10%";
    contentWrapperElement.style.height = "80vh";
    contentWrapperElement.style.marginTop = "10vh";

    resultWrapperElement.appendChild(textHeader);
    resultWrapperElement.appendChild(resultPrintElement);
    resultWrapperElement.appendChild(restAmountElement);
    resultWrapperElement.appendChild(btnElement);

    contentWrapperElement.prepend(resultWrapperElement);

    // fade in result wrapper
    resultWrapperElement.style.opacity = 1;
    // wait for transition for finish
    await sleep(251);
}

async function nextExec() {

    
    var valuesHTMLcollection = document.getElementsByClassName("inputCheck");
    var playerAmount = 0;

    for(i = 0; i < Array.from(valuesHTMLcollection).length; i++) {

        let tempAmount = parseInt(valuesHTMLcollection[i].value.split(".").join("").match(/\d/g).join(''), 10);

        playerAmount = playerAmount + tempAmount;
    }

    

    if(playerAmount >= catPrice) {

        drawElements();
        await sleep(500);
        var resultPrintElement = document.getElementById("resultPrint");
        resultPrintElement.style.opacity = "0";
        resultPrintElement.textContent = "Yes";
        resultPrintElement.style.opacity = "1";

    } else {
        drawElements();
        await sleep(500);
        var resultPrintElement = document.getElementById("resultPrint");
        resultPrintElement.style.opacity = "0";
        resultPrintElement.textContent = "No";
        resultPrintElement.style.opacity = "1";
        
        document.getElementById("restAmount").textContent = "Rest amount needed: " + (catPrice - playerAmount) + " aUEC";

    }
}

async function back() {

    // get divs
    var contentWrapperElement = document.getElementById("contentWrapper");
    var calcWrapperElement = document.getElementById("calcWrapper");
    var resultWrapperElement = document.getElementById("resultWrapper")

    // fade out result wrapper
    resultWrapperElement.style.opacity = "0";

    // wait for transition to finish
    await sleep(250);

    // fade in calc wrapper
    calcWrapperElement.style.opacity = "1";
    calcWrapperElement.style.display = "block";

    // fade in btn
    var nextbtnElement = document.getElementById("nextBTN");

    nextbtnElement.style.opacity = "0";
    nextbtnElement.style.display = "inline-block";
    nextbtnElement.style.opacity = "1";
    

    // wait for transition to finish
    await sleep(250);

    // adjust contentWrapper size
    contentWrapperElement.style.width = "50%";
    contentWrapperElement.style.marginLeft = "25%";
    contentWrapperElement.style.height = "fit-content";
    contentWrapperElement.style.marginTop = "10%";

    // remove HTML once faded out
    resultWrapperElement.remove();

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

