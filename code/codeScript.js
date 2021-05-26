AOS.init();
// I'll just dump the JSON here so I don't have to work with CORS again :/
var projectsJSON = [
    {    
        "name": "Website for JBN",
        "date": "2019",
        "text": "The first real (and deployed) Website I created. It features an about-page, a contact form, a javascript navigation bar and a working dark/light-theme switch! I started working on it in 2019, however the work continued far into 2020 and even 2021 to fully polish it. You can find the source code for it on my GitHub!",
        "link": "https://jugendbeiratneustadt.de/",
        "type": "Live"
    },
    {    
        "name": "Portfolio Website",
        "date": "2020",
        "text": "I wanted to make another Website using the new skills I aquired from creating the JBN-Website, so what was I going to do? Of course! A portfolio Website for myself.. without having even enough content to fill it. It features some more advanced css, relative to the JBN Website and some basic Javascript. It also was a major improvement on my UI skills.",
        "link": "https://manuelfahmy.de/",
        "type": "Live"
    },
    {    
        "name": "ChromNewTab",
        "date": "2020",
        "text": "I was sick and tired of my NewTab page and didn't find any good ones on the WebStore. It didn't really work... it does work as a Chrome Addon, but Chrome has some really strict policies which exceed my skills. So the project is on hold right now.",
        "link": "https://github.com/cr4yfish/chrome-new-tab",
        "type": "GitHub"
    },
    {    
        "name": "First React.js App",
        "date": "2021",
        "text": "I thought I was ready for stepping up my game to a WebApp, but I was wrong. At the time, I had no idea what I was doing. Be ready for the return of it soon(tm)!",
        "link": "",
        "type": "GitHub"
    },
    {    
        "name": "AnimeScraper",
        "date": "2021",
        "text": "Since my failure of understanding React.js, I had a new plan: <ul> <li>Learn vanilla JS</li> <li>Learn React.js</li> <li>??</li ><li>Profit!</li> </ul>Jokes aside, for this project I used more Javascript than all of the Javascript of my previous projects combined. It features different kinds of loops, sorting algorithms, AJAX, Javascript HTML Rendering and lots more! I think it actually generates more HTML from Javascript than there is non-generated-HTML.",
        "link": "https://github.com/cr4yfish/animeScraper",
        "type": "GitHub"
    },
    {    
        "name": "Localhost Dashboard",
        "date": "2021",
        "text": "Big story: I had multiple problems with CORS and figured it would be easier to host the website properly. So I got XAMPP and, using Javascript, coded up a Website that scrapes all my local projects on my PC and lists them in a neat UI. It uses AJAX to get names and directory paths from my projects. It also generate hrefs, so I can open any (local) website within XAMPP.",
        "link": "",
        "type": "Not public"
    },
    {    
        "name": "Wallet-Website",
        "date": "2021",
        "text": "I was looking to invest some money into a crypto Project, together with a couple of friends, and didn't like the Website for it. So I tried creating my own UI that scrapes content from the original Website and uses it for individial Profit that's linked to Accounts in my working Account system. It features a working regristration process, login process and encrypted password storage in a MySQL database. I also had to learn some more PHP for this.",
        "link": "https://github.com/cr4yfish/wallet-website",
        "type": "GitHub"
    },
    {    
        "name": "isTodayTuesday",
        "date": "2021",
        "text": "Amid my finals in School, I was bored and wanted to code up a small project in an hour. This is the result. It tells you, using simple javascript, if it's tuesday. The Javascript system is built ready for expanding it (it checks the day from a variable, so it would be possible to upgrade it to a system where you can check if it's each day).",
        "link": "https://manuelfahmy.de/projects/isTodayTuesday/",
        "type": "Live"
    },
    {    
        "name": "Portfolio Website 2.0",
        "date": "2021",
        "text": "Current Project. I have some more projects now that I could display. I also got my Webspace back and a new domain. Now it's time to beautify this thing using all the skills I aquired in the past 2 years.",
        "link": "https://manuelfahmy.de/",
        "type": "Live"
    },
    {    
        "name": "Caterpillar calculator",
        "date": "2021",
        "text": "I'm saving for a Caterpillar in Star Citizen, together with a few friends. To keep everyone up-to-date about our progress, I've built this Website, which calculates if we have enough money. It also stores the most recent values in a database.",
        "link": "https://manuelfahmy.de/projects/caterpillarCalculator",
        "type": "Live"
    }
]

for (i = 0; i < projectsJSON.length; i++) {
    var timelineWrapper = document.getElementById("timelineWrapper");

    let entryWrapper = document.createElement("div");
    entryWrapper.setAttribute("class", "entry_wrapper");
    entryWrapper.setAttribute("data-aos", "fade-up");

    let entryHeader = document.createElement("div");
    entryHeader.setAttribute("class", "entryHeader");

    let entryTitle = document.createElement("span");
    entryTitle.setAttribute("class", "entryTitle rubik_regular pointer");
    entryTitle.setAttribute("onclick", "window.location.href='" + projectsJSON[i].link + "';");

    let entryDate = document.createElement("span");
    entryDate.setAttribute("class", "entryDate rubik_light");

    let entryType = document.createElement("span");
    entryType.setAttribute("class", "entryDate rubik_light");
    
    let entryText = document.createElement("span");
    entryText.setAttribute("class", "entryText rubik_light");

    entryTitle.textContent = projectsJSON[i].name;
    entryDate.textContent = projectsJSON[i].date;
    entryType.textContent = projectsJSON[i].type;
    entryText.innerHTML = projectsJSON[i].text;

    entryHeader.appendChild(entryTitle);
    entryHeader.appendChild(entryDate);
    entryHeader.appendChild(entryType);

    entryWrapper.appendChild(entryHeader);
    entryWrapper.appendChild(entryText);

    timelineWrapper.appendChild(entryWrapper);
}

