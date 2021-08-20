// scroll to hash

if(location.hash != "") {
    (async function scrollToHash() {
        await sleep(700);
        location.href = location.hash;
    })();
    
}

// prevent form submit default
document.querySelector("#projectSearch").addEventListener("submit", function(e) {
    e.preventDefault();
})



//const host = "http://localhost:8443";
const host = "https://cr4yfish.digital:8443";


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

// add event listener to catergories input
document.getElementById("projectFilter").addEventListener("change", function(e) {

    // find out if search bar is empty -> get value, replace all spaces and check if there's less than 2 chars left
        if(document.getElementById("projectSearch").value.replace(" ", "").length < 2) {
            // search bar is empty
            getProjects(e.target.value, "all");
        } else {
            // something's in the search bar
            getProjects(e.target.value, document.getElementById("projectSearch").value);
        }
    
})


// add event listener to search input
let timeout = null;
document.getElementById("projectSearch").addEventListener("input", function(e) {
    clearTimeout(timeout)
    
    timeout = setTimeout(function() {
        // check if filter is all, if so just call all projects, will throw error otherwise
        if(e.target.value.replace(" ", "").length == 0) {
            getProjects(document.getElementById("projectFilter").value, "all");
        } else {
            getProjects(document.getElementById("projectFilter").value, e.target.value);
        }
    }, 500);

})


// DIY material design input field
let inputField = document.getElementById("projectSearch")

    inputField.addEventListener("focus", function(e) {
        document.getElementById("projectLabel").style.transform = "translateY(-1.55em)"
    })

    inputField.addEventListener("blur", function(e) {
        if(e.target.value == "") {
            document.getElementById("projectLabel").style.transform = "translateY(0) translateX(0.5em)"
        }
    })




// draw all projects at start
getProjects("all", "");

async function getProjects(type, name) {

    const CATEGORY = "project"
    // x -> project type
    // y -> project name

    let url;

    // clear current projects
    let childNodes = document.getElementById("timelineWrapper").childNodes
    for(let i = childNodes.length-1; i >= 0; i--) {
        childNodes[i].remove();
    };


    

    // project type = all && project name = whatever -> get All projects
    if(type == "all" && (name == "" || name == " " || name == undefined) ) {
        url = `projectDetails/${CATEGORY}/all/all`
    } 
    // search for certain project in all types
    else if(name != "" && type == "all") {
        url = `projectDetails/${CATEGORY}/${name}/all`
    } 
    // search for certain project in certain type
    else {
        url = `projectDetails/${CATEGORY}/${name}/${type}`
    }

    const requestUrl = `${host}/${url}`;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    fetch(requestUrl, options)

    .then(response => response.json())
    
    .then(projectsJSON => {
        //console.log(projectsJSON);

        if(projectsJSON.length == 0) {
            let notice = document.createElement("h2");
                notice.textContent = "No projects matched given query"
                notice.setAttribute("id", "notice");
                notice.setAttribute("class", "brevia_medium languageHeader smallHeader");
            document.getElementById("timelineWrapper").appendChild(notice);
        } else {
            try {
                document.getElementById("notice").remove();
            }
            catch {
                
            }
        }
        for (i = 0; i < projectsJSON.length; i++) {

            const currentProject = projectsJSON[i];

            //console.log(currentProject);

            var timelineWrapper = document.getElementById("timelineWrapper");
    
            let entryWrapper = document.createElement("div");
            entryWrapper.setAttribute("class", "entry_wrapper");
            entryWrapper.setAttribute("data-aos", "fade-up");
            entryWrapper.setAttribute("id", i);
            entryWrapper.setAttribute("data-projectId", currentProject._id)
        
            // only get thumbnail if I provided one to avoid errors
            if (currentProject.imageName != "") {
    
                let entryThumbnail = document.createElement("div");
                    entryThumbnail.setAttribute("class", "entryThumbnail");
    
                let entryImg = document.createElement("img");

                // load image async from creating card, so the card order stays correct
                getImage(projectsJSON[i].imageName)
                .then( function(imageUrl) {
                    entryImg.src = imageUrl;
                })
                    entryImg.setAttribute("alt", currentProject.name + " preview image.");
    
                entryThumbnail.appendChild(entryImg);
                entryWrapper.appendChild(entryThumbnail);
            }
    
            let entryHeader = document.createElement("div");
            entryHeader.setAttribute("class", "entryHeader");
        
            let entryTitle = document.createElement("span");
            entryTitle.setAttribute("class", "entryTitle rubik_regular pointer");
            // window.open('link.html', '_blank');
            entryTitle.setAttribute("onclick", "window.open('" + currentProject.link + "', '_blank');");
        
            let entryDate = document.createElement("span");
            entryDate.setAttribute("class", "entryDate rubik_light unselectable");
        
            
            let entryText = document.createElement("span");
            entryText.setAttribute("class", "entryText rubik_light");
        
            entryTitle.textContent = currentProject.name;
            entryDate.textContent = currentProject.date;
            entryText.innerHTML = currentProject.desc;
        
            entryHeader.appendChild(entryTitle);
            entryHeader.appendChild(entryDate);
            // tags
            tagArray = currentProject.type.split(",");
        
            for (tagCounter = 0; tagCounter < tagArray.length; tagCounter++) {
                
                let entryType = document.createElement("span");
                entryType.setAttribute("class", "entryTag entryDate rubik_light unselectable");
                entryType.textContent = tagArray[tagCounter];
        
                entryHeader.appendChild(entryType);
            }
        
            let entryMore = document.createElement("button");
                entryMore.setAttribute("class", "entryMore btn-primary back_btn btn-modern brevia_bold");
                entryMore.setAttribute("onclick", "readMore(this);")
                entryMore.setAttribute("tabindex", "0");
                entryMore.style.marginTop = "1.5rem";
                entryMore.textContent = "Read more";
            
            entryWrapper.appendChild(entryHeader);
            entryWrapper.appendChild(entryText);
            entryWrapper.appendChild(entryMore);
        
            timelineWrapper.appendChild(entryWrapper);



        }
    })
      
}


