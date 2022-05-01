// DIY material design input field
let inputField = document.getElementById("articleSearch")

    inputField.addEventListener("focus", function(e) {
        document.getElementById("projectLabel").style.transform = "translateY(-1.55em)"
    })

    inputField.addEventListener("blur", function(e) {
        if(e.target.value == "") {
            document.getElementById("projectLabel").style.transform = "translateY(0) translateX(0.5em)"
        }
    })


function sleep(ms) {
    
    return new Promise(resolve => setTimeout(resolve, ms));
}

const host = "http://localhost:30005";

// add event listener to search input
let timeout = null;
document.getElementById("articleSearch").addEventListener("input", function(e) {
    clearTimeout(timeout)
    timeout = setTimeout(function() {
        getLatest(0, document.getElementById("articleSearch").value);
    }, 500);

})

function clearProjects(except = []) {
    return new Promise((resolve, reject) => {
        let excpetionsArray = [];
        let excepted = [];

        except.forEach(project => { excpetionsArray.push(project._id) });
        // clear current projects
        let childNodes = document.getElementById("latest_articles").childNodes;
    
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

function disableArticles(articles) {
    articles.forEach(article => {
        document.getElementById(article._id).style.display = "none";
    })
}

function enableArticles(articles) {
    articles.forEach(article => {
        document.getElementById(article._id).style.display = "flex";
    })
}

function getLatest(numberOfResponses = 0, search = "all") {
    const parent = document.getElementById("latest_articles");
    console.log("Search:", search);
    // local storage exists
    if(localStorage.getItem("articles")) {
        console.log("Rendering client side");
        search = search.toLowerCase();
        
        let localArticles = JSON.parse(localStorage.getItem("articles"));

        // sum of all articles that should be displayed
        let resArray = [];

        if(search != "all") {
            localArticles.forEach(article => {
                if( !article.content.title.toLowerCase().includes(search)    && 
                    !article.content.subtitle.toLowerCase().includes(search) && 
                    !article.meta.category.toLowerCase().includes(search)    && 
                    !article.meta.author.toLowerCase().includes(search)      &&
                    !article.content.htmlText.toLowerCase().includes(search) &&
                    !article.meta.tags.toLowerCase().includes(search)
                    )
                {
                    resArray.push(article);
                }
            })
            localArticles = resArray;
        }
        
        if(parent.childNodes.length == 0) {
            localArticles.forEach(article => {
                makeProjectsWrapper(article, parent);
            })
        } else {
            console.log("Disabling articles:", localArticles);
            disableArticles(localArticles);
        }

    } else {
        fetch(`${host}/blog/request/0/${search}/all/all/all/all`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
    
            // make local storage
            localStorage.removeItem("articles");
            localStorage.setItem("articles", JSON.stringify(res));
    
            // clear old projects
            clearProjects();

            makeSpotlights(res);
    
            res.forEach(article => {
                makeProjectsWrapper(article, parent);
            })
        })
    }
}

function makeProjectsWrapper(currentProject, parent) {
    
    let entryWrapper = document.createElement("div");
    entryWrapper.setAttribute("class", `article_card`);
    entryWrapper.setAttribute("data-aos", "fade-up");
    entryWrapper.setAttribute("id", currentProject._id);
    entryWrapper.setAttribute("data-projectId", currentProject._id)

    entryWrapper.innerHTML = 
    `
    <div class="article_image"></div>
    <div class="article_content">
        <div class="content_header">
            <span class="meta">${currentProject.meta.author} on ${new Date(parseInt(currentProject.log.timestamp)).toDateString()}</span>
            <span class="title">${currentProject.content.title}</span>
        </div>
        <div class="tags"></div>
        <div class="subtitle">${currentProject.content.subtitle}</div>
    </div>
    `
    parent.appendChild(entryWrapper);

    // image
    if (currentProject.imageName != "") {
        //load image async from creating card, so the card order stays correct
        getImage(currentProject.imageName, currentProject._id)
        .then( function(imageUrl) {
            document.getElementById(currentProject._id).querySelector(".article_image").style.backgroundImage = `url('${imageUrl}')`;
        })
    }

    // tags
    tagArray = currentProject.meta.tags.split(",");
    const tagParent = document.getElementById(currentProject._id).querySelector(".tags");
    tagArray.forEach(tag => {
        if(tag.length == 0) { return; } 
        let tagEle = document.createElement("span");
            tagEle.setAttribute("class", "tag");
            tagEle.textContent = tag;
        tagParent.appendChild(tagEle);
    })
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