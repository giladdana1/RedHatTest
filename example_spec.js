describe('log in to tutoriabls ninja site', function() {
  it("Test user login flow", function(){
    var userData = require('./DL/userDetails.json');
    browser.ignoreSynchronization = true; // This allows to protractor to run on regular website, not specific to angular 
    browser.driver.manage().window().maximize();
    browser.get(userData.url); // Go to a specific URL 
    element(by.css("#top-links > ul > li.dropdown > a > span.hidden-xs.hidden-sm.hidden-md")).click();
    element(by.css("#top-links > ul > li.dropdown.open > ul > li:nth-child(2) > a")).click();
    element(by.css("#input-email")).sendKeys(userData.email);
    element(by.css("#input-password")).sendKeys(userData.password);
    element(by.css("#content > div > div:nth-child(2) > div > form > input")).click();
    //found my account logo
    expect(element(by.css("#content > h2:nth-child(1)")));
  });

  it("Test product sorting by price", function(){
    var productData = require('./DL/productDetails.json');
    element(by.linkText(productData.devision)).click();
    element(by.partialLinkText(productData.productName)).click();
    //Price (Low > High)
    element(by.css("#input-sort")).click();
    element(by.xpath("//*[@id='input-sort']//*[contains(@value,'price&order=ASC')]")).click();
    expect(element(by.linkText("Canon EOS 5D")));
    //Price (High > Low)
    element(by.css("#input-sort")).click();
    element(by.xpath("//*[@id='input-sort']//*[contains(@value,'price&order=DESC')]")).click();
    expect(element(by.linkText("Sony VAIO")));
  });
  
  it("Test placing an order", function(){
    var billingData = require('./DL/billingDetails.json');
    //getting the price of the MacBook
    var macBookPrice = "$500.00";
    //selecting MacBook"
    element(by.css("#content > div:nth-child(7) > div:nth-child(3) > div > div:nth-child(2) > div.button-group > button:nth-child(1) > span")).click();
    browser.sleep(3000);
    element(by.id('cart-total')).click();
    //getting the price from the cart
    var cartPrice = element(by.css("#cart > ul > li:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)")).getText();
    expect(macBookPrice).toEqual(cartPrice);
    //click on checkout
    element(by.css("#cart > ul > li:nth-child(2) > div > p > a:nth-child(2) > strong")).click();
    browser.sleep(3000);
    //fill in the billing details from json
    element(by.id('input-payment-firstname')).sendKeys(billingData.firstName);
    element(by.id('input-payment-lastname')).sendKeys(billingData.lastName);
    element(by.id('input-payment-company')).sendKeys(billingData.company);
    element(by.id('input-payment-address-1')).sendKeys(billingData.address1);
    element(by.id('input-payment-city')).sendKeys(billingData.city);
    element(by.id('input-payment-postcode')).sendKeys(billingData.postCode);
    element(by.id('input-payment-country')).sendKeys(billingData.country);
    element(by.id('input-payment-zone')).sendKeys(billingData.region);
    //didn't fill in payment details 
  });
});
