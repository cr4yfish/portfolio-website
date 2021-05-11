
// I'll just dump the JSON here so I don't have to work with CORS again :/
var projectsJSON = [
    {    
        "name": "Website for JBN",
        "date": "2019",
        "text": "The first real (and deployed) Website I created. It features an about-page, a contact form, a javascript navigation bar and a working dark/light-theme switch! I started working on it in 2019, however the work continued far into 2020 and even 2021 to fully polish it. You can find the source code for it on my GitHub!"
    },
    {    
        "name": "Portfolio Website",
        "date": "2020",
        "text": "I wanted to make another Website using the new skills I aquired from creating the JBN-Website, so what was I going to do? Of course! A portfolio Website for myself.. without having even enough content to fill it. It features some more advanced css, relative to the JBN Website and some basic Javascript. It also was a major improvement on my UI skills."
    },
    {    
        "name": "ChromNewTab",
        "date": "2020",
        "text": "I was sick and tired of my NewTab page and didn't find any good ones on the WebStore. Didn't really work it.. it does work as a Chrome Addon, but Chrome has some really strict policies which exceed my skills. So the project is on hold right now."
    },
    {    
        "name": "First React.js App",
        "date": "2021",
        "text": "I thought I was ready for stepping up my game to a WebApp, but I was wrong. At the time, I had no idea what I was doing. Be ready for the return of it soon(tm)!"
    },
    {    
        "name": "AnimeScraper",
        "date": "2021",
        "text": "Since my failure of understanding React.js, I had a new plan: 1. Learn vanilla JS 2. Learn React.js 3. ?? 4. Profit! Jokes aside, for this project I used more Javascript than all of the Javascript of my previous projects combined. It features different kinds of loops, sorting algorithms, AJAX, Javascript HTMl Rendering and lots more! Check it out on my Github. "
    },
    {    
        "name": "Localhost Dashboard",
        "date": "2021",
        "text": "Big story: Either I don't know better, or PHP isn't working if I open HTML files with my browser. So I got XAMPP and, using Javascript, coded up a Website that scrapes all my local projects on my PC and lists them (with working links!)."
    },
    {    
        "name": "Wallet-Website",
        "date": "2021",
        "text": "I was looking to invest some money into a crypto Project, together with a couple of friends, and didn't like the Website for it. So I tried creating my own UI that scrapes content from the original Website and uses it for individial Profit that's linked to Accounts in my working Account system. It features a working regristration process, login process and encrypted password storage in a MySQL database. I also had to learn some more PHP for this."
    },
    {    
        "name": "isTodayTuesday",
        "date": "2021",
        "text": "Amid my finals in School, I was bored and wanted to code up a small project in an hour. This is the result. It tells you, using simple javascript, if it's tuesday. The Javascript system is built ready for expanding it (it checks the day from a variable, so it would be possible to upgrade it to a system where you can check if it's each day)."
    },
    {    
        "name": "Portfolio Website 2.0",
        "date": "2021",
        "text": "Current Project. I have some more projects now that I could display. I also got my Webspace back and a new domain. Now it's time to beautify this thing using all the skills I aquired in the past 2 years."
    }
    
]

console.log(projectsJSON);


for (i = 0; i < projectsJSON.length; i++) {
    var timelineWrapper = document.getElementById("timelineWrapper");

    let entryWrapper = document.createElement("div");
    entryWrapper.setAttribute("class", "entry_wrapper");

    let entryHeader = document.createElement("div");
    entryHeader.setAttribute("class", "entryHeader");

    let entryTitle = document.createElement("span");
    entryTitle.setAttribute("class", "entryTitle rubik_regular pointer");

    let entryDate = document.createElement("span");
    entryDate.setAttribute("class", "entryDate rubik_light");
    
    let entryText = document.createElement("span");
    entryText.setAttribute("class", "entryText rubik_light");

    entryTitle.textContent = projectsJSON[i].name;
    entryDate.textContent = projectsJSON[i].date;
    entryText.textContent = projectsJSON[i].text;

    entryHeader.appendChild(entryTitle);
    entryHeader.appendChild(entryDate);

    entryWrapper.appendChild(entryHeader);
    entryWrapper.appendChild(entryText);

    timelineWrapper.appendChild(entryWrapper);


}