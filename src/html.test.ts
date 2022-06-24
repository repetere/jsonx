import puppeteer from 'puppeteer';

describe('End to End HTML Tests', function(){
  let browser:puppeteer.Browser;
  let page:puppeteer.Page;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  },10000);
  afterAll(async () => {
    await browser.close();
  });
  
  describe('Functional Component Test',()=>{
    it('should render the page', async()=>{
      await page.goto(`file://${__dirname}/examples/component-make_function_component.html`,{
        waitUntil: 'networkidle2',
      });
      const initialPageData = await page.evaluate(()=>{
        const titleText = document.querySelector('title')?.innerHTML
        //@ts-ignore
        const inputValue = document.querySelector('input[name="inputCount"]')?.value
        return {inputValue,titleText}
      })
      expect(initialPageData.titleText).toBe('JSONX TEST')
      expect(parseInt(initialPageData.inputValue)).toBe(0)


      await page.$eval('#buttonCount',(el:any)=>el.click())
      await page.$eval('#buttonCount',(el:any)=>el.click())
      await page.$eval('#buttonCount',(el:any)=>el.click())
      const modifiedPageData = await page.evaluate(()=>{
        //@ts-ignore
        const inputValue = document.querySelector('input[name="inputCount"]')?.value
        return {inputValue}
      })
      // console.log({initialPageData,modifiedPageData})
      expect(parseInt(modifiedPageData.inputValue)).toBe(3)
      // await page.screenshot({ path: 'example.png' });
    },30000)
  })
  describe('Dynamic Component Test',()=>{
    it('should render the page', async()=>{
      await page.goto(`file://${__dirname}/examples/component-dynamic_component.html`,{
        waitUntil: 'networkidle2',
      });
      const pageTitle = await page.$eval('title',(el:any)=>el.innerText)
      const pageContent = await page.content()
      expect(pageTitle).toBe('DYNAMIC COMPONENT TEST')
      expect(pageContent.includes('...Loading')).toBe(true)
      await page.waitForSelector('#fetchedTitle')
      const resolvedContentTitle = await page.$eval('#fetchedTitle',(el:any)=>el.innerText)
      const resolvedContentData = await page.$eval('#fetchedP',(el:any)=>el.innerText)
      expect(resolvedContentTitle).toBe('Fetched Data')
      expect(resolvedContentData).toBe('some mock data')
    },30000)
  })
  describe('Basic Component Test',()=>{
    it('should render the page', async()=>{
      await page.goto(`file://${__dirname}/examples/component-form_component.html`,{
        waitUntil: 'networkidle2',
      });
      const pageTitle = await page.$eval('title',(el:any)=>el.innerText)
      const initialFormData = await page.$eval('#formResult',(el:any)=>el.value)
      expect(initialFormData).toBe('')
      expect(pageTitle).toBe('FORM COMPONENT TEST')
      await page.evaluate( () => (document.getElementById("firstName") as HTMLInputElement).value = "")
      await page.focus('#firstName')
      await page.keyboard.type('Jest')

      await page.evaluate( () => (document.getElementById("lastName") as HTMLInputElement).value = "")
      await page.focus('#lastName')
      await page.keyboard.type('Test')
      await page.$eval('[name="saveInfo"]',(el:any)=>el.click())
      
      await page.focus('[name="email"]')
      await page.keyboard.type('adding from jest')

      await page.$eval('#formSubmitButton',(el:any)=>el.click())
      await page.focus('#formResult')
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000)

      const resolvedFormData = await page.$eval('#formResult',(el:any)=>el.value)
      const formData = JSON.parse(resolvedFormData)
      expect(formData).toMatchObject({
        firstName: 'Jest',
        lastName: 'Test',
        saveInfo: true,
        email: 'bluebill1049@example.comadding from jest'
      })
      // expect(resolvedContentData).toBe('some mock data')
    },30000)
  })
  describe('Advanced Form Test',()=>{
    it('should render the page', async()=>{
      async function click(selector:string = '#submitButton'){
          // await page.$eval('#submitButton',(el:any)=>el.click())
          await page.focus(selector)
          await page.keyboard.press('Enter');
          await page.waitForTimeout(200)
      }
      await page.goto(`file://${__dirname}/examples/component-advanced_form_component.html`,{
        waitUntil: 'networkidle2',
      });
      await page.waitForSelector('#advanedFormResults')
      const pageTitle = await page.$eval('title',(el:any)=>el.innerText)
      const initialFormData = await page.$eval('#advanedFormResults',(el:any)=>el.innerText)
      expect(pageTitle).toBe('STATEFUL FORM TEST')
      const serverName = await page.$eval('#serverName',(el:any)=>el.value)
      expect(serverName).toBe('my web app')
      expect(initialFormData).toBe('{}')


      // await page.evaluate( () => (document.querySelector('[name="api[0].name"]') as HTMLInputElement).value = "")
      await page.focus('[name="api[0].name"]')
      await page.keyboard.type('Twitter')
      await click()
      const firstSubmit = await page.$eval('#advanedFormResults',(el:any)=>el.innerText)
      expect(JSON.parse(firstSubmit)).toMatchObject({
        "serverName": "my web app",
        "api": [
          {
            "name": "Twitter"
          }
        ]
      })
      await click('#addAPI')
      await page.focus('[name="api[1].name"]')
      await page.keyboard.type('Facebook')
      await click()
      const secondSubmit = await page.$eval('#advanedFormResults',(el:any)=>el.innerText)
      expect(JSON.parse(secondSubmit)).toMatchObject({
        "serverName": "my web app",
        "api": [
          {
            "name": "Twitter"
          },
          {
            "name": "Facebook"
          }
        ]
      })
      
    },30000)
  })
  describe('Custom Components Sytanx Test',()=>{
    it('should render the page', async()=>{
      await page.goto(`file://${__dirname}/examples/component-inline_function.html`,{
        waitUntil: 'networkidle2',
      });
      const pageTitle = await page.$eval('title',(el:any)=>el.innerText)
      // const initialFormData = await page.$eval('#advanedFormResults',(el:any)=>el.innerText)
      expect(pageTitle).toBe('CUSTOM COMPONENTS INLINE TEST')
      const mainContent = await page.$eval('main',(el:any)=>el.innerHTML)
      // console.log({mainContent})
      expect(mainContent.includes('gen custom')).toBe(true)
      expect(mainContent.includes('My Custom React Component Status')).toBe(true)
      expect(mainContent.includes('<div testprop="should be passed"><span testprop="should be passed">from func</span></div>')).toBe(true)
    },30000)
  })
  describe('Simple Sytanx Test',()=>{
    it('should render the page', async()=>{
      await page.goto(`file://${__dirname}/examples/component-simple_syntax.html`,{
        waitUntil: 'networkidle2',
      });
      const pageTitle = await page.$eval('title',(el:any)=>el.innerText)
      // const initialFormData = await page.$eval('#advanedFormResults',(el:any)=>el.innerText)
      expect(pageTitle).toBe('SIMPLE SYNTAX TEST')
      const docTitle = await page.$eval('#docTitle',(el:any)=>el.innerText)
      expect(docTitle).toBe('SIMPLE SYNTAX TEST')
      // expect(initialFormData).toBe('{}')
      const mainContent = await page.$eval('main',(el:any)=>el.innerHTML)
      expect(mainContent.includes('<li>first</li>')).toBe(true)
      expect(mainContent.includes('<p title="this is a passed Title">mixed usage with regular syntax</p>')).toBe(true)
    },30000)
  })
})