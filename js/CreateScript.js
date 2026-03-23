window.onload = function() {
 document.getElementById('pd').valueAsDate = new Date();
    displayConfig();
}

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



//Enter key function
document.addEventListener('keydown', function(e) {
  // Check if the pressed key is 'Enter'
  if (e.key === 'Enter') {
    const activeElement = document.activeElement;

    // Only apply this to input fields (not textareas, where Enter should create a new line)
    if (activeElement.tagName === 'INPUT') {
      e.preventDefault(); // Stop the form from submitting

      // Find all focusable inputs in the document
      const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([disabled])'));
      const currentIndex = inputs.indexOf(activeElement);

      // If there is a next field, move focus to it
      if (currentIndex > -1 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      }else {
  activeElement.form.submit(); // Submit only on the very last field
}
    }
  }
});

//Enter key function end


function displayConfig() {
    let storedData = localStorage.getItem("ckey");
    if (!storedData) {
        alert("Account Configuration is Empty");
        return;
    }

    let data = JSON.parse(storedData);
  	const AutoRef = data.refauto || "";
if (AutoRef === "yesAuto") {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    document.getElementById("refno").value = `sShipz-${randomNumber}`;
}

    let isChecked = document.getElementById("cbox").checked;
    if (isChecked) {
        // Only fill Area and Code if checked
        document.getElementById("area").value = data.area || "";
        document.getElementById("code").value = data.code || "";
	document.getElementById("search").value= ""
	document.getElementById("sname").value= ""
	document.getElementById("sattn").value =""
        document.getElementById("sadd1").value =""
        document.getElementById("sadd2").value =""
        document.getElementById("sadd3").value =""
        document.getElementById("spin").value  =""
        document.getElementById("stel").value  =""

        Topay=true;        
        // Optional: Clear the other fields if they should be empty when checked
        clearOtherFields(); 
    } else {
        // Fill everything if NOT checked
        document.getElementById("area").value = data.area || "";
        document.getElementById("code").value = data.code || "";
	document.getElementById("search").value= "";
        document.getElementById("sname").value = data.cname || "";
        document.getElementById("sattn").value = data.cname || "";
        document.getElementById("sadd1").value = data.cadr1 || "";
        document.getElementById("sadd2").value = data.cadr2 || "";
        document.getElementById("sadd3").value = data.cadr3 || "";
        document.getElementById("spin").value = data.cpin || "";
        document.getElementById("stel").value = data.phone || "";
        Topay=false;
    }
}
    function pcs1() {
      let pcs = document.getElementById("pcs").value;
      var container = document.getElementById("res");
      container.innerHTML = ""; // reset before adding

      for (let i = 0; i < pcs; i++) {
        let l = document.createElement("input");
        l.id = "l" + i;
        l.type = "text";
        l.placeholder = "L";

        let b = document.createElement("input");
        b.id = "b" + i;
        b.type = "text";
        b.placeholder = "B";

        let h = document.createElement("input");
        h.id = "h" + i;
        h.type = "text";
        h.placeholder = "H";

        let c = document.createElement("input");
        c.id = "c" + i;
        c.type = "number";
        c.placeholder = "Count";

        container.appendChild(l);
        container.appendChild(b);
        container.appendChild(h);
        container.appendChild(c);
        container.appendChild(document.createElement("br"));
      }

    }

    function chkval() {
      let pcs = parseInt(document.getElementById("pcs").value);
      let arr = [];
      for (let i = 0; i < pcs; i++) {
        let cnt1 = parseInt(document.getElementById("c" + i).value) || 0;
        if (cnt1 > 0) {
          let len = document.getElementById("l" + i).value;
          let bre = document.getElementById("b" + i).value;
          let hei = document.getElementById("h" + i).value;
          arr.push({ length: len, breadth: bre, height: hei, count: cnt1 });
        }
      }
      //console.log("Final Array:", arr);
      //alert("Saved Successfully! Check console for details.");
    }

