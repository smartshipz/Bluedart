



window.onload = function() {
let storedData = localStorage.getItem("ckey");
    if (!storedData) {
        alert("Account Configuration is Empty");
        return;
    }

    let data = JSON.parse(storedData);
document.getElementById("fromPincode").value=data.cpin ||"";
    
 
    const now = new Date();

    // 1. Get YYYY-MM-DD for the Date input
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    // 2. Get HH:MM for the Time input
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    // 3. Set the values in the form
    const dateInput = document.getElementById('pickupDate');
    const timeInput = document.getElementById('pickupTime');

    if (dateInput) {
        dateInput.value = today;
        dateInput.min = today; // Pro-tip: Prevents selecting past dates
    }
    
    if (timeInput) {
        timeInput.value = currentTime;
    }
};

document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const fromPin = document.getElementById("fromPincode").value;
    const toPin = document.getElementById("toPincode").value;

const pickupTm = document.getElementById("pickupTime").value;


var rawValue = document.getElementById("pickupDate").value; // e.g. "2026-03-07"
var timestamp = new Date(rawValue).getTime();

// Wrap it in the required string format
var formattedDate = "/Date(" + timestamp + ")/";


    if (fromPin.length !== 6 || toPin.length !== 6) {
        document.getElementById("responseText").innerText = "Invalid Pincode!";
        return;
    }





const prod = document.getElementById("dispatch").value;

const productMap = {
  'DomesticPriority':   { prodcode: 'D' },
  'Apex':               { prodcode: 'A' },
  'Surface':            { prodcode: 'E' },
  'AirEtailPrepaid':    { prodcode: 'A', subprod: 'P' },
  'AirEtailCod':        { prodcode: 'A', subprod: 'C' },
  'GroundEtailPrepaid': { prodcode: 'E', subprod: 'P' },
  'GroundEtailCod':     { prodcode: 'E', subprod: 'C' },
  'BharathDartPrepaid': { prodcode: 'A', subprod: 'P', packtype: 'L' },
  'BharathDartCod':     { prodcode: 'A', subprod: 'C', packtype: 'L' }
};

// Use 'let' instead of 'const' so we can update these later
let { prodcode = "", subprod = "", packtype = "" } = productMap[prod] || {};






const myHeaders = new Headers();
myHeaders.append("content-type", "application/json");
myHeaders.append("JWTToken", localStorage.getItem("key"));

const raw = JSON.stringify({
  "pPinCodeTo": toPin,
  "pPickupTime": pickupTm,
  "pPinCodeFrom": fromPin,
  
  "pProductCode": prodcode,
  "pPudate": formattedDate,
  "pSubProductCode": subprod,


"profile": {
    "LoginID": "MAA48385",
    "Api_type": "T",
    "LicenceKey": "qgl8rfhkqrrnqun9ugienrgrljuktfqn"
  }

});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://apigateway.bluedart.com/in/transportation/transit/v1/GetDomesticTransitTimeForPinCodeandProduct", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    const data = typeof result === "string" ? JSON.parse(result) : result;
    const res = data.GetDomesticTransitTimeForPinCodeandProductResult;

    if (res && !res.IsError) {
        // Create the table HTML string
        let tableHTML = `
            <table id="resultTable">
                <thead>
                    <tr>
                        <th colspan="2">Transit Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><strong>Origin</strong></td><td>${res.CityDesc_Origin}</td>                
			<td><strong>Destination</strong></td><td>${res.CityDesc_Destination}</td>
			<td><strong>EDL Flag</strong></td><td>${res.EDLMessage}</td>
		    </tr>
                    <tr><td><strong>Delivery Date</strong></td><td style="color:#27ae60; font-weight:bold;">${res.ExpectedDateDelivery}</td>
                 <td><strong>Service Center</strong></td><td>${res.ServiceCenter}</td>
                    <td><strong>Status</strong></td><td><span style="color:green;">✔ Available</span> ${res.ErrorMessage}</td></tr>
                </tbody>
            </table>
        `
        
        document.getElementById("tableContainer").innerHTML = tableHTML;
    } else {
        document.getElementById("tableContainer").innerHTML = `<p style="color:red;">Error: ${res.ErrorMessage || 'Invalid Response'}</p>`;
    }
})
  .catch((error) => console.error(error));
   document.getElementById("tableContainer").innerText = "Invalid Pincode !!...";

   
});