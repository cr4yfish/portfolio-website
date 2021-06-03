AOS.init();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$.getJSON('code/projects.json', function(projectsJSON) {

    for (i = 0; i < projectsJSON.length; i++) {
        var timelineWrapper = document.getElementById("timelineWrapper");
    
        let entryWrapper = document.createElement("div");
        entryWrapper.setAttribute("class", "entry_wrapper");
        entryWrapper.setAttribute("data-aos", "fade-up");
    
        let entryHeader = document.createElement("div");
        entryHeader.setAttribute("class", "entryHeader");
    
        let entryTitle = document.createElement("span");
        entryTitle.setAttribute("class", "entryTitle rubik_regular pointer");
        // window.open('link.html', '_blank');
        entryTitle.setAttribute("onclick", "window.open('" + projectsJSON[i].link + "', '_blank');");
    
        let entryDate = document.createElement("span");
        entryDate.setAttribute("class", "entryDate rubik_light unselectable");
    
        
        let entryText = document.createElement("span");
        entryText.setAttribute("class", "entryText rubik_light");
    
        entryTitle.textContent = projectsJSON[i].name;
        entryDate.textContent = projectsJSON[i].date;
        entryText.innerHTML = projectsJSON[i].text;
    
        entryHeader.appendChild(entryTitle);
        entryHeader.appendChild(entryDate);
        // tags
        tagArray = projectsJSON[i].type.split(",");
    
        for (tagCounter = 0; tagCounter < tagArray.length; tagCounter++) {
            
            let entryType = document.createElement("span");
            entryType.setAttribute("class", "entryTag entryDate rubik_light unselectable");
            entryType.textContent = tagArray[tagCounter];
    
            entryHeader.appendChild(entryType);
        }
    
        entryWrapper.appendChild(entryHeader);
        entryWrapper.appendChild(entryText);
    
        timelineWrapper.appendChild(entryWrapper);
    }
})




async function callPopUp(element) {

    $.getJSON('code/codeSkills.json', function(codeSkilsJSON) {
    
        // get current language
        currentElement = element.id;
        var currentLanguage;
        for (i = 0; i < codeSkilsJSON.length;i++) {
            if (codeSkilsJSON[i].name == currentElement) {
                currentLanguage = codeSkilsJSON[i];
            }
        }

        // build overlay
        var overlayElement = document.createElement("div");
        overlayElement.setAttribute("id", "opacityLayer");
        overlayElement.setAttribute("class", "pointer");
        overlayElement.setAttribute("onclick", "removePopup()");


        // build popup
        var popupWrapperElement = document.createElement("div");
        popupWrapperElement.setAttribute("id", "popupWrapper");

        var popupHeader = document.createElement("h1");
        popupHeader.setAttribute("class", "brevia_bold unselectable");

        var popupText = document.createElement("p");
        popupText.setAttribute("class", "rubik_light");

        // insert text
        popupHeader.textContent = currentLanguage.name;
        popupText.textContent = currentLanguage.skills;

        // attach
        popupWrapperElement.appendChild(popupHeader);
        popupWrapperElement.appendChild(popupText);

        var bodyElement = document.getElementsByTagName("body")[0];
        bodyElement.prepend(overlayElement);
        bodyElement.prepend(popupWrapperElement);

        await sleep(100);
        popupWrapperElement.style.opacity = "1";
        popupWrapperElement.style.width = "50%";
        overlayElement.style.opacity = "1";
    })
}

async function removePopup() {

    popupWrapperElement = document.getElementById("popupWrapper");
    overlayElement = document.getElementById("opacityLayer");

    popupWrapperElement.style.width = "0%";
    overlayElement.style.opacity = "0%";

    await sleep(500);
    popupWrapperElement.style.opacity = "0%";

    await sleep(500);
    popupWrapperElement.remove();
    overlayElement.remove();
}