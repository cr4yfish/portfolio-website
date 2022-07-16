// fill swiper stuff
(function fillSwiper() {
    const parent = document.getElementById("swiper-append");
  
    const url = `${host}/blog/request/2/all/all/all/all/all`;
  
    fetch(url).then(res => res.json()).then(res => {
      let timestamp = 1;
      console.log(res);
      // get latest article
      res.forEach(article => {
        const recentArticle = document.createElement("div");
        recentArticle.setAttribute("id", article._id);
        recentArticle.setAttribute("class", "swiper-slide swiperSlide card big_project_card");
        recentArticle.innerHTML = 
        `
        <div class="firstProjectPadding">
          <div class="card-content rubik_light about-me-card-title">${article.content.title}</div>
          <div class="latest_news_tags" class="big_project_card_tags"></div>
          <div class="about-me-card-content latest_news_content rubik_light">${article.content.subtitle}</div>
        </div>
        `
        parent.appendChild(recentArticle);
    
        const tagParent = document.getElementById(article._id).querySelector(`.latest_news_tags`);
        article.meta.tags.split(",").forEach(tag => {
          const newTag = document.createElement("span");
            newTag.setAttribute("class", "tag rubik_light");
            newTag.textContent = tag;
          tagParent.appendChild(newTag);
        })
      })
    })
    .then(() => {
      // swiper stuff 
      const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        effect: "fade",
        pagination: {
          el: '.swiper-pagination',
        },
  
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    })
  })