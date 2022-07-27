



const puppeteer = require('puppeteer');

const run = async () => {
    try {

        const observeMutation = () => {
            const onMutationHandler = mutationEntries => {
                // console.log(mutationEntries);
                for (const entrie of mutationEntries) {
                    console.log(entrie.removedNodes[0]);
                }
            }

            const mutationObserver = new MutationObserver(onMutationHandler)
            const nodeElement = document.querySelector('.ReactVirtualized__Grid__innerScrollContainer')
            mutationObserver.observe(nodeElement, { childList: true, subtree: false })

        }





        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: './testCache', // this enable caching.
            // slowMo: 20
        });

        const page = await browser.newPage()
        const url = 'https://bvaughn.github.io/react-virtualized/#/components/List'
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.waitForTimeout(2000) //start devtool

        page.evaluate(observeMutation);


        // close the browser.
        // browser.close();
    } catch (err) {
        console.error('got an error:\n', err);
    }
}
run();