const flights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

let userName;

do {
  userName = prompt('Please enter your username:', 'username');
  if (userName == 'username') {
    alert('Please enter a valid username');
  }
} while (userName == 'username');

alert(`Wellcome ${userName}`);


logObject(flights);

//Average price
let costSum = 0;
for (let i = 0; i < flights.length; i++) {
  costSum = costSum + flights[i].cost;
}
let averagePrice = costSum / flights.length;
console.log(`Flights average price: ${averagePrice}.`);

let scaleCounter = 0;
for (let i = 0; i < flights.length; i++) {
  if (flights[i].scale) {
    scaleCounter++;
  }
}
console.log(`Total flights with scales: ${scaleCounter}.`);

console.log('Last five flights of the day:')
for (let i = 05; i < flights.length; i++) {
  console.log(`From ${flights[i].from} to ${flights[i].to}`);
}

//PRO
let isAdmin;
confirm("Enter ADMIN settings?") == true ? isAdmin = true : isAdmin = false;
let adminOption;


function addFligth(flights) {
  let scaleBool;
  if (flights.length <= 15) {
    let flightId;
    let idAlreadyExists;

    do {
      flightId = prompt('Flight ID:');
      //idAlreadyExists = flights.some( (flights.id) => flights.id == flightId); /// APRENDER USO DE SOME CON OBJETO DE ARRAYS
      idAlreadyExists = false;
      for (let i = 0; i < flights.length; i++) {
        if (flightId == flights[i].id) {
          alert(`Flight with ID ${flightId} already exists. Type a different ID again.`);
          idAlreadyExists = true;
          break;
        }
      }
      if (flightId >= 15) {
        alert('Flight ID must be smaller than 15')
      }

    } while (flightId >= 15 || idAlreadyExists == true)

    let fromAirport = prompt('Departure Airport:');
    let toAirport = prompt('Destination Airport:');
    let flightPrice = prompt('Flight price:');
    let flightWithScale = prompt('Scales: y/n:');

    if (flightWithScale == 'y') {
      flightWithScale = flightWithScale.toLowerCase();
      scaleBool = true;
    } else {
      scaleBool = false;
    }


    let singleFlight = {
      id: flightId,
      to: toAirport,
      from: fromAirport,
      cost: flightPrice,
      scale: scaleBool,
    }
    flights.push(singleFlight);


  } else {
    alert('There are already 15 flights saved. You can only delete flights or exit.')
  }

}

function deleteFligth(flights) {
  let flightIdDelete = prompt('Type the Flight ID you want to delete:');
  flights.splice(flightIdDelete, 1);

}

function logObject(flights) {
  for (let i = 0; i < flights.length; i++) {
    let flightWithScale;
    flights[i].scale ? flightWithScale = 'it is a non-stop flight' : flightWithScale = 'it has scales';
    console.log(`The flight from ${flights[i].from} to ${flights[i].to} costs ${flights[i].cost} € and ${flightWithScale}`);
  }
}


if (isAdmin) {
  do {

    adminOption = prompt('Add or delete a flight (add/delete). Type Exit to close the program.', 'Exit');
    adminOption = adminOption.toLowerCase();
    switch (adminOption) {
      case 'add':
        addFligth(flights);
        console.log("Updated list of flights:");

        logObject(flights);
        break;
      case 'delete':
        deleteFligth(flights);
        console.log("Updated list of flights after deleting:");

        logObject(flights);
        break;
      case 'exit':
        //continue;
        break;
      default:
        alert('Enter a valid option.');
    }
  } while (adminOption != "exit")
} else {
  let maximunFlightPrice;
  do {
    maximunFlightPrice = Number(prompt('Set a maximun flight price:', 'price'));
    if (isNaN(maximunFlightPrice)) {
      alert('Please, enter a valid price:');
    }
  } while (isNaN(maximunFlightPrice))
  console.log(`Flights priced up to ${maximunFlightPrice} euros.`)
  for (let i = 0; i < flights.length; i++) {
    if (flights[i].cost <= maximunFlightPrice) {
      let flightWithScale;
      flights[i].scale ? flightWithScale = 'it is a non-stop flight' : flightWithScale = 'it has scales';

      console.log(`The flight from ${flights[i].from} to ${flights[i].to} costs ${flights[i].cost} € and ${flightWithScale}`);
    }
  }
}

