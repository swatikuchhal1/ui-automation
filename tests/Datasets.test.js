import { Rules } from '../pages/components/Rules'
import { apiCalls } from '../pages/components/apiCalls'
import { username, password, timeout, panel } from "../config"
import { BasePage } from "../pages/BasePage"

describe('Datasets Regression Testing Suite', () => {
    let rules
    let basePage

    let pod
    let api
    let datasetGuid
    let templateGuid

    beforeAll(async () => {
        jest.setTimeout(timeout)
        rules = new Rules()
        basePage = new BasePage()
        api = new apiCalls()

        pod = '2b4e915b-b9cd-44c1-a259-acd901165502'  //Swati Panel
    })

    it('Test 1 : Login to sit1', async () => {
        await rules.login(username, password)
    })

    it('Test 2 : Go To CXM Page', async () => {
        await rules.gotoCXMPage()

    })

    it('Test 3 : Create new rule', async () => {
        await rules.createNewRule()

    })
    afterAll(async () => {
        await rules.close()
        // await api.close()
    })
})