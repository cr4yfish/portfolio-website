function gototop() {
  if (window.scrollY>0) {
      window.scrollTo(0,0)
  }
}

function checkGoToTop() {
 
  if(document.querySelector("body").clientHeight - window.scrollY  < 2000) {
      document.getElementById("scrollToTop").style.display = "block"
  } else {
    document.getElementById("scrollToTop").style.display = "none"
  }
}

  // remove "no-javascript" function
(function() {
  let elements = document.getElementsByClassName("no-javascript");
  for(i = 0; i < elements.length;i++) {
    elements[i].remove();
  }
  return;
})();




var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    

    var collapsible_content = this.nextElementSibling;
    if (collapsible_content.style.maxHeight){
        this.textContent = "Show more info";
        for(i = 0; i < collapsible_content.children.length; i++) {
          collapsible_content.children[i].style.opacity = "0";
        }
    } else {
        this.textContent = "Hide more info";
        for(i = 0; i < collapsible_content.children.length; i++) {
          collapsible_content.children[i].style.opacity = "1";
        }
    } 
  });
}

function resetAnimation() {
  localStorage.removeItem("navbarHasBeenOpened");
}

async function openNav() {

  // set all items off screen
  var navbarItems = document.querySelectorAll("#sidebar a");

  for(i = 1; i < navbarItems.length; i++) {

    navbarItems[i].style.transform = "translateX(200%)";
    navbarItems[i].style.transition = "transform 0.5s"
  }

  document.getElementById("sidebar").style.width = "250px";
  //document.getElementById("mainContent").style.marginRight = "250px";
  document.getElementById("navbarOpener").style.opacity = "0";
  document.getElementById("colorOverlay").style.display = "block";
  

  // fade the items back in one by one
  await sleep(50);
  for(i = 1; i < navbarItems.length; i++) {

    navbarItems[i].style.transform = "translateX(0)";

    await sleep(50);
  }
  
  localStorage.setItem("navbarHasBeenOpened", "true");
  document.getElementById("colorOverlay").style.opacity = "1";
}

async function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("mainContent").style.marginRight = "0";
  document.getElementById("navbarOpener").style.opacity = "1";
  document.getElementById("colorOverlay").style.opacity = "0";
  await sleep(250);
  document.getElementById("colorOverlay").style.display = "none";
}


function sleep(ms) {
    
  return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollDown() {
  window.scrollBy({
    behavior: "smooth",
    top: 1000,
  })
}

async function openSite(x) {

  document.getElementsByTagName("body")[0].style.opacity = "0";
  await sleep(250);
  window.open(x + ".html", "_self");

}

function fadeIn() {
  document.getElementsByTagName("body")[0].style.opacity = "1";
}


const host = "https://cr4yfish.digital:8443";
function drawLatestProjects() {

  
  const url =`${host}/projectDetails/project/all/all`

  fetch(url)

    .then(response => response.json())
    
    .then(async result => {
      var parentDiv = document.getElementById("projects");

      // make big card for first result
      const bigProject = result[0];

      const firstTags = bigProject.type.split(",");
      const card = document.createElement("div");
      card.setAttribute("id", bigProject._id);
      card.setAttribute("class", "card big_project_card collapsible_card");
      card.setAttribute("onclick", `window.open("https://manuelfahmy.de/main/code.html#${bigProject._id}", '_self');`)
        
      card.innerHTML = 
      `
      <div class="firstProjectPadding">
      <div class="card-content rubik_light about-me-card-title">${bigProject.name}</div>
      <div class="big_project_card_tags">
      </div>
      <div class="about-me-card-content rubik_light">${bigProject.desc}</div>
      </div>
      `
      parentDiv.appendChild(card);

      // replace background image
      getImage(bigProject.imageName, bigProject._id).then(imageUrl => {
        document.documentElement.style.setProperty("--imageUrl", `url(${imageUrl})`);
      })

      const firstTagParent = document.getElementById(bigProject._id).querySelector(".big_project_card_tags");
      // make tags
      firstTags.forEach(tag => {
        const tagEle = document.createElement("span");
          tagEle.setAttribute("class", "tag rubik_light");
          tagEle.textContent = tag;
          firstTagParent.appendChild(tagEle)
      })
    
      // rest
    for(i = 1; i < 4; i++) {

      var cardElement = document.createElement("div");
      cardElement.setAttribute("class", "card latest-projects-card");
      cardElement.setAttribute("onclick", `window.open('https://manuelfahmy.de/main/code.html#${result[i]._id}', '_self');`)
      
      if (result[i].desc.length > 150) {
        // text is 151 chars or longer
        resultText = result[i].desc.substring(0,150) ;
        
        if (resultText.split("")[149] == " ") {
          // text has white space as last char
          resultText = result[i].desc.substring(0,149) + "...";

        } else {
          resultText = result[i].desc.substring(0,150) + "...";
        }
      }

      cardElement.innerHTML=`
        <div class="card-title rubik_light" tabindex="0">${result[i].name}</div>
        <div class="card-content rubik_light">${resultText}</div>
      `

      parentDiv.appendChild(cardElement);

    }
    
  });



}

// copied from codeScript.js -> update if original changed
function getImage(imageName, projectID) {

  return new Promise(function (resolve, reject) {
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
  })
}