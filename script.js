
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