AOS.init();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// remove "no-javascript" function
(function() {
    let element = document.getElementById("no-javascript");
    element.remove();
    return;
})();

$.getJSON('code/projects.json', function(projectsJSON) {

    for (i = 0; i < projectsJSON.length; i++) {
        var timelineWrapper = document.getElementById("timelineWrapper");
    
        let entryWrapper = document.createElement("div");
        entryWrapper.setAttribute("class", "entry_wrapper");
        entryWrapper.setAttribute("data-aos", "fade-up");
        entryWrapper.setAttribute("index", i);
    
        // only get thumbnail if I provided one to avoid errors
        if (projectsJSON[i].thumbnail != undefined) {

            let entryThumbnail = document.createElement("div");
            entryThumbnail.setAttribute("class", "entryThumbnail");

            let entryImg = document.createElement("img");
                entryImg.setAttribute("src", "code/thumbnails/" + projectsJSON[i].thumbnail);

            entryThumbnail.appendChild(entryImg);
            entryWrapper.appendChild(entryThumbnail);
        }

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
    
        let entryMore = document.createElement("div");
            entryMore.setAttribute("class", "entryMore rubik_light");
            entryMore.setAttribute("onclick", "readMore(this);")
            entryMore.textContent = "Read more";
        
        entryWrapper.appendChild(entryHeader);
        entryWrapper.appendChild(entryText);
        entryWrapper.appendChild(entryMore);
    
        timelineWrapper.appendChild(entryWrapper);
    }
})




