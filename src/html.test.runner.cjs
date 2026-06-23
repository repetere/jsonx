const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const scenario = process.argv[2];

function exampleUrl(fileName) {
  return pathToFileURL(path.join(__dirname, 'examples', fileName)).href;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function openExample(page, fileName) {
  await page.goto(exampleUrl(fileName), {
    waitUntil: 'networkidle2',
  });
}

async function runScenario(page) {
  switch (scenario) {
    case 'functional': {
      await openExample(page, 'component-make_function_component.html');
      const initialPageData = await page.evaluate(() => {
        const titleText = document.querySelector('title')?.innerHTML;
        const inputValue = document.querySelector('input[name="inputCount"]')?.value;
        return { inputValue, titleText };
      });
      assert.equal(initialPageData.titleText, 'JSONX TEST');
      assert.equal(parseInt(initialPageData.inputValue, 10), 0);

      await page.$eval('#buttonCount', (el) => el.click());
      await page.$eval('#buttonCount', (el) => el.click());
      await page.$eval('#buttonCount', (el) => el.click());
      const modifiedPageData = await page.evaluate(() => {
        const inputValue = document.querySelector('input[name="inputCount"]')?.value;
        return { inputValue };
      });
      assert.equal(parseInt(modifiedPageData.inputValue, 10), 3);
      break;
    }
    case 'dynamic': {
      await openExample(page, 'component-dynamic_component.html');
      const pageTitle = await page.$eval('title', (el) => el.innerText);
      assert.equal(pageTitle, 'DYNAMIC COMPONENT TEST');
      await page.waitForSelector('#fetchedTitle');
      const resolvedContentTitle = await page.$eval('#fetchedTitle', (el) => el.innerText);
      const resolvedContentData = await page.$eval('#fetchedP', (el) => el.innerText);
      assert.equal(resolvedContentTitle, 'Fetched Data');
      assert.equal(resolvedContentData, 'some mock data');
      break;
    }
    case 'basic-form': {
      await openExample(page, 'component-form_component.html');
      const pageTitle = await page.$eval('title', (el) => el.innerText);
      const initialFormData = await page.$eval('#formResult', (el) => el.value);
      assert.equal(initialFormData, '');
      assert.equal(pageTitle, 'FORM COMPONENT TEST');
      await page.evaluate(() => {
        document.getElementById('firstName').value = '';
      });
      await page.focus('#firstName');
      await page.keyboard.type('Jest');

      await page.evaluate(() => {
        document.getElementById('lastName').value = '';
      });
      await page.focus('#lastName');
      await page.keyboard.type('Test');
      await page.$eval('[name="saveInfo"]', (el) => el.click());

      await page.focus('[name="email"]');
      await page.keyboard.type('adding from jest');

      await page.$eval('#formSubmitButton', (el) => el.click());
      await page.focus('#formResult');
      await page.keyboard.press('Enter');
      await delay(1000);

      const resolvedFormData = await page.$eval('#formResult', (el) => el.value);
      const formData = JSON.parse(resolvedFormData);
      assert.deepEqual(formData, {
        firstName: 'Jest',
        lastName: 'Test',
        saveInfo: true,
        email: 'bluebill1049@example.comadding from jest',
      });
      break;
    }
    case 'advanced-form': {
      async function click(selector = '#submitButton') {
        await page.focus(selector);
        await page.keyboard.press('Enter');
        await delay(200);
      }

      await openExample(page, 'component-advanced_form_component.html');
      await page.waitForSelector('#advanedFormResults');
      const pageTitle = await page.$eval('title', (el) => el.innerText);
      const initialFormData = await page.$eval('#advanedFormResults', (el) => el.innerText);
      assert.equal(pageTitle, 'STATEFUL FORM TEST');
      const serverName = await page.$eval('#serverName', (el) => el.value);
      assert.equal(serverName, 'my web app');
      assert.equal(initialFormData, '{}');

      await page.focus('[name="api[0].name"]');
      await page.keyboard.type('Twitter');
      await click();
      const firstSubmit = await page.$eval('#advanedFormResults', (el) => el.innerText);
      assert.deepEqual(JSON.parse(firstSubmit), {
        serverName: 'my web app',
        api: [
          {
            name: 'Twitter',
          },
        ],
      });
      await click('#addAPI');
      await page.focus('[name="api[1].name"]');
      await page.keyboard.type('Facebook');
      await click();
      const secondSubmit = await page.$eval('#advanedFormResults', (el) => el.innerText);
      assert.deepEqual(JSON.parse(secondSubmit), {
        serverName: 'my web app',
        api: [
          {
            name: 'Twitter',
          },
          {
            name: 'Facebook',
          },
        ],
      });
      break;
    }
    case 'custom-components': {
      await openExample(page, 'component-inline_function.html');
      const pageTitle = await page.$eval('title', (el) => el.innerText);
      assert.equal(pageTitle, 'CUSTOM COMPONENTS INLINE TEST');
      const mainContent = await page.$eval('main', (el) => el.innerHTML);
      assert.equal(mainContent.includes('gen custom'), true);
      assert.equal(mainContent.includes('My Custom React Component Status'), true);
      assert.equal(mainContent.includes('<div testprop="should be passed"><span testprop="should be passed">from func</span></div>'), true);
      break;
    }
    case 'simple-syntax': {
      await openExample(page, 'component-simple_syntax.html');
      const pageTitle = await page.$eval('title', (el) => el.innerText);
      assert.equal(pageTitle, 'SIMPLE SYNTAX TEST');
      const docTitle = await page.$eval('#docTitle', (el) => el.innerText);
      assert.equal(docTitle, 'SIMPLE SYNTAX TEST');
      const mainContent = await page.$eval('main', (el) => el.innerHTML);
      assert.equal(mainContent.includes('<li>first</li>'), true);
      assert.equal(mainContent.includes('<p title="this is a passed Title">mixed usage with regular syntax</p>'), true);
      break;
    }
    default:
      throw new Error(`Unknown HTML test scenario: ${scenario}`);
  }
}

async function main() {
  const puppeteer = (await import('puppeteer')).default;
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  try {
    await runScenario(page);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
