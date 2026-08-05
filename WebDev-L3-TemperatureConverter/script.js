// ==============================
// Select Elements
// ==============================

const temperature = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

const resultValue = document.getElementById("resultValue");
const resultUnit = document.getElementById("resultUnit");

const celsiusValue = document.getElementById("celsiusValue");
const fahrenheitValue = document.getElementById("fahrenheitValue");
const kelvinValue = document.getElementById("kelvinValue");

// ==============================
// Convert Temperature
// ==============================

function convertTemperature() {

    let value = parseFloat(temperature.value);

    if (isNaN(value)) {
        alert("Please enter a valid temperature.");
        return;
    }

    let celsius;

    // Convert input to Celsius first

    switch (fromUnit.value) {

        case "Celsius":
            celsius = value;
            break;

        case "Fahrenheit":
            celsius = (value - 32) * 5 / 9;
            break;

        case "Kelvin":
            celsius = value - 273.15;
            break;

    }

    // Convert Celsius to selected unit

    let finalValue;

    switch (toUnit.value) {

        case "Celsius":
            finalValue = celsius;
            break;

        case "Fahrenheit":
            finalValue = (celsius * 9 / 5) + 32;
            break;

        case "Kelvin":
            finalValue = celsius + 273.15;
            break;

    }

    // Display Main Result

    resultValue.textContent = finalValue.toFixed(2);

    resultUnit.textContent = toUnit.value;

    // Display All Units

    celsiusValue.textContent = celsius.toFixed(2) + " °C";

    fahrenheitValue.textContent =
        ((celsius * 9 / 5) + 32).toFixed(2) + " °F";

    kelvinValue.textContent =
        (celsius + 273.15).toFixed(2) + " K";

}

// ==============================
// Swap Units
// ==============================

swapBtn.addEventListener("click", () => {

    let temp = fromUnit.value;

    fromUnit.value = toUnit.value;

    toUnit.value = temp;

    if (temperature.value !== "") {
        convertTemperature();
    }

});

// ==============================
// Convert Button
// ==============================

convertBtn.addEventListener("click", convertTemperature);

// ==============================
// Press Enter to Convert
// ==============================

temperature.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        convertTemperature();
    }

});

// ==============================
// Auto Convert on Unit Change
// ==============================

fromUnit.addEventListener("change", () => {

    if (temperature.value !== "") {
        convertTemperature();
    }

});

toUnit.addEventListener("change", () => {

    if (temperature.value !== "") {
        convertTemperature();
    }

});

// ==============================
// Auto Convert While Typing
// ==============================

temperature.addEventListener("input", () => {

    if (temperature.value !== "") {
        convertTemperature();
    } else {

        resultValue.textContent = "--";
        resultUnit.textContent = "Select units and convert";

        celsiusValue.textContent = "--";
        fahrenheitValue.textContent = "--";
        kelvinValue.textContent = "--";

    }

});