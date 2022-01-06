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

function getCurrentTab() {
    const docTitle = document.title;

    switch (docTitle) {
        case "Manuel's Blog":
            document.getElementById("homeAnchor").style.backgroundColor = "#F8CD86";
            document.getElementById("homeAnchor").style.color = "#252525";
            break;
        case "News":
            document.getElementById("newsAnchor").style.backgroundColor = "#F8CD86";
            document.getElementById("newsAnchor").style.color = "#252525";
            break;
    }
}

const host = "http://localhost:8443";

// add event listener to search input
let timeout = null;
document.getElementById("projectSearch").addEventListener("input", function(e) {
    clearTimeout(timeout)
    
    timeout = setTimeout(function() {
        // check if filter is all, if so just call all projects, will throw error otherwise
        if(e.target.value.replace(" ", "").length == 0) {
            getLatest(0, "all", document.getElementById("projectFilter").value);
        } else {
            getLatest(0, e.target.value, document.getElementById("projectFilter").value,);
        }
    }, 500);

})

function clearProjects(except = []) {
    return new Promise((resolve, reject) => {
        let excpetionsArray = [];
        let excepted = [];

        except.forEach(project => { excpetionsArray.push(project._id) });
        // clear current projects
        let childNodes = document.getElementById("latest").childNodes;
    
        for(let i = childNodes.length-1; i >= 0; i--) {
            if(!excpetionsArray.includes(childNodes[i].id) || childNodes[i].id == undefined) {
                childNodes[i].remove();
            } else {
                // childNodes[i] should show up in results
                excepted.push(childNodes[i]._id);
            }
        };

        resolve(excepted);
    })

}

function getLatest(numberOfResponses = 0, search = "all") {

    // local storage exists
    if(localStorage.getItem("articles") && (search.length != 0 && search != "all")) {
        console.log("Rendering client side");
        search = search.toLowerCase();
        const parent = document.getElementById("latest");
        let localArticles = JSON.parse(localStorage.getItem("articles"));

        let resArray = [];

        if(search != "all") {
            localArticles.forEach(article => {
                if(article.content.title.toLowerCase().includes(search) || 
                    article.content.subtitle.toLowerCase().includes(search) || 
                    article.meta.category.toLowerCase().includes(search) || 
                    article.meta.author.toLowerCase().includes(search) ||
                    article.content.htmlText.toLowerCase().includes(search) ||
                    article.meta.tags.toLowerCase().includes(search)) {
                    resArray.push(article);
                }
            })
            localArticles = resArray;
        }

        console.log("Local articles:",localArticles);
        
        if(parent.childNodes.length == 0) {
            localArticles.forEach(article => {
                makeProjectsWrapper(article, parent);
            })
        } else {
            console.log("Clearing projects, except for", localArticles);
            clearProjects(localArticles);
        }

    } else {
        fetch(`http://localhost:8443/blog/request/0/${search}/all/all/all/all`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            const parent = document.getElementById("latest");
    
            // make local storage
            localStorage.removeItem("articles");
            localStorage.setItem("articles", JSON.stringify(res));
    
            // clear old projects
            clearProjects();
    
            res.forEach(article => {
                makeProjectsWrapper(article, parent);
            })
        })
    }
}

