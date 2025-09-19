let sumOfEveryItem = [];

function init() {
    renderDishes() //Laden der Speisekarte
    renderBasketInit() //checken ob etwas im Local Storage ist; wenn nein continue
    renderPriceInit()
}

//Laden des Warenkorbs beim Neuladen
function renderBasketInit() {
    for (i = 0; i < myDishes.length; i++) {
        let dishNumber = "Dish" + i
        let amount = JSON.parse(localStorage.getItem(dishNumber))

        if (amount != null) {
            renderBasket()
        }
        else continue
    }
}

function renderBasket() {
    contentRef = document.getElementById("basket");
    contentRefRes = document.getElementById("basket_responsive");
    let dishName = myDishes[i].name
    let dishPrice = myDishes[i].price
    let sum = amount * dishPrice
    contentRef.innerHTML += renderBasketTemplate(dishName, i, amount, sum)
    contentRefRes.innerHTML += renderBasketTemplate(dishName, i, amount, sum)
    myDishes[i].amount = amount
    sumOfEveryItem.push(sum)
}

function renderPriceInit() {
    let price = calculatePrice()
    let totalAmount = price + 5
    if (totalAmount <= 5) {
        return
    }
    else {
        contentRef.innerHTML += renderPriceTemplate(price, totalAmount)
        contentRefRes.innerHTML += renderPriceTemplate(price, totalAmount)
    }
}

function calculatePrice() {
    let price = 0;
    for (let i = 0; i < sumOfEveryItem.length; i++) {
        let sum = Number(sumOfEveryItem[i])
        price += sum
    }
    return price
}

//Laden der Speisekarte
function renderDishes() {
    contentRef = document.getElementById("maindishes");
    for (i = 0; i < myDishes.length; i++) {
        let dishName = myDishes[i].name
        let dishPrice = myDishes[i].price
        let dishDescription = myDishes[i].description
        contentRef.innerHTML += renderDishesTemplate(dishName, dishPrice, dishDescription, i)
    }
}

//Gerichte hinzufügen bei der Speisekarte wie auch im Warenkorb
function addDish(i, event) {
    preventBubbling(event) 
    let amount = myDishes[i].amount
    amount++
    myDishes[i].amount = amount
    sumOfEveryItem.push(myDishes[i].price)
    putAmountToLocalStorage(i, amount)
    renderFullBasket()
    renderPriceInit()
}

function preventBubbling(event) {
   event.stopPropagation()
}

//Den kompletten Warenkorb laden
function renderFullBasket() {
    contentRef = document.getElementById("basket");
    contentRef.innerHTML = "";
    contentRefRes = document.getElementById("basket_responsive");
    contentRefRes.innerHTML = "";
    for (i = 0; i < myDishes.length; i++) {
        let amount = myDishes[i].amount
        if (amount > 0) {
        infoTemplate(amount)
        }
        else continue;
    }
}

function infoTemplate(amount) {
    let dishName = myDishes[i].name
    let dishPrice = myDishes[i].price
    let sum = amount * dishPrice
    contentRef.innerHTML += renderBasketTemplate(dishName, i, amount, sum)
    contentRefRes.innerHTML += renderBasketTemplate(dishName, i, amount, sum)
}

//Amount im Local Storage speichern für das Neuladen
function putAmountToLocalStorage(i, amount) {
    let dishNumber = "Dish" + i
    localStorage.setItem(dishNumber, JSON.stringify(amount))
}

//Amount im Local Storage entfernen
function removeAmmountFromLocalStorage(i) {
    let dishNumber = "Dish" + i
    localStorage.removeItem(dishNumber);
}

//Gerichte aus dem Warenkorb entfernen
function removeDish(i) {
    contentRef = document.getElementById("basket");
    let a = myDishes[i].amount - 1
    let amount = a
    myDishes[i].amount = amount
    sumOfEveryItem.push(-(myDishes[i].price))

    if (amount > 0) {
        putAmountToLocalStorage(i, amount)
    }
    else { removeAmmountFromLocalStorage(i) }
    renderFullBasket()
    renderPriceInit()
}

//Das Gericht aus dem Warenkorb komplett entfernen; Amount wird auf null gesetzt
function clearBasket(i) {
    substractPrice(i)
    myDishes[i].amount = 0
    removeAmmountFromLocalStorage(i)
    renderFullBasket()
    renderPriceInit()
}

//Preis aus sumOfEveryItem entfernen
function substractPrice(i) {
    let dishPrice = myDishes[i].price
    let sum = myDishes[i].amount * dishPrice
    sumOfEveryItem.push(-(sum))
}

//Responsive Warenkorb anzeigen
function openCloseShoppingCart() {
    document.getElementById("basket_responsive").classList.toggle("resp_basket_closed")
    document.getElementById("basket_responsive").classList.toggle("noscroll")
    document.getElementById("back").classList.toggle("d_none")
    document.getElementById("cart").classList.toggle("d_none")
}

function openMessage() {
    document.getElementById("overlay_order").classList.remove("d_none")
    document.getElementById("body").classList.add("noscroll");
}

function closeOverlay() {
    document.getElementById("overlay_order").classList.add("d_none")
    document.getElementById("body").classList.remove("noscroll");
}