function gen()
{

var rescont = document.getElementById("apiResponse");
let hmsg = document.createElement("h3");

// Use .textContent for <h3> tags
hmsg.textContent = "Loading Response, Please Wait...";
hmsg.id="responseH3"

rescont.appendChild(hmsg);

   var orgarea = document.getElementById("area").value
   var custcode= document.getElementById("code").value
   var custname= document.getElementById("sname").value
   var csender = document.getElementById("sattn").value
   var saddress1=document.getElementById("sadd1").value
   var saddress2=document.getElementById("sadd2").value
   var saddress3=document.getElementById("sadd3").value
   var spincode= document.getElementById("spin").value
   var sphone = document.getElementById("stel").value
   var consigneename= document.getElementById("cname").value
   var consigneeattn= document.getElementById("cattn").value
   var consigneeadr1=document.getElementById("cadd1").value
   var consigneeadr2=document.getElementById("cadd2").value
   var consigneeadr3=document.getElementById("cadd3").value
   var consigneepin= document.getElementById("cpin").value
   var consigneephone = document.getElementById("ctel").value
   var Referenceno = document.getElementById("refno").value
   var pieces =document.getElementById("pcs").value
   var weight = parseFloat(document.getElementById("wgt").value);
   var DeclaredValue =parseFloat(document.getElementById("dvalue").value);
   var CollectableAmount =parseFloat(document.getElementById("colamt").value);
  // var Pickupdate = document.getElementById("pd").value
   var pickuptime = document.getElementById("ptime").value
   var Waybill = document.getElementById("awbno").value
   var Commodity = document.getElementById("ccmdty").value 

const prod = document.getElementById("sel").value;

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


const labsize = document.getElementById("pdf").value;
if(labsize=='a4s')
{labs=0}
if(labsize=='a43')
{labs=1}
if(labsize=='lab89')
{labs=3}
if(labsize=='lap53')
{labs=2}
if (labsize === 'nopdf') {
    poutput = true;
    labs=0;
} else {
    poutput = false;
    labs=0;
}



var rawValue = document.getElementById("pd").value; // e.g. "2026-03-07"
var timestamp = new Date(rawValue).getTime();

// Wrap it in the required string format
var formattedDate = "/Date(" + timestamp + ")/";



	


let dataArray = [];
    let pcs = document.getElementById("pcs").value;

    for (let i = 0; i < pcs; i++) {
        // Create an object for each row of inputs
        let row = {
            Length: parseFloat(document.getElementById("l" + i).value) || 0,
            Breadth: parseFloat(document.getElementById("b" + i).value) || 0,
            Height: parseFloat(document.getElementById("h" + i).value) || 0,
            Count: parseFloat(document.getElementById("c" + i).value) || 0
        };

        // Push the row object into your main array
        if (row.Count > 0) {
        dataArray.push(row);
    }

    }

//Dimension arrange created.

const pickupChoice = document.querySelector('input[name="pickup"]:checked').value;

if (pickupChoice === "yes") {
rpk=true;
} else {
rpk=false;
}

const DChoice = document.querySelector('input[name="ptype"]:checked').value;

if (DChoice === "dox") {
pty=1;
} else {
pty=2;
}

const RVChoice = document.querySelector('input[name="revpk"]:checked').value;

if (RVChoice === "yes") {
revrpk=true;
} else {
revrpk=false;
}



if (subprod !== 'C') {
  CollectableAmount = 0;
}


let storedData = localStorage.getItem("ckey");
    if (!storedData) {
        alert("Account Configuration is Empty");
        return;
    }

    let data = JSON.parse(storedData);
    var Usrlogin = data.loginid || "";
    var shiplis = data.skey || "";


const myHeaders = new Headers();
myHeaders.append("content-type", "application/json");
myHeaders.append("JWTToken", localStorage.getItem("key"));
//myHeaders.append("JWTToken","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0LXN1YmplY3QiLCJhdWQiOlsiYXVkaWVuY2UxIiwiYXVk//aWVuY2UyIl0sImlzcyI6InVybjovL2FwaWdlZS1lZGdlLUpXVC1wb2xpY3ktdGVzdCIsImV4cCI6MTc3Mjk1MDIwOCwiaWF0IjoxNzcyODYzODA4LCJqdGkiOiJjYzlkYW//YwNi1kMGU2LTQ0NGYtOTlmZC1hMTQ2ZDY2NWVmZmIifQ.nrqcSZ-C46_SP2XflcVwRbvoze_UrkPcpRzHHyXf_EM");

const raw = JSON.stringify({
  "Request": {
    "Consignee": {
      "AvailableDays": "",
      "AvailableTiming": "",
      "ConsigneeAddress1": consigneeadr1,
      "ConsigneeAddress2": consigneeadr2,
      "ConsigneeAddress3": consigneeadr3,
      "ConsigneeAddressType": "",
      "ConsigneeAddressinfo": "",
      "ConsigneeAttention": consigneeattn,
      "ConsigneeEmailID": "",
      "ConsigneeFullAddress": "",
      "ConsigneeGSTNumber": "",
      "ConsigneeLatitude": "",
      "ConsigneeLongitude": "",
      "ConsigneeMaskedContactNumber": "",
      "ConsigneeMobile": consigneephone,
      "ConsigneeName": consigneename,
      "ConsigneePincode": consigneepin,
      "ConsigneeTelephone": ""
    },
    "Returnadds": {
      "ManifestNumber": "",
      "ReturnAddress1": "",
      "ReturnAddress2": "",
      "ReturnAddress3": "",
      "ReturnAddressinfo": "",
      "ReturnContact": "",
      "ReturnEmailID": "",
      "ReturnLatitude": "",
      "ReturnLongitude": "",
      "ReturnMaskedContactNumber": "",
      "ReturnMobile": "",
      "ReturnPincode": "",
      "ReturnTelephone": ""
    },
    "Services": {
      "AWBNo": Waybill,
      "ActualWeight": weight,
      "CollectableAmount":CollectableAmount,
      "Commodity": {
        "CommodityDetail1": Commodity,
        "CommodityDetail2": "",
        "CommodityDetail3": ""
      },
      "CreditReferenceNo": Referenceno,
      "CreditReferenceNo2": "",
      "CreditReferenceNo3": "",
      "CurrencyCode": "",
      "DeclaredValue": DeclaredValue,
      "DeliveryTimeSlot": "",
      "Dimensions": dataArray,
      "FavouringName": "",
      "ForwardAWBNo": "",
      "ForwardLogisticCompName": "",
      "InsurancePaidBy": "",
      "InvoiceNo": "",
      "IsChequeDD": "",
      "IsDedicatedDeliveryNetwork": false,
      "IsForcePickup": false,
      "IsPartialPickup": false,
      "IsReversePickup": revrpk,
      "ItemCount": 1,
      "OTPBasedDelivery": "0",
      "OTPCode": "",
      "Officecutofftime": "",
      "PDFOutputNotRequired": poutput,
      "PackType": packtype,
      "ParcelShopCode": "",
      "PayableAt": "",
      "PickupDate": formattedDate,
      "PickupMode": "",
      "PickupTime": pickuptime,
      "PickupType": "",
      "PieceCount": pieces,
      "PreferredPickupTimeSlot": "",
      "ProductCode": prodcode,
      "ProductFeature": "",
      "ProductType": pty,
      "RegisterPickup": rpk,
      "SpecialInstruction": "SmartShip",
      "SubProductCode": subprod,
      "TotalCashPaytoCustomer": 0,
      "PrinterLableSize":labs,
      "itemdtl": [
        {
          "CGSTAmount": 0,
          "HSCode": "",
          "IGSTAmount": 0,
          "IGSTRate": 0,
          "Instruction": "",
         // "InvoiceDate": "",
          "InvoiceNumber": "",
          "ItemID": "",
          "ItemName": "",
          "ItemValue": 0,
          "Itemquantity": 1,
          "PlaceofSupply": "",
          "ProductDesc1": "",
          "ProductDesc2": "",
          "ReturnReason": "",
          "SGSTAmount": 0,
          "SKUNumber": "",
          "SellerGSTNNumber": "",
          "SellerName": "",
          "TaxableAmount": 0,
          "TotalValue": 0,
          "cessAmount": "0.0",
          "countryOfOrigin": "IN",
          "docType": "INV",
          "subSupplyType": 1,
          "supplyType": "0"
        }
      ],
      "noOfDCGiven": 0
    },
    "Shipper": {
      "CustomerAddress1": saddress1,
      "CustomerAddress2": saddress2,
      "CustomerAddress3": saddress3,
      "CustomerAddressinfo": "",
      "CustomerCode": custcode,
      "CustomerEmailID": "",
      "CustomerGSTNumber": "",
      "CustomerLatitude": "",
      "CustomerLongitude": "",
      "CustomerMaskedContactNumber": "",
      "CustomerMobile": sphone,
      "CustomerName": custname,
      "CustomerPincode": spincode,
      "CustomerTelephone": sphone,
      "IsToPayCustomer": Topay,
      "OriginArea": orgarea,
      "Sender": csender,
      "VendorCode": "125465"    }
  },
  "Profile": {
    "LoginID": Usrlogin,
    "LicenceKey": shiplis,
    "Api_type": "S"
  }
});


document.getElementById("responseText").textContent =""
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
fetch("https://apigateway.bluedart.com/in/transportation/waybill/v1/GenerateWayBill", requestOptions)
        .then((response) => response.json())
        .then((result) => {
        //document.getElementById("responseText").textContent = JSON.stringify(result, null, 2);
	const awbData = result?.GenerateWayBillResult?.AWBPrintContent;
        awbNo = result?.GenerateWayBillResult?.AWBNo || "WayBill";

        if (awbData && Array.isArray(awbData)) {
          // Convert byte array to PDF Blob
          const byteArray = new Uint8Array(awbData);
          const blob = new Blob([byteArray], { type: "application/pdf" });

          // Create Object URL
          pdfUrl = URL.createObjectURL(blob);

          // Show PDF in iframe
          const iframe = document.getElementById("pdfViewer");
          iframe.src = pdfUrl;
          iframe.style.display = "block";
          // check if PDF exists
document.getElementById("responseH3").textContent=""
      }else{
document.getElementById("responseH3").textContent =""
document.getElementById("responseText").textContent = JSON.stringify(result, null, 2);


}

        })

        .catch((error) => {
	//document.getElementById("responseText").textContent = JSON.stringify(result, null, 2);
        document.getElementById("responseText").textContent = "Error: " + error;
        });
    

}


