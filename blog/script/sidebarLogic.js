function sleep(ms) {
    
  return new Promise(resolve => setTimeout(resolve, ms));
}

// navigation system

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
  }
  
  function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("content_wrapper").style.marginRight = "0";
    document.getElementById("navbarOpener").style.opacity = "1";
  }

//