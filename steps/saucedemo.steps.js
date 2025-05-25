const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');

let browser, context, page;

Before(async () => {
  browser = await chromium.launch({ headless: false }); // set to true for headless mode
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await browser.close();
});

Given('I am logged in to SauceDemo', async () => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.waitForSelector('span.title');
  const title = await page.textContent('span.title');
  assert.strictEqual(title, 'Products');
});

When('I sort products by price ascending', async () => {
  await page.click('[data-test="secondary-header"]');
  await page.selectOption('[data-test="product-sort-container"]', 'lohi');
});

Then('products should be sorted in ascending order', async () => {
  const pricesHandles = await page.$$('div.inventory_item_price');
  let prevPrice = 0;

  for (const priceHandle of pricesHandles) {
    const priceText = await priceHandle.textContent();
    const price = parseFloat(priceText.replace('$', '').trim());
    if (prevPrice !== 0 && prevPrice > price) {
      throw new Error('Products are not sorted in ascending order');
    }
    prevPrice = price;
  }
});

When('I sort products by price descending', async () => {
  await page.click('[data-test="secondary-header"]');
  await page.selectOption('[data-test="product-sort-container"]', 'hilo');
});

Then('products should be sorted in descending order', async () => {
  const pricesHandles = await page.$$('div.inventory_item_price');
  let prevPrice = 0;

  for (const priceHandle of pricesHandles) {
    const priceText = await priceHandle.textContent();
    const price = parseFloat(priceText.replace('$', '').trim());
    if (prevPrice !== 0 && prevPrice < price) {
      throw new Error('Products are not sorted in descending order');
    }
    prevPrice = price;
  }
});

When('I place an order for {string} and {string}', async (item1, item2) => {
  await page.click('[data-test="secondary-header"]');
  await page.selectOption('[data-test="product-sort-container"]', 'hilo');

  const products = await page.$$('div.inventory_item');
  for (const product of products) {
    const name = await product.$eval('div.inventory_item_name', el => el.textContent);
    if (name === item1 || name === item2) {
      const button = await product.$('button');
      await button.click();
    }
  }

  await page.click('a.shopping_cart_link');
  await page.click("[data-test='checkout']");
  await page.fill('#first-name', 'wazza');
  await page.fill('#last-name', 'oski');
  await page.fill('#postal-code', '2214');
  await page.click('#continue');
  await page.click('#finish');
});

Then('I should see the order confirmation message', async () => {
  const thankYouMessage = await page.textContent('h2');
  assert.strictEqual(thankYouMessage, 'Thank you for your order!');
});
