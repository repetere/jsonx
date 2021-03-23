import puppeteer from 'puppeteer';

describe('End to End HTML Tests', function(){
  let browser:puppeteer.Browser;
  let page:puppeteer.Page;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });
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
    })
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
    },10000)
  })
})