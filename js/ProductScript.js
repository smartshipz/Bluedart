document.getElementById("sel").addEventListener("change", updateVAS);

function updateVAS() {
    const prod123 = document.getElementById("sel").value;
    const addon = document.getElementById("vas");
    
    // Clear existing options
    addon.innerHTML = ""; 

    let options = [];

    // Define options based on selection
    if (prod123 === "AirEtailPrepaid" || prod123==="AirEtailCod" || prod123==="DomesticPriority" ) {
        options = [
            { val: "Nil", text: "Nil" },
            { val: "TDD-10:30", text: "TDD-10:30" },
            { val: "TDD-12:00", text: "TDD-12:00" },
            { val: "Critical", text: "CriticalExpress" }
        ];
    } else if (prod123 === "Apex" || prod123==="Surface") {
        options = [
            { val: "Nil", text: "Nil" },
            { val: "FOD", text: "FOD" },
            { val: "DOD", text: "DOD" },
            { val: "DODFOD", text: "DODFOD" }
        ];
    } else {
        // Default option for other modes (Surface, etc.)
        options = [{ val: "Nil", text: "Nil" }];
    }

    // Add the options to the dropdown
    options.forEach(optData => {
        let opt = document.createElement("option");
        opt.value = optData.val;
        opt.textContent = optData.text;
        addon.appendChild(opt);
    });
}

// Run once on page load to set initial state
updateVAS();


    function add() {
      const pinCode = document.getElementById("pin").value.trim();
      const prod=document.getElementById("sel").value
      const container = document.getElementById("tableContainer");
      container.innerHTML = ""; // Clear previous result

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

const prodvas = document.getElementById("vas").value;
const prodvasMap = {
  'TDD-10:30': { packtype: 'T' },
  'TDD-12:00': { packtype: 'N' },
  'CriticalExpress': { packtype: 'C' },
  'FOD':  { subprod: 'A' },
  'DOD':  { subprod: 'D' },
  'DODFOD': { subprod: 'B' },
};

// 2. Get the new values into a temporary object
const vasUpdate = prodvasMap[prodvas] || {};

// 3. Manually update the existing variables if a new value exists
if (vasUpdate.packtype) {
    packtype = vasUpdate.packtype;
}
if (vasUpdate.subprod) {
    subprod = vasUpdate.subprod;
}


      if (!pinCode) {
        container.innerHTML = `<div class="no-data">Please enter a valid pincode.</div>`;
      //  return;
      }

      const myHeaders = new Headers();
      myHeaders.append("content-type", "application/json");
      myHeaders.append("JWTToken", localStorage.getItem("key")); // Ensure token is valid

      const raw = JSON.stringify({
      "ProductCode": prodcode,
  "PackType": packtype,
  "pinCode": pinCode,
  "profile": {
    "LoginID": "MAA48385",
    "Api_type": "T",
    "LicenceKey": "qgl8rfhkqrrnqun9ugienrgrljuktfqn"
  },
  "SubProductCode": subprod,
  "Feature": ""

      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };



fetch("https://apigateway.bluedart.com/in/transportation/finder/v1/GetServicesforPincodeAndProduct", requestOptions)
        .then(response => response.json())
        .then(jsonData => {
          const result = jsonData.GetServicesforPincodeAndProductResult;


          if (!result || Object.keys(result).length === 0) {
            container.innerHTML = `<div class="no-data">No data found for the entered pincode.</div>`;
            return;
          }

          // Service-related keys prioritized
          const priorityKeys = [
            "PinCode",
            "PinDescription",
            "PincodeAreaCode",
            "PincodeServiceCenterCode",
            "ServiceName",
            "DeliveryService",
            "PickupService",
            "DeliveryAreaCode",
            "DeliveryServiceCenterCode",
 	    "PickupAreaCode",
	    "PickupServiceCenterCode",
"Product",
"SubProduct",
"PackType",
"Feature",
 	    "ErrorMessage"
          ];

          const orderedKeys = [...priorityKeys, ...Object.keys(result).filter(k => !priorityKeys.includes(k))];

          const table = document.createElement("table");
          const headerRow = table.insertRow();
          headerRow.innerHTML = "<th>Field</th><th>Value</th>";

          orderedKeys.forEach(key => {
            if (key in result) {
              const row = table.insertRow();
              const cell1 = row.insertCell(0);
              const cell2 = row.insertCell(1);
              cell1.innerHTML = `<strong>${key}</strong>`;
              cell2.textContent = result[key];
            }
          });

          container.appendChild(table);
        })
        .catch(error => {
          console.error("Error:", error);
          container.innerHTML = `<div class="no-data">Error fetching data. Please try again.</div>`;
        });
    }