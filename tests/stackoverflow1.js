const puppeteer = require('puppeteer')

const run = async () => {


    var baseurl = 'https://chat.stackoverflow.com/rooms/6/python';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(baseurl);

    await page.exposeFunction('getItem', function (a) {
        console.log(a);
    });

    await page.evaluate(() => {
        var observer = new MutationObserver((mutations) => {
            for (var mutation of mutations) {
                if (mutation.addedNodes.length) {
                    getItem(mutation.addedNodes[0].innerText);
                }
            }
        });
        observer.observe(document.getElementById("chat"), { attributes: false, childList: true, subtree: true });
    });
}
run()