function makeProjectsWrapper(currentProject, parent) {
    
    let entryWrapper = document.createElement("div");
    entryWrapper.setAttribute("class", `entry_wrapper`);
    entryWrapper.setAttribute("data-aos", "fade-up");
    entryWrapper.setAttribute("id", currentProject._id);
    entryWrapper.setAttribute("data-projectId", currentProject._id)

    let wrapperDiv = document.createElement("div");

    //only get thumbnail if I provided one to avoid errors
    if (currentProject.imageName != "") {

        let entryThumbnail = document.createElement("div");
            entryThumbnail.setAttribute("class", "entryThumbnail");

        let entryImg = document.createElement("img");

        //load image async from creating card, so the card order stays correct
        getImage(currentProject.imageName, currentProject._id)
        .then( function(imageUrl) {
            entryImg.src = imageUrl;
        })
            entryImg.setAttribute("alt", currentProject.content.title + " preview image.");

        entryThumbnail.appendChild(entryImg);
        wrapperDiv.appendChild(entryThumbnail);
    }

    let entryHeader = document.createElement("div");
    entryHeader.setAttribute("class", "entryHeader");

    let entryTitle = document.createElement("div");
    entryTitle.setAttribute("class", "entryTitle rubik_regular");
    // window.open('link.html', '_blank');
    //entryTitle.setAttribute("onclick", "window.open('" + currentProject.link + "', '_blank');");

    let entryTitleText = document.createElement("span");
        entryTitleText.setAttribute("class", "entryTitleText rubik_regular pointer")

    let entryAuthor = document.createElement("span");
    entryAuthor.setAttribute("class", "entryDate rubik_light unselectable");

    
    let entryText = document.createElement("span");
    entryText.setAttribute("class", "entryText rubik_light");

    entryTitleText.textContent = currentProject.content.title;
    entryAuthor.textContent = currentProject.meta.author;
    entryText.innerHTML = currentProject.content.htmlText;

    entryHeader.appendChild(entryTitle);
    entryTitle.appendChild(entryTitleText);
    entryTitle.appendChild(entryAuthor);
    // tags
    tagArray = currentProject.meta.tags.split(",");

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

    
    
    wrapperDiv.appendChild(entryHeader);
    wrapperDiv.appendChild(entryText);

    entryWrapper.appendChild(wrapperDiv);
    entryWrapper.appendChild(entryMore);

    parent.appendChild(entryWrapper);
}

function openArticle(element) {
    console.log(element);
}

function getImage(imageName, projectID) {

    return new Promise(function (resolve, reject) {
        //console.log(imageName)
        if(imageName == "") {
            resolve(imageName)
        }

        // image array is present, requested image should be in here
        if(localStorage.getItem("imageArray")) {
            const imageArray = JSON.parse(localStorage.getItem("imageArray"));

            imageArray.forEach(image => {
                // requested image is already downloaded
                if(image.projectID == projectID) {
                    resolve(image.imageUrl);
                }
            })
        } 

        // get image from server side
        else {

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
    
                // cache image in localStorage
                    const newObj = {
                        imageUrl: imageUrl,
                        projectID: projectID,
                    }
                    let imageArr = [];
                    let isDuplicate = false;
    
                    // set imageArr to already existing array, if it exists
                    if(localStorage.getItem("imageArray")) {
                        imageArr = JSON.parse(localStorage.getItem("imageArray"));
                    }
    
                    // search arr for duplicate
                    imageArr.forEach(image => {
                        if(image.projectID == newObj.projectID) {
                            isDuplicate = true;
                        }
                    })
    
                    // push new image into array, if not a duplicate
                    if(!isDuplicate) {
                        imageArr.push(newObj);
                        localStorage.setItem("imageArray",JSON.stringify(imageArr));
                    }
                //
    
                resolve(imageUrl);
            })
        }
    })
}

localStorage.removeItem("imageArray");

function getImage(imageName, projectID) {

    return new Promise(function (resolve, reject) {
        //console.log(imageName)
        if(imageName == "") {
            resolve(imageName)
        }

        // image array is present, requested image should be in here
        if(localStorage.getItem("imageArray")) {
            const imageArray = JSON.parse(localStorage.getItem("imageArray"));

            imageArray.forEach(image => {
                // requested image is already downloaded
                if(image.projectID == projectID) {
                    resolve(image.imageUrl);
                }
            })
        } 

        // get image from server side
        else {

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
    
                // cache image in localStorage
                    const newObj = {
                        imageUrl: imageUrl,
                        projectID: projectID,
                    }
                    let imageArr = [];
                    let isDuplicate = false;
    
                    // set imageArr to already existing array, if it exists
                    if(localStorage.getItem("imageArray")) {
                        imageArr = JSON.parse(localStorage.getItem("imageArray"));
                    }
    
                    // search arr for duplicate
                    imageArr.forEach(image => {
                        if(image.projectID == newObj.projectID) {
                            isDuplicate = true;
                        }
                    })
    
                    // push new image into array, if not a duplicate
                    if(!isDuplicate) {
                        imageArr.push(newObj);
                        localStorage.setItem("imageArray",JSON.stringify(imageArr));
                    }
                //
    
                resolve(imageUrl);
            })
        }
    })
}