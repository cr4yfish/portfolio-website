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
        collapsible_content.style.maxHeight = null;
        collapsible_content.style.marginTop = "0";
        collapsible_content.style.padding = "0"
        collapsible_content.style.overflow = "hidden";
        this.textContent = "Show more info";
        for(i = 0; i < collapsible_content.children.length; i++) {
          collapsible_content.children[i].style.opacity = "0";
        }
    } else {
        collapsible_content.style.maxHeight = collapsible_content.scrollHeight + "px";
        collapsible_content.style.marginTop = "1rem";
        collapsible_content.style.padding = "5rem 1rem 10rem 1rem"
        collapsible_content.style.marginLeft = "50%";
        collapsible_content.style.transform = "translateX(-50%)";
        collapsible_content.style.overflow = "visible";
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

  // fade the items back in one by one
  await sleep(50);
  for(i = 1; i < navbarItems.length; i++) {

    navbarItems[i].style.transform = "translateX(0)";

    await sleep(50);
  }

  localStorage.setItem("navbarHasBeenOpened", "true");
  
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("mainContent").style.marginRight = "0";
  document.getElementById("navbarOpener").style.opacity = "1";
}


function sleep(ms) {
    
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function openSite(x) {

  document.getElementsByTagName("body")[0].style.opacity = "0";
  await sleep(250);
  window.open(x + ".html", "_self");

}

function fadeIn() {
  document.getElementsByTagName("body")[0].style.opacity = "1";
}



function drawLatestProjects() {

  const host = "https://cr4yfish.digital:8443";
  const url =`${host}/projectDetails/project/all/all`

  fetch(url)

    .then(response => response.json())
    
    .then(result => {

    for(i = 0; i < 4; i++) {

      var parentDiv = document.getElementById("projects");

      var cardElement = document.createElement("div");
      cardElement.setAttribute("class", "card latest-projects-card");

      var cardTitle = document.createElement("div");
      cardTitle.setAttribute("class", "card-title rubik_light");
      cardTitle.setAttribute("tabindex", "0");
      cardTitle.textContent = result[i].name;

      // make latest projects titles keyboard accessible
      cardTitle.addEventListener("keyup", function(event) {
        if(event.keyCode == 13) {
          window.open("https://manuelfahmy.de/main/code.html#" + i, "_self" )
        }
      })


      // redirect to code.html and scroll to card
      cardTitle.setAttribute("onclick", "window.open('https://manuelfahmy.de/main/code.html#" + i + "', '_self');");
      // window.open('https://manuelfahmy.de/projects/caterpillarCalculator', '_blank');
      // window.open('https://manuelfahmy.de/projects/caterpillarCalculator', '_blank')
      var cardContent = document.createElement("div");
      cardContent.setAttribute("class", "card-content rubik_light");

      if (result[i].desc.length > 150) {
        // text ist 151 zeichen oder länger
        // text wird nur bis zum 150. zeichen wiedergegeben
        resultText = result[i].desc.substring(0,150) ;
        
        if (resultText.split("")[149] == " ") {
          // text hat ein leerzeichen als letztes zeichen
 
          // 150. zeichen wird abgehakt
          resultText = result[i].desc.substring(0,149) + "...";

        } else {
          // text hat kein leerzeichen am ende

          resultText = result[i].desc.substring(0,150) + "...";
        }
      }

      cardContent.textContent = resultText;

        
      cardElement.appendChild(cardTitle);
      cardElement.appendChild(cardContent);

      parentDiv.appendChild(cardElement);

    }
    
  });



}


