let cookies = 0;
let bonusAwarded = false; // Flag to check if the bonus has been awarded
let clickValue = 1;
let upgradePrice = 200;

let items = [
    { name: 'grandma', price: 100, count: 0, increment: 1 },
    { name: 'factory', price: 500, count: 0, increment: 5 },
    { name: 'mine', price: 1000, count: 0, increment: 10 },
    { name: 'bank', price: 2000, count: 0, increment: 10 },
    { name: 'temple', price: 5000, count: 0, increment: 50 },
    { name: 'wizardTower', price: 10000, count: 0, increment: 100 },
    { name: 'shipment', price: 20000, count: 0, increment: 200 }
];

// Function to format numbers with suffixes
function formatNumber(number) {
    let suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
    let suffixNum = Math.floor(('' + number).length / 3);
    let shortValue = parseFloat((suffixNum !== 0 ? (number / Math.pow(1000, suffixNum)) : number).toPrecision(2));
    if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
}

function updateDisplay() {
    document.querySelector('.counter p').innerText = formatNumber(cookies);
    document.querySelector('.clickValue').innerText = formatNumber(clickValue);
    document.querySelector('.clickUpgrade').innerText = `Click Upgrade - Price: ${formatNumber(upgradePrice)}`;
    items.forEach(item => {
        document.querySelector(`.${item.name}Count`).innerText = item.count;
        document.querySelector(`.${item.name}`).innerText = `${item.name.charAt(0).toUpperCase() + item.name.slice(1)} - Price: ${formatNumber(item.price)}`;
    });
}

document.querySelector('.cookie img').addEventListener('click', function(event) {
    cookies += clickValue; // Increase cookies by the current click value
    updateDisplay();

    // Check if the user has reached 1000 cookies and the bonus has not been awarded yet
    if (cookies >= 1000 && !bonusAwarded) {
        cookies += 1000; // Add 1000 bonus cookies
        alert('Congratulations! You have received a bonus of 1000 cookies!');
        bonusAwarded = true; // Set the flag to true so the bonus is not awarded again
    }

    // Add the 'cookie-clicked' class to the cookie
    this.classList.add('cookie-clicked');
    
    // Remove the 'cookie-clicked' class after the animation has completed
    setTimeout(() => {
        this.classList.remove('cookie-clicked');
    }, 400); // 400ms is the duration of the animation

    // Create a new element for the floating number
    const floatNumber = document.createElement('span');
    floatNumber.classList.add('float-number');
    floatNumber.textContent = `+${clickValue}`; // Or whatever number of cookies are added per click

    // Position the floating number at the mouse's location
    floatNumber.style.left = `${event.clientX}px`;
    floatNumber.style.top = `${event.clientY}px`;

    // Add the floating number to the body
    document.body.appendChild(floatNumber);

    // Remove the floating number after the animation has completed
    setTimeout(() => {
        document.body.removeChild(floatNumber);
    }, 1000); // 1000ms is the duration of the animation
});

document.querySelector('.clickUpgrade').addEventListener('click', function() {
    if (cookies >= upgradePrice) {
        cookies -= upgradePrice;
        clickValue += 1.2; // Increase the click value by more than 1
        clickValue = Math.round(clickValue); // Round the click value to the nearest whole number
        upgradePrice = Math.round(upgradePrice * 1.2); // Increase price for next upgrade by a larger factor
        updateDisplay();
    }
});

document.querySelector('.cookie img').addEventListener('dragstart', function(event) {
    event.preventDefault(); // Prevent the default drag behavior
});

items.forEach(item => {
    document.querySelector(`.${item.name}`).addEventListener('click', function() {
        if (cookies >= item.price) {
            cookies -= item.price;
            item.count++; // Increment the item count
            item.price = Math.round(item.price * 1.15); // Increase price for next purchase
            updateDisplay();
            setInterval(function() {
                cookies += item.increment;
                updateDisplay();
            }, 1000);
        }
    });
});

document.querySelector('.debug').addEventListener('click', function() {
    cookies += 100000; // Add 1000 cookies
    updateDisplay();
});
