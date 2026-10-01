// Requerir geckodriver añade el ejecutable al PATH de Node automáticamente
require('geckodriver'); 
const { setDriver } = require('mongoose');
//Import the Builder class from selenuim-webdriver
const { Builder } = require('selenium-webdriver');

//Function to open Firefox
async function openFirefox() {
    //Create a new Chrome browser instance
    //También funciona para Brave
    //let driver = await new Builder().forBrowser('chrome').build();
    
    //Create a new Firefox browser instance
    let driver = await new Builder().forBrowser('firefox').build();

    //Navigate to Google's homepage
    await driver.get('https://www.firefox.com');

    //Make the browser window full screen
    await driver.manage().window().maximize();
    console.log('Tamaño de ventana: ', await driver.manage().window().getRect());

    //Wait for 3 seconds
    await driver.sleep(8000);
    
    try {
        const agreeButton = await driver.findElement( { css: '#nav-download-firefox' } );
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", agreeButton);
        await driver.sleep(500);
        await agreeButton.click();
        console.log( 'Successfully clicked the "Button" button');
    } catch (error) {
        console.error('Failed to find or click the "I agree" button: ', error.message);
    }

    //Wait for a moment after clicking to allow the page to respond
    await driver.sleep(30000);

    //Close the driver 
    //await driver.quit();
}

openFirefox();