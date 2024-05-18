const stock = {
    "Moore": {
        "Scott Pharma": {
            "regular chow": 5,
            "breeder chow": 5,
            "rat chow": 25,
            "bedding": 25,
            "nestlets": 2,
            "crinkle paper": 5,
            "corn cob bedding": 2
        },

        "PPE" : {
            "yellow gowns": 2,
            "masks": 2,
            "cloth booties": 5,
            "plastic booties": 5,
            "XS gloves": 10,
            "SM gloves": 10,
            "MD gloves": 10,
            "LG gloves": 10,
            "XL gloves": 10,
            "2 Gal Sharps": 5,
            "Garbage bags": 2,
        }
    },
    "Vail": {
        "Accessories": {
            "Mouse huts": 5
        },
        "Snacks": {
            "Lil' debbies": 5,
            "Coffee": 10
        }
    }
};

const inputDiv = document.getElementById('input-wrapper');
const promptText = document.getElementById('prompt-text');
let numInput = '<input id="number" type="number" placeholder=" # of items" autocomplete="off">';

for (let facility in stock) { // List facility buttons
    let facilityBtn = document.createElement('button');
    facilityBtn.className = 'btn facility-btn';
    facilityBtn.id = `${facility.toLowerCase()}-btn`;
    facilityBtn.value = facility.toLowerCase;
    facilityBtn.textContent = facility;

    inputDiv.appendChild(facilityBtn); // render to page

    facilityBtn.addEventListener('click', () => getOrderType(facility)); 
}

function getOrderType(facility) {
    let orderTypes = stock[facility];
    promptText.textContent = 'Please choose order type:';

    for (let orderType in orderTypes) {
        let orderTypeBtn = document.createElement('button');
        orderTypeBtn.className = 'btn order-type-btn';
        orderTypeBtn.id = `${orderType.toLowerCase().replace(/ /g, '-')}-btn`;
        orderTypeBtn.value = orderType.toLowerCase();
        orderTypeBtn.textContent = orderType;

        orderTypeBtn.addEventListener('click', () => {
            let currentInv = JSON.parse(JSON.stringify(orderTypes[orderType])); // Make a deep copy of the order
            for (let item in currentInv) { // Set the items in the copy to 0.
                currentInv[item] = 0;
            }
            getOrderItems(currentInv, orderType, facility);
            currentInv = {}; // Reset currentInv after an order is placed
        });
        
        
        inputDiv.appendChild(orderTypeBtn);
    }

    let facilityButtons = document.querySelectorAll('.facility-btn'); // removes facility buttons
    facilityButtons.forEach((btn) => btn.remove());
}


function getOrderItems(currentInv, orderType, facility) {
     let orderTypeButtons = document.querySelectorAll('.order-type-btn'); // removes order type buttons
     orderTypeButtons.forEach((btn) => btn.remove());

    promptText.textContent = `You chose ${orderType}!`;
    console.log(currentInv);

    let items = Object.keys(currentInv);
    let index = 0;

    function promptForItem(items, index, facility, orderType) {
        if (index < items.length) {
            let item = items[index];
            let itemInput = document.createElement('input');
            itemInput.id = `${item.toLowerCase().replace(/ /g, '-')}`;
            itemInput.placeholder = ` No. of ${item}`;
            itemInput.type = 'number' // later TODO: add regex to check
            itemInput.autocomplete = 'off';
            promptText.textContent = `Boxes/bags of ${item} in inventory:`;

            let enterButton = document.createElement('button');
            enterButton.textContent = 'Enter';
            enterButton.className = 'btn';
            enterButton.addEventListener('click', () => {
                validateInput(itemInput.value); // VALIDATES USER INPUT
                currentInv[item] = parseInt(itemInput.value);
                itemInput.remove();
                enterButton.remove();

                if (index === items.length - 1) {
                    let amountToOrder = calculateOrder(currentInv, facility, orderType); // Calculates amount of items to order
                    amountToOrder = removeNegativeValues(amountToOrder); // Remove negative values from amountToOrder
                    finalizeOrder(amountToOrder);  // Send the email
                }

                promptForItem(items, index + 1, facility, orderType);
            });

            inputDiv.appendChild(itemInput);
            inputDiv.appendChild(enterButton);
        } else {
            // All items were processed, continue with rest of code
        }
    }

    promptForItem(items, index, facility, orderType);
}

function validateInput(value) { // input validation from user item inputs
    let parsedValue = parseInt(value);
    if (isNaN(parsedValue) || parsedValue < 0 || value.includes('e') || value.includes('E') || parsedValue > 99) {
        alert('Error: invalid number entered. Order canceled. Please make sure to enter positive, whole numbers and values less than 100');
        window.location.reload();
    }
}

function calculateOrder(currentInv, facility, orderType) { // subract from stock values

    console.log(currentInv); // log for debugging REMOVE LATER

    let amountToOrder = {};
    for (let item in currentInv) {
        if (stock[facility][orderType].hasOwnProperty(item)) {
            amountToOrder[item] = stock[facility][orderType][item] - currentInv[item];
        }
    }


    return amountToOrder
}

function removeNegativeValues(amountToOrder) { // remove items with negative values
    for (let item in amountToOrder) {
        if (amountToOrder[item] < 1) {
            delete amountToOrder[item];
        }
    }
    if (Object.keys(amountToOrder).length === 0) { // reset page if order object empty
        alert('Facility seems fully stocked form the values entered. Order Canceled.');
        window.location.reload();
    }
    console.log(amountToOrder); // log for debugging REMOVE LATER
    return amountToOrder;
}

function finalizeOrder(amountToOrder) { // send email
    // Order confirmation
    promptText.textContent = 'Here is the order to be placed. Confirm order?';
    let listOfItems = document.createElement('p');
    for (let item in amountToOrder) {

    }


    // Sends the email
    console.log('complete!');
}
