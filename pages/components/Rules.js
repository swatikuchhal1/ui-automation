import { BasePage } from "../BasePage"
import { env, imageMatch, panel, surveyName, takeScreenshots } from "../../config"
import { click, insert, clickXPathElement, insertXPathElement, waitForElement, waitForXPathElement } from "../../lib/helpers"
import { browserContext } from "../../jest-puppeteer.config"
import { assert } from "console"
const fs = require('fs')
const pixelmatch = require('pixelmatch')
const PNG = require('pngjs').PNG;


export class Rules extends BasePage {

    async login(username, password) {
        await page.goto(env)
        await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 0.50 })
        await waitForElement(page, '.signin-header')
        if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/1_Login.png', fullPage: true })
        }

        const img1 = PNG.sync.read(fs.readFileSync('../ui-automation-main/screenshots/1_Login.png'))
        const img2 = PNG.sync.read(fs.readFileSync('../ui-automation-main/masterscreenshots/1_Master_Login.png'))

        const { width, height } = img1
        const diff = new PNG({ width, height })
        if (imageMatch == 'true') {
            pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 })
            fs.writeFileSync('../ui-automation-main/screenshots/1_Login_diff.png', PNG.sync.write(diff))
        }

        await insert(page, '#Email', username)
        await insert(page, '#Password', password)
        await click(page, '#email-form > div > input')
        await page.waitForTimeout(15000)

        try {
            const panelName = await page.$eval('#tenant-search', el => el.value)
            if (panelName != panel) {
                await click(page, '#tenant-search')
                await page.waitForTimeout(3000)
                await page.$eval('#tenant-search', el => el.value = '')
                await insert(page, '#tenant-search', panel)
                await page.keyboard.press('ArrowDown')
                await page.keyboard.press('Enter')
            }
        } catch (error) {
            throw new Error("Issue while selecting the Panel..!!")
        }

        await page.waitForTimeout(12000)

    }

    async gotoCXMPage() {
        if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/2_HomePage.png', fullPage: true })
        }
        const img1 = PNG.sync.read(fs.readFileSync('../ui-automation-main/screenshots/2_HomePage.png'))
        const img2 = PNG.sync.read(fs.readFileSync('../ui-automation-main/masterscreenshots/2_Master_HomePage.png'))
        const { width, height } = img1
        const diff = new PNG({ width, height })
        if (imageMatch == 'true') {
            pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 })
            fs.writeFileSync('../ui-automation-main/screenshots/2_HomePage_diff.png', PNG.sync.write(diff))
        }

        //page.reload()
        await page.waitForTimeout(10000)
        await page.waitForSelector('#cxm-link')
        await page.click('#cxm-link')

        await page.waitForTimeout(10000)
        if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/3_CXM.png', fullPage: true })
        }
        const img3 = PNG.sync.read(fs.readFileSync('../ui-automation-main/screenshots/3_CXM.png'))
        const img4 = PNG.sync.read(fs.readFileSync('../ui-automation-main/masterscreenshots/3_Master_CXM.png'))
        const diff2 = new PNG({ width: img3.width, height: img3.height })
        if (imageMatch == 'true') {
            pixelmatch(img3.data, img4.data, diff2.data, img3.width, img3.height, { threshold: 0.1 })
            fs.writeFileSync('../ui-automation/screenshots/3_CXM_diff.png', PNG.sync.write(diff2))
        }

        await page.waitForTimeout(15000)

        page.goto('https://app.sit1.vcilabs.com/cxm/rules')


        await page.waitForTimeout(12000)

        await page.screenshot({ path: 'screenshots/4_CXMRules.png', fullPage: true })
        await page.waitForTimeout(10000)


    }

    async createNewRule() {


        await page.waitForTimeout(2000)
        const [newRule] = await page.$x("//div[contains(text(),'New Rule')]")
        await newRule.click()
        await page.waitForTimeout(10000)

        const [ruleName] = await page.$x("//input[@placeholder='Enter a name for this rule']")
        await ruleName.type("auto-test-swati2")
        await page.waitForTimeout(5000)
        const [createCondition] = await page.$x("//div[contains(text(),'Condition')]")
        await createCondition.click()
        await page.screenshot({ path: 'screenshots/5_CXMNewRule.png', fullPage: true })
        await page.waitForTimeout(20000)
        await page.click('[id="Data Source"]')
        await page.waitForTimeout(10000)
        await insert(page, '[id="Data Source"]', "Sparq Survey")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        await page.click('[id="Survey Name"]')
        await insert(page, '[id="Survey Name"]', "test-rec-1")
        await page.waitForTimeout(2000)
        await page.keyboard.press('ArrowDown')

        await page.keyboard.press('Enter')

        await page.waitForTimeout(5000)
        await page.click('[id="Question"]')
        await page.waitForTimeout(10000)
        await page.click('#Question-option-3')
        await page.click('[id="Operator"]')
        await insert(page, '[id="Operator"]', "Is")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        await page.waitForSelector('#Answer')
        await page.click('#Answer')

        await page.waitForSelector('#Answer-option-0')
        await page.click('#Answer-option-0')
        const [createAction] = await page.$x("//div[contains(text(),'Create An Action')]")
        createAction.click()
        await page.waitForTimeout(5000)
        const [actionDropDown] = await page.$x("(//div[@aria-haspopup='listbox'])[2]")
        actionDropDown.click()
        await page.waitForTimeout(5000)
        const [createSlackMessage] = await page.$x("//span[contains(text(),'Create Slack Message')]")
        await createSlackMessage.click()
        await page.waitForTimeout(5000)
        await page.click('[id="Channel-input"]')
      
        await page.waitForTimeout(5000)
        const [channelName] = await page.$x("//span[contains(text(),'@swati')]")
        channelName.click()
        await page.waitForTimeout(5000)
        const [message] = await page.$x("(//div[@aria-label='rdw-wrapper'])")
        message.click()
        await page.waitForTimeout(5000)
        await message.type("automation test")
        await page.waitForTimeout(5000)
        const [saveDraft] = await page.$x("//span[contains(text(),'Save As Draft')]")
        saveDraft.click()
        await page.waitForTimeout(5000)
        const [Draft] = await page.$x("//span[contains(text(),'Draft')]")
        Draft.click()
        await page.waitForTimeout(2000)
        const [enable] = await page.$x("//li[contains(text(),'Enable')]")
        enable.click()
        
        await page.waitForTimeout(5000)


        await page.screenshot({ path: 'screenshots/6_CXMNewRuleSurvey.png', fullPage: true })

    }
}
