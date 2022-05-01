
// data is array with objects inside
async function makeSpotlights(data) {
    console.log("Making spotlights");
    let width;
    if(window.screen.width < 767) {
        // adjust width of slider
        width = (data.length * 3);
    }
    else {
        width = (data.length * 5);
    }
    document.querySelector("#spotlight .swiper").style.width = `calc(${width}rem)`
    
    const parent = document.getElementById("spotlightAnchor");
    data.forEach(article => {
        const spotlightSlide = document.createElement("div");
            spotlightSlide.setAttribute("class", "swiper-slide spotlightSlide");
            getImage(article.imageName, article._id).then(blobUrl => {
                spotlightSlide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, .5), 50%, rgba(0, 0, 0, 1)),
                url('${blobUrl}')`;
            })
            
            spotlightSlide.innerHTML = 
            `
            <span class="spotlightTitle">${article.content.title}</span>
            <div class="spotlightMeta">
                <span class="spotlightDate">${new Date(parseInt(article.log.timestamp)).toDateString()}</span>
                <div class="spotlightAuthor">
                    <span class="spotlightAuthorImage"></span>
                    <span class="spotlightAuthorName">${article.meta.author}</span>
                </div>
            </div>  
            `
        parent.appendChild(spotlightSlide);
    })

    const spotlightSwiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        slidesPerView: 2,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
        },
      
        scrollbar: {
          el: '.swiper-scrollbar',
        },
    });
}