const { remote } = require('webdriverio');
const en = require('../localization/translations/en.json');
const hi = require('../localization/translations/hi.json');

(async function () {
    let client;

    try {
        // Set up WebDriverIO client
        client = await remote({
            path: '/',
            port: 4723,
            // capabilities: {
            //     "platformName": "Android",
            //     "appium:deviceName": "emulator-5554",
            //     "appium:automationName": "uiautomator2",
            //     "appium:appPackage": "com.com.bleapp",
            //     "appium:appActivity": "com.bleapp.MainActivity"
            // },
            capabilities: {
                "appium:platformName": 'iOS',
                "appium:platformVersion": '17.2',
                "appium:deviceName": 'iPhone 15',
                "appium:bundleId": 'com.netradyne.BLEAppVedant',
                "appium:automationName": 'XCUITest',
                "appium:noReset": true,
            },
            locale: 'en',
        });

        // Test cases
        await resetApp(client);
        await testLanguage(en, client);
        await testLanguage(hi, client);
        

    console.log('All tests passed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        if (client) {
            await client.deleteSession();
        }
    }
})();

async function testLanguage(lang, client) {
    await openSettingsScreen(client);
    const langButton = lang.language === 'English' ? await client.$('~englishButton') : await client.$('~hindiButton');
    await langButton.click();


    await checkText('~chooseLanguage', lang.screens.settings.chooseLanguage, client);
    await checkText('~keepScreenOnHeader', lang.screens.settings.keepScreenOnHeader, client);
    await checkText('~keepScreenOnDesc', lang.screens.settings.keepScreenOnDesc, client);

    await checkText('~scanButton', lang.screens.home.scan, client);

    const moreMenu = await client.$('~moreMenu');
    await moreMenu.click();
    await checkText('~modalSettingsButton', lang.screens.moreMenu.settings, client);
    const modalBackground = await client.$('~modalBackground');
    await modalBackground.click();

    await checkHeaderText('~homeTab', lang.screens.home.title, client);
    await checkHeaderText('~rawTab', lang.screens.raw.title, client);
    await ((await client.$('~homeTab')).click());
    await checkText('~searchInput', lang.deviceList.searchPlaceHolder, client);
    await checkHeaderText('~settingsTab', lang.screens.settings.title, client);


}

async function checkText(accessibilityId, expectedText, client) {
    const element = await client.$(accessibilityId);
    const text = (await element.getText());

    if (text !== expectedText) {
        throw new Error('${accessibilityId} text is not correct');
    }
}

async function checkHeaderText(accessibilityId, expectedText, client) {
    const element = await client.$(accessibilityId);
    var text = (await element.getText());
    // console.log('\n \n' + text + '\n \n');
    text = (text.split(','))[0];

    if (text !== expectedText) {
        throw new Error(accessibilityId + ' text is not expected');
    }
}

async function openSettingsScreen(client) {
    const settingsButton = await client.$('~settingsTab');
    await settingsButton.click();
}

async function resetApp(client) {
    // Reset app by relaunching it
    await client.execute('mobile: terminateApp', { bundleId: 'com.netradyne.BLEAppVedant' });
    await client.execute('mobile: launchApp', { bundleId: 'com.netradyne.BLEAppVedant' });
}


// async function shouldHaveWeatherDetails(client) {
//     const timeout = 10_000; 

//     return new Promise(async (resolve, reject) => {
//         const startTime = Date.now();
//         while (Date.now() - startTime < timeout) {
//             const titleElement = await client.$('~weatherDetails');
//             if (await titleElement.isDisplayed()) {
//                 resolve(); // Resolve the promise if weather details are visible
//                 return;
//             }
//             // Wait for a short interval before checking again
//             await new Promise(resolve => setTimeout(resolve, 1000));
//         }
//         reject(new Error('Weather details not visible after 3 seconds')); // Reject if weather details are not visible after the timeout
//     });
// }
