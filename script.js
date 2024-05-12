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


const promptText = document.getElementById('prompt-text');
const mooreBtn = document.getElementById('moore-btn');
let numInput = '<input id="number" type="number" placeholder=" # of items" autocomplete="off">';

mooreBtn.addEventListener('click', () => {
    getOrder();
});


