
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");

    var collapsible_content = this.nextElementSibling;
    if (collapsible_content.style.maxHeight){
        collapsible_content.style.maxHeight = null;
        collapsible_content.style.marginTop = "0";
    } else {
        collapsible_content.style.maxHeight = collapsible_content.scrollHeight + "px";
        collapsible_content.style.marginTop = "10vw";
    } 
  });
}

function openNav() {
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("mainContent").style.marginRight = "250px";
  document.getElementById("navbarOpener").style.opacity = "0";
  
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