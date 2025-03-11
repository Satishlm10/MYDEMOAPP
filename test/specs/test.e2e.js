const { expect, browser, $ } = require('@wdio/globals')
const { clear } = require('appium-uiautomator2-driver/build/lib/commands/element')
const { back } = require('appium-uiautomator2-driver/build/lib/commands/navigation')

async function checkout(){
    const fullName = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/fullNameET"]')
    await fullName.setValue('John Doe')

    const addressLine = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/address1ET"]')
    await addressLine.setValue('Mercury')

    const city = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/cityET"]')
    await city.setValue('Venus')

    const zipCode = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/zipET"]')
    await zipCode.setValue("12345")

    const country = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/countryET"]')
    await country.setValue('Earth')

    const proceedBtn = await $('~Saves user info for checkout')
    await proceedBtn.click()

    const paymentFullName = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/nameET"]')
    await paymentFullName.setValue("John Doe")

    const cardNumber = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/cardNumberET"]')
    await cardNumber.setValue(1234123412341234)

    const expirationDate = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/expirationDateET"]')
    await expirationDate.setValue("0325")

    const securityCode = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/securityCodeET"]')
    await securityCode.setValue('123')

    const reviewOrderBtn = await $('~Saves payment info and launches screen to review checkout data')
    await reviewOrderBtn.click()

    const placeOrderBtn = await $('~Completes the process of checkout')
    await placeOrderBtn.click()

    await browser.pause(3000)

}