async function callPopUp(element) {

    $.getJSON('code/codeSkills.json', async function(codeSkilsJSON) {
    
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

function readMore(element) {

    let index = element.parentNode.getAttribute("index");

    $.getJSON('code/projects.json', async function(projectsJSON) {
 
        /*
        "name": "Take the Bus",
        "date": "2021",
        "text": "I wanted to start learning true backend development. So I got the idea to create a backend API that I could call from a frontend Website. For the execution, I got the idea to create a public transport route planning Webapp for my local transport services. The backend API will handle requests from the Webapp and takes the route as input and gives an output in form of the best found route. The output will then be handled by the frontend JS and displayed in a popup.",
        "link": "https://manuelfahmy.de/projects/takeTheBus",
        "type": "In Development, JS, Backend, API",
        "learned": "Local authorities don't respond to my emails."
        */

        // build a popup and paste data, UI is already done

        let currentProject = projectsJSON[index];

        let body = document.getElementsByTagName("body")[0];

        // build overlay
        var overlayElement = document.createElement("div");
        overlayElement.setAttribute("id", "opacityLayer");
        overlayElement.setAttribute("class", "pointer");
        overlayElement.setAttribute("onclick", "closePopup()");
        body.prepend(overlayElement);
        overlayElement.style.opacity = "1";

        // hide overflow of everything else
        let html = document.getElementsByTagName("html")[0];
            html.style.overflow = "hidden";

        let entryPopup = document.createElement("div");
            entryPopup.setAttribute("id","entryPopup");

        body.prepend(entryPopup);
        
        let popupLeftSide = document.createElement("div");
            popupLeftSide.setAttribute("id", "popupLeftSide");
        entryPopup.appendChild(popupLeftSide);

            let entryTitle = document.createElement("div");
                entryTitle.setAttribute("class", "entryTitle pointer rubik_regular");
                //window.open('https://manuelfahmy.de/', '_blank');
                //window.open(https://manuelfahmy.de/, '_blank');
                entryTitle.setAttribute("onclick", "window.open('" + currentProject.link + "', '_blank');");
                entryTitle.textContent = currentProject.name;
            popupLeftSide.appendChild(entryTitle);

            let thumbnail = document.createElement("img");
                thumbnail.setAttribute("class","popupImage");
                thumbnail.setAttribute("src", "code/thumbnails/" + currentProject.thumbnail);
                thumbnail.setAttribute("alt", "");
            popupLeftSide.appendChild(thumbnail);

            let texts = document.createElement("div");
                    texts.setAttribute("class", "texts");
                popupLeftSide.appendChild(texts);

                // description text
                let popupTextWrapperText = document.createElement("div");
                    popupTextWrapperText.setAttribute("class", "popupTextWrapper");
                texts.appendChild(popupTextWrapperText);

                    let titleDesc = document.createElement("h3");
                        titleDesc.setAttribute("class", "textWrapperTitle rubik_regular");
                        titleDesc.textContent = "Descritption";
                    popupTextWrapperText.appendChild(titleDesc);

                    let entryText = document.createElement("span");
                        entryText.setAttribute("class", "entryText rubik_light");
                        entryText.innerHTML = currentProject.text;
                    popupTextWrapperText.appendChild(entryText);

                // what i learned
                let popupTextWrapperLearned = document.createElement("div");
                    popupTextWrapperLearned.setAttribute("class", "popupTextWrapper");
                texts.appendChild(popupTextWrapperLearned);

                    let titleLearn = document.createElement("h3");
                        titleLearn.setAttribute("class", "textWrapperTitle rubik_regular");
                        titleLearn.textContent = "What I learned";
                    popupTextWrapperLearned.appendChild(titleLearn);

                    let entryTextLearn = document.createElement("span");
                        entryTextLearn.setAttribute("class", "entryText rubik_light");
                        entryTextLearn.textContent = currentProject.learned;
                    popupTextWrapperLearned.appendChild(entryTextLearn);

        let popupLine = document.createElement("div");
            popupLine.setAttribute("id", "popupLine");
        entryPopup.appendChild(popupLine);

        let popupRightSide = document.createElement("div");
            popupRightSide.setAttribute("id", "popupRightSide");
        entryPopup.appendChild(popupRightSide);

            // Year
            let sidebarWrapperYear = document.createElement("div");
                sidebarWrapperYear.setAttribute("class", "sidebarWrapper");
            popupRightSide.appendChild(sidebarWrapperYear);

                let sidebarTitleYear = document.createElement("h3");
                    sidebarTitleYear.setAttribute("class", "sidebarTitle rubik_light");
                    sidebarTitleYear.textContent = "Year"
                sidebarWrapperYear.appendChild(sidebarTitleYear);

                let sidebarTextYear = document.createElement("span");
                    sidebarTextYear.setAttribute("class", "sidebarText rubik_light");
                    sidebarTextYear.textContent = currentProject.date;
                sidebarWrapperYear.appendChild(sidebarTextYear);


            // tags
            let sidebarWrapperTags = document.createElement("div");
                sidebarWrapperTags.setAttribute("class", "sidebarWrapper");
            popupRightSide.appendChild(sidebarWrapperTags);

                let sidebarTitleTags = document.createElement("h3");
                    sidebarTitleTags.setAttribute("class", "sidebarTitle rubik_light");
                    sidebarTitleTags.textContent = "Tags"
                sidebarWrapperTags.appendChild(sidebarTitleTags);

                let tagArray = currentProject.type.split(",");

                for (tagCounter = 0; tagCounter < tagArray.length; tagCounter++) { 

                    let sidebarTextTags = document.createElement("span");
                        sidebarTextTags.setAttribute("class", "entryTag sidebarText rubik_light");
                        sidebarTextTags.textContent = tagArray[tagCounter];
                    sidebarWrapperTags.appendChild(sidebarTextTags);
                }


            // client
            let sidebarWrapperClient = document.createElement("div");
                sidebarWrapperClient.setAttribute("class", "sidebarWrapper");
            popupRightSide.appendChild(sidebarWrapperClient);

                let sidebarTitleClient = document.createElement("h3");
                    sidebarTitleClient.setAttribute("class", "sidebarTitle rubik_light");
                    sidebarTitleClient.textContent = "Client"
                sidebarWrapperClient.appendChild(sidebarTitleClient);

                let sidebarTextClient = document.createElement("span");
                    sidebarTextClient.setAttribute("class", "sidebarText rubik_light");
                    sidebarTextClient.textContent = currentProject.client;
                sidebarWrapperClient.appendChild(sidebarTextClient);

            // links
            let sidebarWrapperLinks = document.createElement("div");
                sidebarWrapperLinks.setAttribute("class", "sidebarWrapper");
            popupRightSide.appendChild(sidebarWrapperLinks);

                let sidebarTitleLinks = document.createElement("h3");
                    sidebarTitleLinks.setAttribute("class", "sidebarTitle rubik_light")
                    sidebarTitleLinks.textContent = "Links";
                sidebarWrapperLinks.appendChild(sidebarTitleLinks);

                if (currentProject.hasOwnProperty("extraLinks") == true) {
                    for (i = 0; i < currentProject.extraLinks.length;i++) {

                        let sidebarTextLinks = document.createElement("span");
                            sidebarTextLinks.setAttribute("class", "sidebarText rubik_light pointer sidebarExtraLinks");
                            sidebarTextLinks.textContent = currentProject.extraLinks[i];
                            // entryTitle.setAttribute("onclick", "window.open('" + projectsJSON[i].link + "', '_blank');");
                            sidebarTextLinks.setAttribute("onclick", "window.open('" + currentProject.extraLinks[i+1] + "', '_blank');");
                        sidebarWrapperLinks.appendChild(sidebarTextLinks);
                        i++;

                    }

                }

            
        let popupClose = document.createElement("p");
            popupClose.setAttribute("id", "popupClose");
            popupClose.setAttribute("class", "rubik_light");
            popupClose.setAttribute("onclick", "closePopup();")
            popupClose.textContent = "Close";
        entryPopup.appendChild(popupClose);

        await sleep(50);
        entryPopup.style.opacity = "1";
    });
}

async function closePopup() {

    let popupWrapper = document.getElementById("entryPopup");
    popupWrapper.style.opacity = "0";

    let opacityLayer = document.getElementById("opacityLayer");
        opacityLayer.style.opacity = "0";
    // reset overflow
    let html = document.getElementsByTagName("html")[0];
        html.style.overflow = "auto";

    await sleep(250);

    popupWrapper.remove();
    opacityLayer.remove();
}