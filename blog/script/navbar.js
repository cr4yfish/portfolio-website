async function openNav() {

    // set all items off screen
    var navbarItems = document.querySelectorAll("#sidebar a");
  
    for(i = 1; i < navbarItems.length; i++) {
  
      navbarItems[i].style.transform = "translateX(200%)";
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
    document.getElementById("content_wrapper").style.marginRight = "0";
    document.getElementById("navbarOpener").style.opacity = "1";
    document.getElementById("colorOverlay").style.opacity = "0";
    await sleep(250);
    document.getElementById("colorOverlay").style.display = "none";
}