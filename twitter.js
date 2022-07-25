const puppeteer = require("puppeteer");


const run = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 20,
        defaultViewport: {
            width: 450,
            height: 630
        }
    });

    const twPage = await browser.newPage();
    const url = 'https://twitter.com/i/flow/login'
    await twPage.goto(url);
    // await twPage.waitForTimeout(6000)
    await twPage.waitForSelector('input', {
        visible: true
    })
    // await twPage.screenshot({ path: 'loginP.png' })

    await twPage.type('[autocomplete="username"]', 'Sabirtweets8')
    await twPage.click('div[role="button"]:nth-of-type(6)')

    // await browser.close()
}
run();


