window.onload = function() {
 document.getElementById('pd').valueAsDate = new Date();
    displayConfig();
}


document.getElementById("supplyIgst").addEventListener("change", updateVAS);
document.getElementById("csb").addEventListener("change", updateCSB);

function updateVAS() {
    const igst = document.getElementById("supplyIgst").value;
    const addon = document.getElementById("igst");
    // Clear existing content
    addon.innerHTML = ""; 

    if (igst === "Yes") {
        // 1. Create the Label
        let lab = document.createElement("label"); // Fixed spelling 'label'
        lab.textContent = "IGST Paid: "; // Fixed 'textContent'
        
        // 2. Create the Input
        let opt = document.createElement("input");
        opt.type = "text"; // Specify type (text, checkbox, etc.)
        opt.value = "";
        opt.id = "igstInput"; // Good practice to give it an ID

        // 3. Append to the container
        addon.appendChild(lab);
        addon.appendChild(opt);
    }
}


function updateCSB() {
    const csb5 = document.getElementById("csb").value;
    const addon1 = document.getElementById("csbv");
const addon2 = document.getElementById("csbv1");
    
    // Clear existing content
    addon1.innerHTML = ""; 
addon2.innerHTML = ""; 

    if (csb5 === "1") {
    
        // 2. First Set: Authorized Dealer Code
        let lab1 = document.createElement("label");
        lab1.textContent = "Authorised Dealer Code (CSB-V): "; 
        let opt1 = document.createElement("input");
        opt1.type = "text"; 
        opt1.id = "itemId"; 

        // 3. Second Set: Export Import Code
        let lab2 = document.createElement("label"); 
        lab2.textContent = "Export Import Code (CSB-V): "; 
        let opt2 = document.createElement("input");
        opt2.type = "text"; 
        opt2.id = "exCode"; 

        // 4. Append everything
        addon1.appendChild(lab1);
        addon1.appendChild(opt1);
        
        // Fixed: changed 'appenchild' to 'appendChild' and 'ops2' to 'opt2'
        addon2.appendChild(lab2);
        addon2.appendChild(opt2); 
        
        
    }
}


// Run once on page load
updateVAS();
updateCSB();



