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
        "Oogitee Boogitee": {
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

    for (let orderType in orderTypes) {
        let orderTypeBtn = document.createElement('button');
        orderTypeBtn.className = 'btn order-type-btn';
        orderTypeBtn.id = `${orderType.toLowerCase().replace(/ /g, '-')}-btn`;
        orderTypeBtn.value = orderType.toLowerCase();
        orderTypeBtn.textContent = orderType;

        orderTypeBtn.addEventListener('click', () => {
            let currentInv = JSON.parse(JSON.stringify(orderTypes[orderType]));
            getOrderItems(currentInv, orderType);
            currentInv = {}; // Reset currentInv after an order is placed
        });
        
        
        inputDiv.appendChild(orderTypeBtn);
    }

    let facilityButtons = document.querySelectorAll('.facility-btn'); // removes facility buttons
    facilityButtons.forEach((btn) => btn.remove());
}


function getOrderItems(currentInv, orderType) {
    promptText.textContent = `You chose ${orderType}!`;
    console.log(`Order type: ${orderType}`);
    console.log(currentInv);
}