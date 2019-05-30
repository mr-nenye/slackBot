const Slackbot = require('slackbots');
const axios = require('axios');
const puppeteer = require('puppeteer');

const bot = new Slackbot({
    token: 'xoxb-3001235383-622253085025-eqUVkCKTpKt3bi1my0ciwXLE',
    name: 'tiphubservice'
})

// start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ":perfect:"
    }

    bot.postMessageToChannel('general', 'tiphibservice bot help and ready to assist', params);
});

// error handler
bot.on('error', (err) => console.log(err))

// message handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
})

// function to handle user message
function handleMessage(message) {
    if (message.includes(' growth')) {
        goToGrowth();
    } else if (message.includes(' help')) {
        getHelp();
    } else if (message.includes(' yomomma')){
        yomommajoke();
    } else if (message.includes(' random')) {
        randomjoke();
    }
}

// chucknorris joke handler
function chuckjoke() {
    axios.get('http://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ":perfect:"
            }
        
            bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
    })
}

// using puppeteer here but I'm getting some errors
function growthKeyword() {
    // (async () => {
    //     let url = "https://a16z.com/2015/09/30/what-to-do-if-growth-stops";
    //     let browser = await puppeteer.launch();
    //     let page  = browser.newPage();

    //     await page.goto(url, {waitUntil: 'networkidle2'});

    //     let data = await page.evaluate(() => {
    //         let title  = document.querySelector('h1[class="entry-header__title"]').innerText;
    //         let mainCaption = document.querySelector('p').innerText;

    //         return {
    //             title,
    //             mainCaption
    //         }
    //     });

    //     const params = {
    //         icon_emoji: ":perfect:"
    //     }

    //     bot.postMessageToChannel('general', `${data}`, params);

    //     await browser.close();
    // })()

    const data = "<h3> The ‘Oh, Shit!’ Moment When Growth Stops </h3> <br> <i> “A relationship, I think, is like a shark. You know? It has to constantly move forward or it dies. And I think what we got on our hands is a dead shark.” –from the movie Annie Hall </i> <br> <p> Most high-growth businesses stare down periods when growth unexpectedly slows down or stops altogether. At some point, that stomach-churning moment has visited the leadership of most of the companies I’ve advised. We also faced it at OpenTable, eBay, and Reel.com when I was managing them. And it has reputedly happened to a number of today’s mightiest internet businesses as well, including the likes of Amazon and Facebook. </p>"

    const params = {
        icon_emoji: ":perfect:"
    }

    bot.postMessageToChannel('general', `${data}`, params);
}

// yomomma joke handler
function yomommajoke() {
    axios.get('http://api.yomomma.info')
        .then(res => {
            const joke = res.data.joke;

            const params = {
                icon_emoji: ":perfect:"
            }
        
            bot.postMessageToChannel('general', `Yo Momma: ${joke}`, params);
    })
}

// Grwoth infomation
function goToGrowth() {
    const helper = 'http://a16z.com/2015/09/30/what-to-do-if-growth-stops/'
    const params = {
        icon_emoji: ":perfect:"
    }
    bot.postMessageToChannel('general', `${helper}`, params);
}

// random joke handler
function randomjoke() {
    const rand = Math.floor(Math.random() * 2) + 1;
    if (rand === 1){
        chuckjoke();
    } else if (rand === 2) {
        yomommajoke();
    }
}



// get the list of command the bot can run
function getHelp() {
    const params = {
        icon_emoji: ":question:"
    }

    bot.postMessageToChannel('general', `Type @tiphubservice with either 'chucknorris', 'yomomma' or 'random' to get a joke`, params);
}