//Enter key function
document.addEventListener('keydown', function(e) {
  const activeElement = document.activeElement;

  // Only apply to Input and Select (skipping Textareas)
  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT') {
    
    // Get list of focusable fields
    const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([disabled]), select, button'));
    const currentIndex = inputs.indexOf(activeElement);

    // HANDLE ENTER (MOVE FORWARD)
    if (e.key === 'Enter') {
      e.preventDefault(); 
      if (currentIndex > -1 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      } else {
        activeElement.form?.submit(); // Submit if on the last field
      }
    }

    // HANDLE UP ARROW (MOVE BACKWARD)
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentIndex > 0) {
        inputs[currentIndex - 1].focus();
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
    // STATE 1: TOPAY (Checked, not Reverse)
    document.getElementById("area").value = data.area || "";
    document.getElementById("code").value = data.code || "";
    document.getElementById("search").value = "";
    document.getElementById("sname").value = "";
    document.getElementById("sattn").value = "";
    document.getElementById("sadd1").value = "";
    document.getElementById("sadd2").value = "";
    document.getElementById("sadd3").value = "";
    document.getElementById("spin").value = "";
    document.getElementById("stel").value = "";
    document.getElementById("sgst").value = "";
    Topay = true;
    revrpk = false;
    
} else{
    // STATE 2: NORMAL (Neither Checked nor Reverse)
    document.getElementById("area").value = data.area || "";
    document.getElementById("code").value = data.code || "";
    document.getElementById("search").value = "";
    document.getElementById("sname").value = data.cname || "";
    document.getElementById("sattn").value = data.cname || "";
    document.getElementById("sadd1").value = data.cadr1 || "";
    document.getElementById("sadd2").value = data.cadr2 || "";
    document.getElementById("sadd3").value = data.cadr3 || "";
    document.getElementById("spin").value = data.cpin || "";
    document.getElementById("stel").value = data.phone || "";
    document.getElementById("sgst").value = data.gstno || "";
    Topay = false;
    revrpk = false;
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
document.getElementById("apiResponse").innerHTML ="";
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
   var shipgst = document.getElementById("sgst").value

   var consigneename= document.getElementById("cname").value
   var consigneeattn= document.getElementById("cattn").value
   var consigneeadr1=document.getElementById("cadd1").value
   var consigneeadr3=document.getElementById("city").value
   var country=document.getElementById("country-select").value
   var consigneepin= document.getElementById("cpin").value
   var consigneephone = document.getElementById("ctel").value
   var Referenceno = document.getElementById("refno").value
   var pieces =document.getElementById("pcs").value || 1;
   var weight = parseFloat(document.getElementById("wgt").value) || 0.5;
   var DeclaredValue =parseFloat(document.getElementById("dvalue").value) || 0;
   //var CollectableAmount =parseFloat(document.getElementById("colamt").value);
  // var Pickupdate = document.getElementById("pd").value
   var pickuptime = document.getElementById("ptime").value || '1100'
   var Waybill = document.getElementById("awbno").value
   var Commodity = document.getElementById("ccmdty").value 

const itemElement = document.getElementById("itemId");

var itemId = (itemElement) ? itemElement.value : "";

   var itemName = document.getElementById("itemName").value 
   var hsCode = document.getElementById("hsCode").value 
   var cmdtyCode = document.getElementById("cmdtyCode").value 
   const packtype = document.getElementById("sel").value;
   const csbValue=document.getElementById("csb").value
  const supplyIgst=document.getElementById("supplyIgst").value
  const incoterm=document.getElementById("incoterm").value

const exCodeElement = document.getElementById("exCode");

var exCode = (exCodeElement) ? exCodeElement.value : "";


const igstInputEle = document.getElementById("igstInput");

var igstInput = (igstInputEle) ? igstInputEle.value : 0;

  const currency=document.getElementById("currency").value || "INR";



  const exportReason=document.getElementById("exportReason").value

 
 let supplywoIgst;

if (supplyIgst === "NA") {
    supplywoIgst = "NA";
} else if (supplyIgst === "Yes") {
    supplywoIgst = "No";
} else {
    supplywoIgst = "Yes";
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
pty=0;
} else {
pty=1;
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
            "ConsigneeAddress2": "",
            "ConsigneeAddress3": "",
            "ConsigneeAddressType": "",
            "ConsigneeAddressinfo": "",
            "ConsigneeAttention": consigneeattn,
            "ConsigneeBusinessPartyTypeCode": "",
            "ConsigneeCityName": consigneeadr3,
            "ConsigneeCountryCode": country,
            "ConsigneeEmailID": "abc@gmail.com",
            "ConsigneeFiscalID": "",
            "ConsigneeFiscalIDType": "",
            "ConsigneeFullAddress": consigneeadr1,
            "ConsigneeGSTNumber": "",
            "ConsigneeID": "",
            "ConsigneeIDType": "",
            "ConsigneeLatitude": "",
            "ConsigneeLongitude": "",
            "ConsigneeMaskedContactNumber": "",
            "ConsigneeMobile": "9995554441",
            "ConsigneeName": consigneename,
            "ConsigneePincode": consigneepin,
            "ConsigneeStateCode": "",
            "ConsigneeTelephone": consigneephone,
            "ConsingeeFederalTaxId": "",
            "ConsingeeRegistrationNumber": "",
            "ConsingeeRegistrationNumberIssuerCountryCode": "",
            "ConsingeeRegistrationNumberTypeCode": "",
            "ConsingeeStateTaxId": ""
        },
        "Services": {
            "AWBNo": "",
            "ActualWeight": weight,
            "AdditionalDeclaration": "",
            "AuthorizedDealerCode": itemId,
            "BankAccountNumber": "",
            "BillToAddressLine1": "",
            "BillToCity": "",
            "BillToCompanyName": "",
            "BillToContactName": "",
            "BillToCountryCode": "",
            "BillToCountryName": "",
            "BillToFederalTaxID": "",
            "BillToPhoneNumber": "",
            "BillToPostcode": "",
            "BillToState": "",
            "BillToSuburb": "",
            "BillingReference1": "",
            "BillingReference2": "",
            "CessCharge": 0.0,
            "CollectableAmount": 0.0,
            "Commodity": {
                "CommodityDetail1": Commodity,
                "CommodityDetail2": "",
                "CommodityDetail3": ""
            },
            "CreditReferenceNo": Referenceno,
            "CreditReferenceNo2": "",
            "CreditReferenceNo3": "",
            "CurrencyCode": currency,
            "DeclaredValue": DeclaredValue,
            "DeliveryTimeSlot": "",
            "Dimensions": dataArray,
            "ECCN": "",
            "EsellerPlatformName": "",
            "ExchangeWaybillNo": "",
            "ExportImportCode": exCode,
            "ExportReason": exportReason,
            "ExporterAddressLine1": "",
            "ExporterAddressLine2": "",
            "ExporterAddressLine3": "",
            "ExporterBusinessPartyTypeCode": "",
            "ExporterCity": "",
            "ExporterCompanyName": "",
            "ExporterCountryCode": "",
            "ExporterCountryName": "",
            "ExporterDivision": "",
            "ExporterDivisionCode": "",
            "ExporterEmail": "",
            "ExporterFaxNumber": "",
            "ExporterMobilePhoneNumber": "",
            "ExporterPersonName": "",
            "ExporterPhoneNumber": "",
            "ExporterPostalCode": "",
            "ExporterRegistrationNumber": "",
            "ExporterRegistrationNumberIssuerCountryCode": "",
            "ExporterRegistrationNumberTypeCode": "",
            "ExporterSuiteDepartmentName": "",
            "FavouringName": "",
            "ForwardAWBNo": "",
            "ForwardLogisticCompName": "",
            "FreightCharge": 0.0,
            "GovNongovType": "",
            "IncotermCode": incoterm,
            "InsuranceAmount": 0.0,
            "InsurancePaidBy": "",
            "InsurenceCharge": 0.0,
            "InvoiceNo": "",
            "IsCargoShipment": false,
            "IsChequeDD": "",
            "IsCommercialShipment": false,
            "IsDedicatedDeliveryNetwork": false,
            "IsDutyTaxPaidByShipper": false,
            "IsEcomUser": csbValue,
            "IsForcePickup": false,
            "IsIntlEcomCSBUser": csbValue,
            "IsPartialPickup": false,
             "IsReversePickup": false,
            "ItemCount": 1,
            "MarketplaceName": "",
            "MarketplaceURL": "",
            "NFEIFlag": false,
            "NotificationMessage": "",
            "Officecutofftime": "",
            "OrderURL": "",
            "PDFOutputNotRequired": false,
            "PackType": "O",
            "ParcelShopCode": "",
            "PayableAt": "",
            "PayerGSTVAT": 0.0,
            "PickupDate": formattedDate,
            "PickupMode": "",
            "PickupTime": pickuptime,
            "PickupType": "",
            "PieceCount": pieces,
            "PrinterLableSize": "4",
            "PreferredPickupTimeSlot": "",
            "ProductCode": "I",
            "ProductFeature": "",
            "ProductType": pty,
        
            "RegisterPickup": rpk,
            "ReverseCharge": 0.0,
            "SignatureName": "",
            "SignatureTitle": "",
            "SpecialInstruction": "",
            "SubProductCode": "",
            "SupplyOfIGST": supplyIgst,
            "SupplyOfwoIGST": supplywoIgst,
            "TermsOfTrade": incoterm,
            "TotalCashPaytoCustomer": 0.0,
            "Total_IGST_Paid": igstInput,
            "itemdtl": [
                {
                    "CGSTAmount": 0.0,
                    "CommodityCode": cmdtyCode,
                    "Discount": 0.0,
                    "HSCode": hsCode,
                    "IGSTAmount": igstInput,
                    "IGSTRate": 0.0,
                    "Instruction": "",
                    "InvoiceDate": formattedDate,
                    "InvoiceNumber": Waybill,
                    "IsMEISS": "0",
                    "ItemID": "1",
                    "ItemName": itemName,
                    "ItemValue": DeclaredValue,
                    "Itemquantity": 1,
                    "LicenseNumber": "",
                    "ManufactureCountryCode": "IN",
                    "ManufactureCountryName": "INDIA",
                    "PerUnitRate": DeclaredValue,
                    "PieceID": "1",
                    "PieceIGSTPercentage": 0.0,
                    "PlaceofSupply": "",
                    "ProductDesc1": cmdtyCode,
                    "ProductDesc2": "",
                    "ReturnReason": "",
                    "SGSTAmount": 0.0,
                    "SKUNumber": "SKU0001",
                    "SellerGSTNNumber": "",
                    "SellerName": "",
                    "TaxableAmount": DeclaredValue,
                    "TotalValue": DeclaredValue,
                    "Unit": "PCS",
                    "Weight": weight,
                    "cessAmount": "0.0",
                    "countryOfOrigin": "IN"
                }
            ],
            "noOfDCGiven": 0
        },
        "Shipper": {
            "CustomerAddress1": saddress1,
            "CustomerAddress2": saddress2,
            "CustomerAddress3": saddress3,
            "CustomerAddressinfo": "",
            "CustomerBusinessPartyTypeCode": "",
            "CustomerCode": custcode,
            "CustomerEmailID": "TestCustEmail@bd.com",
            "CustomerFiscalID": "",
            "CustomerFiscalIDType": "",
            "CustomerGSTNumber": shipgst,
            "CustomerLatitude": "",
            "CustomerLongitude": "",
            "CustomerMaskedContactNumber": "",
            "CustomerMobile": "9996665554",
            "CustomerName": "TEST RUN",
            "CustomerPincode": spincode,
            "CustomerRegistrationNumber": "",
            "CustomerRegistrationNumberIssuerCountryCode": "",
            "CustomerRegistrationNumberTypeCode": "",
            "CustomerTelephone": "4461606161",
            "IsToPayCustomer": Topay,
            "OriginArea": orgarea,
            "Sender":  csender,
            "VendorCode": ""
  
 }
  },
  "Profile": {
    "LoginID": Usrlogin,
    "LicenceKey": shiplis,
    "Api_type": "S"
  }
});


