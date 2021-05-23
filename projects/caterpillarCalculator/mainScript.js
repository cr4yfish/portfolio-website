var catPrice = 4686000;
var togetherMoney;

function sleep(ms) {
    
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawElements() {

    var calcWrapperElement = document.getElementById("calcWrapper");
    var resultWrapperElement = document.getElementById("resultWrapper");

    // fade out calc wrapper animation
    calcWrapperElement.style.opacity = "0";
    calcWrapperElement.style.width = "0%"

    var nextbtnElement = document.getElementById("nextBTN");
    nextbtnElement.style.opacity = "0";
    await sleep(200);

    // fade in result wrapper animation
    resultWrapperElement.style.zIndex = 1;
    resultWrapperElement.style.opacity = 1;
    resultWrapperElement.style.width = "100%";
    
    // wait for possible transitions for finish
    await sleep(250);

    // get rid of stuff so it doesn't interfere
    calcWrapperElement.style.display = "none";
    nextbtnElement.style.display = "none";
}

async function nextExec() {

    
    var valuesHTMLcollection = document.getElementsByClassName("inputCheck");
    var playerAmount = 0;

    for(i = 0; i < Array.from(valuesHTMLcollection).length; i++) {

        if ( isNaN(parseInt(valuesHTMLcollection[i].value))  == false ) {
            var tempAmount = parseInt(valuesHTMLcollection[i].value.split(".").join("").match(/\d/g).join(''), 10);
        } else {
            var tempAmount = 0;
        }
        

        playerAmount = playerAmount + tempAmount;
    }

    

    if(playerAmount >= catPrice) {
        drawElements();

    } else {
        drawElements();
    }
}

async function back() {

    // get divs
    var calcWrapperElement = document.getElementById("calcWrapper");
    var resultWrapperElement = document.getElementById("resultWrapper")
    var nextbtnElement = document.getElementById("nextBTN");


    // fade out result wrapper
    resultWrapperElement.style.width = "0";
    resultWrapperElement.style.zIndex = "-1";
    calcWrapperElement.style.display = "block";
    calcWrapperElement.style.opacity = "1";

    // wait for transition
    await sleep(100);
    resultWrapperElement.style.opacity = "0";
    // fade in calc wrapper
    calcWrapperElement.style.width = "60%"
    
    // fade in btn
    nextbtnElement.style.display = "inline-block";
    nextbtnElement.style.opacity = "1";
    
    // wait for transition to finish
    await sleep(250);

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

    // calculate new rest amounts
    insertRestAmount();
}

function addDot(element) {

    let ele = document.getElementById(element.id);

    ele = ele.value.split('.').join('');

    if(document.getElementById(element.id).value.match(/\d/g) != null) {

        let finalVal = ele.match(/.{1,3}(?=(.{3})*$)/g).join('.');
        document.getElementById(element.id).value = finalVal;

    }
}

function addDotsMultipleElements() {

    var eleCollection = document.getElementsByClassName("resultGridPrice");


    for (i = 0; i < eleCollection.length; i++) {


        if (isNaN(parseInt(eleCollection[i].textContent)) == false) {
            var ele  = eleCollection[i].textContent.split(" ").join("");

            if(ele != null) {
        
                let finalVal = ele.match(/.{1,3}(?=(.{3})*$)/g).join('.');
                eleCollection[i].textContent = finalVal;
    
            } else {
                console.log("You just inserted a NULL @i=", i);
            }
        }

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

function insertRestAmount() {
    var resultGridPrice = document.getElementsByClassName("resultGridPrice");
    var resultGridRest = document.getElementsByClassName("resultGridRest");

    
    for (i = 0; i < resultGridPrice.length;i++) {

        if (isNaN(parseInt(resultGridPrice[i].textContent)) == false) {

            let shipPriceString = resultGridPrice[i].textContent.split(".").join("")
            shipPriceInt = parseInt(shipPriceString);
            resultGridRest[i].textContent =  togetherMoney - shipPriceInt;
    
            if ( (togetherMoney - shipPriceInt) < 0) {
                resultGridRest[i].style.color = "#E19A9A";
            } else {
                resultGridRest[i].style.color = "#79BF79";
            }
    
            resultGridRest[i].textContent;
    
            let ele = resultGridRest[i].textContent;
    
            ele = ele.split('.').join('');
            ele = ele.split('-').join('');
        
            if(resultGridRest[i].textContent.match(/\d/g) != null) {
        
                let finalVal = ele.match(/.{1,3}(?=(.{3})*$)/g).join('.');
                resultGridRest[i].textContent = finalVal + " aUEC";
        
            }
        } else {
            resultGridRest[i].textContent = "Not buyable";
        }

    }
}