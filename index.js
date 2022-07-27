const run = async () => {
    // const browser = await puppeteer.launch();
    // we can add width on lunch
    const browser = await puppeteer.launch({
        // headless: false,
        // defaultViewport: {
        //     width: 500,
        //     height: 900
        // }
    });

    const page = await browser.newPage();
    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);

    // await page.goto('https://google.com');
    await page.goto('https://twitter.com/ShahriarRizvi03');

    await page.screenshot({ path: 'image.png' });

    const pageHtml = await page.evaluate(() => {
        // return document.documentElement.innerHTML
        return document.documentElement.querySelector('div[data-testid="UserName"] div[dir="auto"] span span').innerHTML
    })
    console.log(pageHtml)





    // await browser.close()
}
run();
console.log('========completed===========')