function fetchData() {
            const code = document.getElementById('searchCode').value.trim();
            if (!code) return alert("Please enter a code");
            getConsignee(code);
        }

        // Helper function to safely decode Base64
        function decode(str) {
            try {
                return str ? atob(str) : "";
            } catch (e) {
                return str; // Return as-is if it's not encoded
            }
        }

        function getConsignee(code) {
            const request = indexedDB.open("LogisticsDB");

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction("consignees", "readonly");
                const store = transaction.objectStore("consignees");

                const getRequest = store.get(code);

                getRequest.onsuccess = () => {
    const result = getRequest.result;

    if (result) {
        // 1. Decode the data
        const name = decode(result.CONSIGNEE_NAME);
        const adr1 = decode(result.ADDRESS1);
        const adr2 = decode(result.ADDRESS2);
        const adr3 = decode(result.ADDRESS3);
        const pin  = decode(result.CPINCODE);
        const phone = decode(result.PHONE);

        // 2. Push to your HTML elements (Update these IDs to match your form)
        document.getElementById('cname').value = name;
        document.getElementById('cattn').value = name;
        document.getElementById('cadd1').value = adr1;
        document.getElementById('cadd2').value = adr2;
        document.getElementById('cadd3').value = adr3;
        document.getElementById('cpin').value = pin;
        document.getElementById('ctel').value = phone;

    } else {
        alert("No record found for this code.");
    }
};
            };
        }


