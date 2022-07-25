const fs = require('fs').promises;
// const fs = require('fs');
const puppeteer = require("puppeteer");


const test = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 20,
        defaultViewport: {
            width: 450,
            height: 630
        }
    });
    const twPage = await browser.newPage();
    // Configure the navigation timeout
    await twPage.setDefaultNavigationTimeout(0);

    const url = 'https://twitter.com/i/flow/login'
    await twPage.goto(url);
    await twPage.waitForSelector('input', {
        visible: true
    })
    await twPage.type('[autocomplete="username"]', 'Sabirtweets8')
    await twPage.click('div[role="button"]:nth-of-type(6)')
    console.log('waiting--------------')
    await twPage.waitForTimeout(120000) // 2m
    console.log('end--------------')

    const cookies = await twPage.cookies()
    console.log(cookies);
    await fs.writeFile('./cookies1.json', JSON.stringify(cookies, null, 2))
    console.log('done------------',)


    // await browser.close()
}
test();