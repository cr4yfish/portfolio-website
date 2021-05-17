var catPrice = 4686000;

function cleaner() {

    localStorage.removeItem("isBuyable");

    var valuesHTMLcollection = document.getElementsByClassName("listEntryInput");
    for(i = 0; i < Array.from(valuesHTMLcollection).length; i++) {
        valuesHTMLcollection[i].value = null;
    }
    document.getElementById("together").textContent = "0";
}

function drawElements() {
    var contentWrapperElement = document.getElementById("contentWrapper");

    var resultWrapperElement = document.createElement("div");
    resultWrapperElement.setAttribute("id", "resultWrapper");

    var textHeader = document.createElement("span");
    textHeader.textContent = "Is it enough for a Caterpillar?";
    textHeader.setAttribute("class", "smallHeader isEnough");

    var resultPrintElement = document.createElement("div");
    resultPrintElement.setAttribute("id", "resultPrint");

    var restAmountElement = document.createElement("span");
    restAmountElement.setAttribute("id", "restAmount");
    restAmountElement.setAttribute("class", "smallHeader");

    var btnElement = document.createElement("button");
    btnElement.setAttribute("class", "btn btn-primary");
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
    console.log(valuesHTMLcollection);
    var playerAmount = 0;

    for(i = 0; i < Array.from(valuesHTMLcollection).length; i++) {
        console.log(valuesHTMLcollection[i]);
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
    cleaner();
    document.getElementById("resultWrapper").remove();
}

function addListener() {
    var valuesHTMLcollection = document.getElementsByClassName("listEntryInput");

    for(i = 0; i < Array.from(valuesHTMLcollection).length; i++) {

        var togetherElement = document.getElementById("together")
        valuesHTMLcollection[i].addEventListener("keyup", function() {

            var input = [];

            for (i = 1; i < 4 ; i++) {
                var searchInput = "input" + i.toString();

                if (document.getElementById(searchInput).value.match(/\d/g) == null) {
                    input[i] = 0;
                } 
                else {
                    input[i] = document.getElementById(searchInput).value.match(/\d/g).join(''), 10;
                }
                
            }

            togetherElement.textContent =  parseInt(input[1]) + parseInt(input[2]) + parseInt(input[3]);
            
            let ele = togetherElement;

            ele = ele.textContent.split('.').join('');    // Remove dash (-) if mistakenly entered.
        
            let finalVal = ele.match(/.{1,3}(?=(.{3})*$)/g).join('.');
            togetherElement.textContent = finalVal;

        })
    }

}

function addDot(element) {

    let ele = document.getElementById(element.id);

    ele = ele.value.split('.').join('');    // Remove dash (-) if mistakenly entered.

    if(document.getElementById(element.id).value.match(/\d/g) != null) {

        let finalVal = ele.match(/.{1,3}(?=(.{3})*$)/g).join('.');
        document.getElementById(element.id).value = finalVal;
        
    }



}