function AddressData() {
            const code = document.getElementById('search').value.trim();
            if (!code) return alert("Please enter a code");
            getShipper(code);
        }

        // Helper function to safely decode Base64
        function decode(str) {
            try {
                return str ? atob(str) : "";
            } catch (e) {
                return str; // Return as-is if it's not encoded
            }
        }

        function getShipper(code) {
            const request = indexedDB.open("LogisticsDB");

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction("consignees", "readonly");
                const store = transaction.objectStore("consignees");

                const getRequest = store.get(code);

                getRequest.onsuccess = () => {
    const result = getRequest.result;

    if (result) {
        // 1. Decode the data
        const name = decode(result.CONSIGNEE_NAME);
        const adr1 = decode(result.ADDRESS1);
        const adr2 = decode(result.ADDRESS2);
        const adr3 = decode(result.ADDRESS3);
        const pin  = decode(result.CPINCODE);
        const phone = decode(result.PHONE);

        // 2. Push to your HTML elements (Update these IDs to match your form)
        document.getElementById('sname').value = name;
        document.getElementById('sattn').value = name;
        document.getElementById('sadd1').value = adr1;
        document.getElementById('sadd2').value = adr2;
        document.getElementById('sadd3').value = adr3;
        document.getElementById('spin').value = pin;
        document.getElementById('stel').value = phone;

    } else {
        alert("No record found for this code.");
    }
};
            };
        }

