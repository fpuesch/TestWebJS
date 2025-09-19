
function renderDishesTemplate(dishName, dishPrice, dishDescription, i) {
   return `
    <div onclick= "addDish(${i}, event)" class= "dish_container">
    <div class= "dish_info" >
    <h3> ${dishName} </h3>
    <p> ${dishDescription} </p>
    <p class="price"> ${dishPrice} € </p>
    </div>
    <img tabindex="0" aria-label="Das Gericht zum Warenkorb hinzufügen" role="button" id="button" onclick= "addDish(${i}, event)" class="add" src="./assets/icons/plus.png">
    </div>
    `
}

function renderBasketTemplate(dishName, i, amount, sum) {
   return `
    <div class= "piece">
    <h4> ${dishName} </h4>
    <div class="amount">
    <img tabindex="0" aria-label="Die Anzahl des Gerichts um eins reduzieren" role="button" id="button" onclick="removeDish(${i})" class="functions_cart" src="./assets/icons/minus.png">
    <p class="total"> ${amount}x</p>
    <img tabindex="0" aria-label="Die Anzahl des Gerichts um eins erhöhen" role="button" id="button" onclick="addDish(${i}, event)" class="functions_cart" src="./assets/icons/plus.png">
    <p class="total"> ${sum} €</p>
    <img tabindex="0" aria-label="Dieses Gericht aus dem Warenkorb entfernen" role="button" id="button" onclick="clearBasket(${i})" class="functions_cart" src="./assets/icons/mulleimer.png">
    </div>
    </div>
    `
}

function renderPriceTemplate(price, totalAmount) {
   return `
   <div class="costs">
    <div class="row"> <p> Zwischensumme</p> <span>${price}€</span> </div>
    <div class="row"> <p> Lieferkosten </p> <span> 5€ </span> </div>
    <div class="row"> <p> <strong> Gesamt </strong></p> <span><strong> ${totalAmount}€</strong></span> </div>
    </div>
    <button tabindex="0" aria-label="Die Bestellung abschließen" class="button_order" onclick="openMessage()"> Bestellen </button>
    `
}


