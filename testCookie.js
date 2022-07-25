const fs = require('fs').promises;
// const fs = require('fs');
const puppeteer = require("puppeteer");


const test = async () => {
    // TODO: 

    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: './cache', // this enable caching.
        slowMo: 20
        // defaultViewport: {
        //     width: 450,
        //     height: 630
        // }
    });
    const twPage = await browser.newPage();
    // Configure the navigation timeout
    await twPage.setDefaultNavigationTimeout(0);
    await twPage.setRequestInterception(true);
    twPage.on('request', req => {
        // Block specific request
        if (req.url().endsWith('.png')) {
            req.abort();
        } else {
            req.continue();
        }
    })

    // Load cookie
    const cookieStr = await fs.readFile('./cookies1.json')
    const cookies = JSON.parse(cookieStr)
    // console.log(cookie)

    // SET COOKIES
    // await twPage.setCookie(...cookies);
    // const url = 'https://twitter.com/ShahriarRizvi03'
    // const url = 'https://twitter.com/ShahriarRizvi03/followers'
    const url = 'https://twitter.com/zawwadx/followers'
    await twPage.goto(url);
    // document.querySelectorAll('div[aria-label="Timeline: Followers"] div[data-testid="UserCell"] >div>div:first-child')

    // const list = await twPage.evaluate(() => {
    //     return document.documentElement.querySelectorAll("document.querySelectorAll('div[aria-label='Timeline: Followers'] div[data-testid='UserCell'] >div>div:first-child')")
    // })
    // console.log(list);


    // await browser.close()
}
test();