describe('Exploratory Testing MYDEMOAPP', () => {

    it('Swipe down and up Products', async () => {
      
       await browser.performActions([
        {
            type: "pointer",
            id: "finger1",
            parameters: { pointerType: "touch" },
            actions: [
                { type: "pointerMove", duration: 0, x: 360, y: 500 }, 
                { type: "pointerDown", button: 0 }, 
                { type: "pause", duration: 500 }, 
                { type: "pointerMove", duration: 3000, x: 360, y: -6000 }, 
                {type:"pointerMove", duration: 3000,x:360,y:6000},
                { type: "pointerUp", button: 0 } 
            ]
        }
    ])
        
       //  await browser.swipe(360,500,360,1500)
    })

    it('Sorting Products Test', async ()=>{
        await browser.pause(2000) //waiting for 2 seconds

        async function scrolling(direction){
            let scroll = direction
            await browser.performActions([
                {
                    type: "pointer",
                    id: "finger1",
                    parameters: { pointerType: "touch" },
                    actions: [
                        { type: "pointerMove", duration: 0, x: 360, y: 500 }, 
                        { type: "pointerDown", button: 0 }, 
                        { type: "pause", duration: 500 }, 
                        { type: "pointerMove", duration: 3000, x: 360, y: scroll }, 
                        { type: "pointerUp", button: 0 } 
                    ]
                }
            ])
        }
        
        const sortingIcon = await $("~Shows current sorting order and displays available sorting options")
         await sortingIcon.click()
        

        const priceDesc = await $("~Descending order by price")
        await priceDesc.click()
        await scrolling(-6000)

        await sortingIcon.click()

        const priceAsce = await $("~Ascending order by price")
        await priceAsce.click()
        await scrolling(6000)

        await sortingIcon.click()

        const nameDesc = await $("~Descending order by name")
        await nameDesc.click()
        await scrolling(-6000)

        await sortingIcon.click()

        const nameAesc = await $("~Ascending order by name")
        await nameAesc.click()
        await scrolling(6000)

        await browser.pause(2000)


    })

    it('adding items to card without login',async () => {
        await browser.pause(1000)

        const firstProduct = await $("(//android.widget.ImageView[@content-desc='Product Image'])[1]")
        await firstProduct.click()

        const addToCart = await $("~Tap to add product to cart")
        await addToCart.click()

        const cartIcon = await $("~Displays number of items in your cart")
        await cartIcon.click()

        await browser.pause(3000)
    })

    it('adding to cart and removing item from the cart',async ()=>{
        await browser.pause(1000)

        const firstProduct = await $("(//android.widget.ImageView[@content-desc='Product Image'])[1]")
        await firstProduct.click()

        const addToCart = await $("~Tap to add product to cart")
        await addToCart.click()

        const cartIcon = await $("~Displays number of items in your cart")
        await cartIcon.click()

        const removeItem = await $("~Removes product from cart")
        await removeItem.click()
        
        const backToProduct = await $("//android.widget.Button[@resource-id='com.saucelabs.mydemoapp.android:id/shoppingBt']")
        await backToProduct.click()

        await browser.pause(3000)
    })

    it('change color of the product', async () =>{
        await browser.pause(1000)

        const firstProduct = await $("(//android.widget.ImageView[@content-desc='Product Image'])[1]")
        await firstProduct.click()

        let color = await $("~Blue color")
        await color.click()

        color = await $("~Gray color").click()

        color = await $("~Green color").click()


        const addToCart = await $("~Tap to add product to cart")
        await addToCart.click()

        const cartIcon = await $("~Displays number of items in your cart")
        await cartIcon.click()

        await browser.pause(3000)

        
    })

    it('Login with valid username and password',async ()=>{
        await browser.pause(1000)

        const menu = await $("~View menu")
        await menu.click()

        const loginMenuItem = await $("~Login Menu Item")
        await loginMenuItem.click()

        const userNameField = await $("//android.widget.EditText[@resource-id='com.saucelabs.mydemoapp.android:id/nameET']")
        await userNameField.setValue("bod@example.com")

        const pwdField = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/passwordET"]')
        await pwdField.setValue(10203040)

        const loginBtn = await $("~Tap to login with given credentials")
        await loginBtn.click()

        await browser.pause(3000)

    })

    it('Login with FingerPrint', async ()=>{
        await browser.pause(1000)

        const menu = await $("~View menu")
        await menu.click()

        const firgerPrintMenu = await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="FingerPrint"]')
        await firgerPrintMenu.click()

        const figerPrintEnableDisable = await $('~Enable or disable biometric login')
        await figerPrintEnableDisable.click()

        await menu.click()

        const loginMenuItem = await $("~Login Menu Item")
        await loginMenuItem.click()

        const biometricLogin = await $('~Tap to login using biometric verification')
        await biometricLogin.click()

        await browser.pause(5000)
    })

    it('Proceed to checkout without login',async ()=>{
        await browser.pause(1000)

        const firstProduct = await $("(//android.widget.ImageView[@content-desc='Product Image'])[1]")
        await firstProduct.click()

        const addToCart = await $("~Tap to add product to cart")
        await addToCart.click()

        const cartIcon = await $("~Displays number of items in your cart")
        await cartIcon.click()

        const checkoutBtn = await $("~Confirms products for checkout")
        await checkoutBtn.click()

        const userNameField = await $("//android.widget.EditText[@resource-id='com.saucelabs.mydemoapp.android:id/nameET']")
        await userNameField.setValue("bod@example.com")

        const pwdField = await $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/passwordET"]')
        await pwdField.setValue(10203040)

        const loginBtn = await $("~Tap to login with given credentials")
        await loginBtn.click()

        await checkout()

    })

    it('Draw and clear',async ()=>{
        const menu = await $("~View menu")
        await menu.click()

        const drawingMenuItem = await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="Drawing"]')
        await drawingMenuItem.click()

        await browser.performActions([
            {
                type: "pointer",
                id: "finger1",
                parameters: { pointerType: "touch" },
                actions: [
                    { type: "pointerMove", duration: 0, x: 30, y: 1400 }, 
                    { type: "pointerDown", button: 0 }, 
                    { type: "pause", duration: 500 }, 
                    { type: "pointerMove", duration: 3000, x: 1700, y: -1400 }, 
                    { type: "pointerUp", button: 0 } 
                ]
            }
        ])

        const clearBtn = await $('~Removes anything drawn on pad')
        await clearBtn.click()


        await browser.pause(2000)
    })

    
})
