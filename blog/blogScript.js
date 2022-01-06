const host = "http://localhost:8443";
function getLatest() {
    fetch("http://localhost:8443/blog/request/0/all/all/all/all/all")
    .then(res => res.json())
    .then(res => {
        console.log(res);
        const parent = document.getElementById("latest");
        res.forEach(article => {
            makeProjectsWrapper(article, parent);
        })
    })
}

function makeProjectsWrapper(currentProject, parent) {
    
    let entryWrapper = document.createElement("div");
    entryWrapper.setAttribute("class", `entry_wrapper`);
    entryWrapper.setAttribute("data-aos", "fade-up");
    entryWrapper.setAttribute("id", currentProject._id);
    entryWrapper.setAttribute("data-projectId", currentProject._id)

    let wrapperDiv = document.createElement("div");

    /*only get thumbnail if I provided one to avoid errors
    if (currentProject.imageName != "") {

        let entryThumbnail = document.createElement("div");
            entryThumbnail.setAttribute("class", "entryThumbnail");

        let entryImg = document.createElement("img");

        //load image async from creating card, so the card order stays correct
        getImage(currentProject.imageName, currentProject._id)
        .then( function(imageUrl) {
            entryImg.src = imageUrl;
        })
            entryImg.setAttribute("alt", currentProject.name + " preview image.");

        entryThumbnail.appendChild(entryImg);
        wrapperDiv.appendChild(entryThumbnail);
    }*/

    let entryHeader = document.createElement("div");
    entryHeader.setAttribute("class", "entryHeader");

    let entryTitle = document.createElement("span");
    entryTitle.setAttribute("class", "entryTitle rubik_regular pointer");
    // window.open('link.html', '_blank');
    //entryTitle.setAttribute("onclick", "window.open('" + currentProject.link + "', '_blank');");

    let entryDate = document.createElement("span");
    entryDate.setAttribute("class", "entryDate rubik_light unselectable");

    
    let entryText = document.createElement("span");
    entryText.setAttribute("class", "entryText rubik_light");

    entryTitle.textContent = currentProject.content.title;
    entryDate.textContent = currentProject.meta.author;
    entryText.innerHTML = currentProject.content.htmlText;

    entryHeader.appendChild(entryTitle);
    entryHeader.appendChild(entryDate);
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