// make read more button keyboard accessible

(async function readMoreAccess() {
    await sleep(200);
    let buttons = document.querySelectorAll(".entryMore");

    buttons.forEach(button => {
        button.addEventListener("keyup", function(event) {
            if(event.keyCode == 13) {
                readMore(event.target);
            }
        })
    })
})();


async function callPopUp(element) {

    const url =`${host}/getSkills`;

    fetch(url)

    .then(response => response.json())

    .then(async function(codeSkilsJSON) {

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

        await sleep(60);
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

    // get name of project
    let projectId = element.parentNode.getAttribute("data-projectId");

    // get single project with ID
    const url =`${host}/getProjectById/${projectId}`;


    fetch(url)

    .then(response => response.json())

    .then(async function(projectsJSON) {
        
        /*
        "name": "Take the Bus",
        "date": "2021",
        "text": "I wanted to start learning true backend development. So I got the idea to create a backend API that I could call from a frontend Website. For the execution, I got the idea to create a public transport route planning Webapp for my local transport services. The backend API will handle requests from the Webapp and takes the route as input and gives an output in form of the best found route. The output will then be handled by the frontend JS and displayed in a popup.",
        "link": "https://manuelfahmy.de/projects/takeTheBus",
        "type": "In Development, JS, Backend, API",
        "learned": "Local authorities don't respond to my emails."
        */

        // build a popup and paste data, UI is already done

        let currentProject = projectsJSON;

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
                //thumbnail.setAttribute("src", "code/thumbnails/" + currentProject.thumbnail);
                getImage(currentProject.imageName)
                .then(function (img) {
                    thumbnail.src = img;
                })
                
                thumbnail.setAttribute("alt",  currentProject.name + " preview image.");
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
                        titleDesc.textContent = "Description";
                    popupTextWrapperText.appendChild(titleDesc);

                    let entryText = document.createElement("span");
                        entryText.setAttribute("class", "entryText rubik_light");
                        entryText.innerHTML = currentProject.desc;
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

                    if(currentProject.extraLinks.length != 0) {

                        for (i = 0; i < currentProject.extraLinks.length;i++) {
    
                            let sidebarTextLinks = document.createElement("span");
                                sidebarTextLinks.setAttribute("class", "sidebarText rubik_light pointer sidebarExtraLinks");
                                sidebarTextLinks.textContent = currentProject.extraLinks[i];
                                // entryTitle.setAttribute("onclick", "window.open('" + projectsJSON[i].link + "', '_blank');");
                                sidebarTextLinks.setAttribute("onclick", "window.open('" + currentProject.extraLinks[i+1] + "', '_blank');");
                            sidebarWrapperLinks.appendChild(sidebarTextLinks);
                            i++;
                        }

                    } else {
    
                        let sidebarTextLinks = document.createElement("span");
                            sidebarTextLinks.setAttribute("class", "sidebarText rubik_light pointer");
                            sidebarTextLinks.textContent = "none";
                        sidebarWrapperLinks.appendChild(sidebarTextLinks);
                    }
                } 
            
        let popupClose = document.createElement("a");
            popupClose.setAttribute("id", "popupClose");
            popupClose.setAttribute("class", "rubik_light");
            popupClose.textContent = "Close";

        let popupCloseButton = document.createElement("button");
            popupCloseButton.setAttribute("class",  "btn-primary back_btn btn-modern")
            popupCloseButton.appendChild(popupClose);
            popupCloseButton.setAttribute("onclick", "closePopup();")
            popupCloseButton.setAttribute("tabindex", "1")

        entryPopup.appendChild(popupCloseButton);

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


function getImage(imageName) {

    return new Promise(function (resolve, reject) {
        //console.log(imageName)
        if(imageName == "") {
            resolve(imageName)
        }

        const url = `getImage/${imageName}`;
        const requestUrl = `${host}/${url}`
    
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
        
        fetch(requestUrl, options)
    
        .then(response => response.blob())
    
        .then(imageBlob => {
            const imageUrl = URL.createObjectURL(imageBlob);
            //console.log(imageUrl);
            resolve(imageUrl);
        })
    })
    
}