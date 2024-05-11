// Model A
const stock = {
    "moore": {
        "scott pharma": {
            "regular chow": 5,
            "breeder chow": 5,
            "rat chow": 25,
            "bedding": 25,
            "nestlets": 2,
            "crinkle paper": 5,
            "corn cob bedding": 2
        },

        "ppe" : {
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
};


function createOrder(facility, orderType) {
    const idealStock = JSON.parse(JSON.stringify(stock[facility][orderType])); // 1. Deep Copy the Relevant Stock Data
    const currentInventory = fetchCurrentInventory(facility, orderType); // 2. Retrieve Current Inventory Levels FINISH FUNCTION

    // 3. Calculate Order Quantities
    const orderQuantities = {};
    for (const item in idealStock) {
      orderQuantities[item] = Math.max(0, idealStock[item] - currentInventory[item]);
    }
  
    return orderQuantities;
  }

function fetch_current_inventory(inventory) {

  }