//document.getElementById("responseText").textContent =""
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
//fetch("https://apigateway.bluedart.com/in/transportation/waybill/v1/GenerateWayBill", requestOptions)
fetch("https://apigateway-sandbox.bluedart.com/in/transportation/waybill/v1/GenerateWayBill", requestOptions)

        .then((response) => response.json())
        .then((result) => {
// Ensure vasres exists and has no error
const vasdata = typeof result === "string" ? JSON.parse(result) : result;
const vasres = vasdata.GenerateWayBillResult;

if (vasres && !vasres.IsError) {
    // 1. Get the primary status (Waybill Generation)
    const waybillStatus = vasres.Status[0] || {};
    // 2. Get the pickup status (Pickup Registration)
    const pickupStatus = vasres.Status[1] || {};

    let tableHTML = `
        <table id="resultTable">
            <tbody>
                <tr>
                    <td><strong>Awbno:</strong></td>
                    <td>${vasres.AWBNo}</td>
                
                    <td><strong>| DestinationArea:</strong></td>
                    <td>${vasres.DestinationArea}</td>
                
		    <td><strong>| DestinationLocation:</strong></td>
                    <td>${vasres.DestinationLocation}</td>
                </tr>
                <tr>
                    <td><strong>PickupRegistration:</strong></td>
                    <td>${pickupStatus.StatusInformation || 'N/A'}</td>
                
                    <td><strong>| TokenNumber:</strong></td>
                    <td>${vasres.TokenNumber}</td>
                
                   <td><strong>| StatusInformation:</strong></td>
<td colspan="3" class="status-success">
    ${waybillStatus.StatusInformation || 'N/A'}
</td>                
</tr>
            </tbody>
        </table>
    `;
    
    document.getElementById("apiResult").innerHTML = tableHTML;
}


const awbData = result?.GenerateWayBillResult?.AWBPrintContent;
        awbNo = result?.GenerateWayBillResult?.AWBNo || "WayBill";

        if (awbData && Array.isArray(awbData)) {
    // Ensure it's a typed array for the Blob
    const byteArray = new Uint8Array(awbData);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Revoke old URL to prevent memory leaks (Optional but recommended)
    if (window.pdfUrl) URL.revokeObjectURL(window.pdfUrl);
    
    window.pdfUrl = URL.createObjectURL(blob);

    const iframe = document.getElementById("pdfViewer");
    if (iframe) {
        iframe.src = window.pdfUrl;
        iframe.style.display = "block";
        // Force a reload if necessary
        iframe.contentWindow.location.reload(); 
    }

	
document.getElementById("responseH3").textContent=""
      }else{
document.getElementById("responseH3").textContent =""
const errData = vasdata["error-response"] ? vasdata["error-response"][0] : null;

if (errData) {
    const statusObj = errData.Status && errData.Status[0] ? errData.Status[0] : {};
    const statusObj1 = errData.Status && errData.Status[1] ? errData.Status[1] : {};

    let tableHTML = `
        <table id="resultTable">
            <tbody>
                <tr>
                    <td><strong>Status:</strong></td>
                    <td style="color:red; font-weight:bold;">${vasdata.status}</td>
                    
                    <td><strong>Title:</strong></td>
                    <td>${vasdata.title}</td>
                    
                    <td><strong>Awbno:</strong></td>
                    <td>${errData.AWBNo || 'N/A'}</td>
                
                    <td><strong>Ccrdrefno:</strong></td>
                    <td>${errData.CCRCRDREF}</td>
		 </tr>
                  <tr>  
                    <td><strong>StatusCode:</strong></td>
                    <td>${statusObj.StatusCode}</td>
                    
                    <td><strong>StatusInformation:</strong></td>
                    <td colspan="5" style="color:#d35400; font-weight:bold; font-size:13px;">
                        ${statusObj.StatusInformation}
                    </td>
                </tr>
		 <tr>  
                                        
                    <td><strong>StatusInformation:</strong></td>
                    <td colspan="7" style="color:#d35400; font-weight:bold; font-size:13px;">
                        ${statusObj1.StatusInformation}
                    </td>
                </tr>

            </tbody>
        </table>
    `;

    document.getElementById("apiResult").innerHTML = tableHTML;
   // document.getElementById("pdfViewer").innerHTML = "";
}

}

        })

        .catch((error) => {
	//document.getElementById("responseText").textContent = JSON.stringify(result, null, 2);
        document.getElementById("responseText").textContent = "Error: " + error;
        });
    

}


function fetchData() {
            const code = document.getElementById('searchCode').value.trim();
         //   if (!code) return alert("Please enter a code");
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
        document.getElementById('cadd1').value = adr1 + ", " + adr2;
        document.getElementById('city').value = adr3;

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
          //  if (!code) return alert("Please enter a code");
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
        //alert("No record found for this code.");
    }
};
            };
        }


