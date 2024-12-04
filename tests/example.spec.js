// @ts-check
const { test, expect } = require('@playwright/test');

test('Ascending order', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle(/Swag Labs/);
  
  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('secret_sauce')

  await page.locator('#login-button').click()

  await expect(page.locator('span.title')).toHaveText('Products')

  await page.locator('[data-test="secondary-header"]').click();

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const lowProductList = await page.locator('div.inventory_item_price').elementHandles()

  var previousPrice = 0;
  
  for (const lowProduct of lowProductList)
  {
    var count = 0;
    
    const price = await lowProduct.textContent()
    
    if((previousPrice != 0) && previousPrice > parseFloat(price?.replace('$','').trim()) )
    {
      count = count + 1; 
    }
    
    previousPrice = parseFloat(price?.replace('$','').trim())

    if(count != 0) 
      {
        console.log('Error in sorting')
        break;
      }
  }

});

test('Descending order', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle(/Swag Labs/);
  
  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('secret_sauce')

  await page.locator('#login-button').click()

  await expect(page.locator('span.title')).toHaveText('Products')

  await page.locator('[data-test="secondary-header"]').click();

  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

  const highProductList = await page.locator('div.inventory_item_price').elementHandles()

  var previousPrice = 0;
  
  for (const highProduct of highProductList)
  {
    var count = 0;
    
    const price = await highProduct.textContent()
    
    if((previousPrice != 0) && previousPrice < parseFloat(price?.replace('$','').trim()) )
    {
      count = count + 1; 
    }
    
    previousPrice = parseFloat(price?.replace('$','').trim())

    if(count != 0) 
    {
      console.log('Error in sorting')
      break;
    }
  }

});

test('Place order', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle(/Swag Labs/);
  
  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('secret_sauce')

  await page.locator('#login-button').click()

  await expect(page.locator('span.title')).toHaveText('Products')

  await page.locator('[data-test="secondary-header"]').click();

  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

  const productList = await page.locator('div.inventory_item').elementHandles()

  for(const product of productList)
  {
    const productName = await product.$eval('div.inventory_item_name', el => el.textContent);
    const button = await product.$('button')

    if(productName == "Sauce Labs Backpack" || productName == "Sauce Labs Bolt T-Shirt") await button?.click()
  }

  await page.locator("a.shopping_cart_link").click()

  await page.locator("[data-test='checkout']").click()

  await page.locator("#first-name").fill('wazza')
  await page.locator("#last-name").fill('oski')
  await page.locator("#postal-code").fill('2214')

  await page.locator('#continue').click()
  await page.locator('#finish').click()

  await expect(page.locator('h2')).toHaveText('Thank you for your order!')
});




