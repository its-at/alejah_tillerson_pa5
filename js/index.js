// Use a const variable to store the car images
const carImages = {
  Toyota: "/assets/Imgs/2023 toyota camry  SE.png",
  Honda: "assets/Imgs/2016 Honda Civic EXL.jfif",
  Chevrolet: "assets/Imgs/2023 Chevrolet Camaro LT Coupe.jfif",
  Nissan: "assets/Imgs/2013 Nissan Maxima S.jfif",
  Ford: "assets/Imgs/2019 Ford Edge SEL.jfif",
  Lexus:"assets/Imgs/2010 Lexus GX 460.jfif",
  Volkswagen:"assets/Imgs/2012 Volkswagen Beetle.jfif",
  Tesla:"assets/Imgs/2013 Tesla Model S.jfif",
  Dodge: "assets/Imgs/2017 Dodge Durango SXT.jfif",
  Cadillac: "assets/Imgs/2018 Cadillac ATS Luxury.jfif",
  Jaguar: "assets/Imgs/2018 Jaguar F-Pace S.jfif",
  Mazda: "assets/Imgs/2018 Mazda CX-5 Sport.jfif",
  Hyundai: "assets/Imgs/2020 hyundai sonata.jpg",
  Kia: "assets/Imgs/2020 Kia Forte FE.jfif",
  Porsche: "assets/Imgs/2021 Porsche 911 Carrera 4S.jfif",
  Subaru: "assets/Imgs/2021 Subaru WRX STI.jfif",
  BMW: "assets/Imgs/2016 BMW 5 Series 550i.jfif",

};

// Gets the filters that the user chose, and stores them in an array.
function getSelectedValues(inputType, inputName) {
  const inputs = document.querySelectorAll(
    inputType + '[name="' + inputName + '"]'
  );
  const selectedValues = [];

  inputs.forEach(function (input) {
    if (input.checked) {
      selectedValues.push(input.value);
    }
  });

  return selectedValues;
}

// When the user changes a filter, apply the filters to the car list
function applyFilters() {
  const minYear = document.getElementById("minYear").value;
  const maxYear = document.getElementById("maxYear").value;
  const makes = getSelectedValues('input[type="checkbox"]', "make");
  const maxMileage = getSelectedValues('input[type="radio"]', "mileage");
  const price = document.querySelector("#priceFilter select").value;
  const colors = getSelectedValues('input[type="checkbox"]', "color");

  // Checks to see if cars meet the filter criteria
  const filteredCars = usedCars.filter(function (car) {
    return (
      (!minYear || car.year >= minYear) &&
      (!maxYear || car.year <= maxYear) &&
      (!makes.length || makes.includes(car.make)) &&
      (!maxMileage.length || car.mileage <= maxMileage[0]) &&
      (!price || car.price <= price) &&
      (!colors.length || colors.includes(car.color))
    );
  });

  // Dynamically create the HTML for the car list
  const carList = document.getElementById("carList");
  carList.innerHTML = "";
  filteredCars.forEach(function (car) {
    const carHTML = `
        <div class="car">
            <img src="${carImages[car.make]}" alt="${car.make}">
            <p>${car.year} ${car.make}, ${car.mileage} miles, $${car.price}, ${
      car.color
    }</p>
        </div>
    `;
    carList.innerHTML += carHTML;
  });
}

// When the reset button is clicked, clear all the filters
document.getElementById("resetButton").addEventListener("click", function () {
  // Select all input and select elements
  const inputs = document.querySelectorAll("input, select");

  inputs.forEach(function (input) {
    if (input.type === "text" || input.type === "select-one") {
      input.value = "";
    } else if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    }
  });
});

window.onload = function () {
  applyFilters();
};
