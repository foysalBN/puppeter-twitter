const puppeteer = require('puppeteer');

/* CHECK THIS OUT: 
1.  https://stackoverflow.com/questions/54109078/puppeteer-wait-for-page-dom-updates-respond-to-new-items-that-are-added-after
2. https://stackoverflow.com/questions/47903954/how-to-inject-mutationobserver-to-puppeteer
 */

/* TODO==================
    1. WAIT FOR SINGLE USER CELL
    2. SAVE EXISTING USER
    3. THEN MUTATTION & COUNT
    4. SCROLL 💪


 */
//  =====================


const run = async () => {
    try {

        const observeMutation = async () => {
            const onMutationHandler = mutationEntries => {
                // console.log(mutationEntries);
                for (const entrie of mutationEntries) {
                    // if (entrie.removedNodes.length) {
                    //     for (const node of entrie.removedNodes) {
                    if (entrie.addedNodes.length) {

                        // 💪 this line of code is working fine ==================
                        // console.log('added node--\n', entrie.addedNodes[0])
                        // ========================================================

                        for (const node of entrie.addedNodes) {
                            // const t = 
                            // node.querySelectorAll('div[data-testid="UserCell"]>div>div:nth-child(2)')

                            // console.log(document.querySelector('div[data-testid="UserCell"]>div>div:nth-child(2)>div a[role="link"]').href);

                            // console.log(node);
                            console.log(node.querySelector('div[data-testid="UserCell"]>div>div:nth-child(2)>div a[role="link"]').href);

                            // console.log(node);



                        }

                    }

                }
            }

            const mutationObserver = new MutationObserver(onMutationHandler)
            const nodeElement = document.querySelector('div[aria-label="Timeline: Followers"]>div')
            mutationObserver.observe(nodeElement, {
                childList: true
            })

        }

        // Scroll
        const scrollToBottom = async page => {
            let retryScrollCount = 3;

            while (true) {
                try {
                    // ================== START ====================
                    let scrollPosition = await page.$eval('div[aria-label="Timeline: Followers"]>div', wrapper => wrapper.scrollTop)

                    await page.evaluate(() => document.querySelector('div[aria-label="Timeline: Followers"]>div').scrollBy({ top: 200, behavior: 'smooth' }))
                    await waitForTimeout(200)


                    await page.waitForFunction(`document.querySelector('div[aria-label="Timeline: Followers"]>div').scrollTop > ${scrollPosition}`, { timeout: 1_000 })


                    // ================== END ====================

                } catch (error) {
                    console.log("🚀 ~ file: follower.js ~ line 49 ~ observeMutation ~ error", error);

                }
            }
        }



        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: './cache', // this enable caching.
            // slowMo: 20
        });

        const page = await browser.newPage()
        // const followerUrl = 'https://twitter.com/ShahriarRizvi03/followers'
        const followerUrl = 'https://twitter.com/elonmusk/followers'
        await page.goto(followerUrl, { waitUntil: 'networkidle0' });
        await page.waitForTimeout(2000) //start devtool

        await page.evaluate(observeMutation);
        // await scrollToBottom(page)




        // close the browser.
        // browser.close();
    } catch (err) {
        console.error('got an error:\n', err);
    }
}
run();