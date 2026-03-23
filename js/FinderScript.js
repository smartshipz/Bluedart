    function add() {
      const pinCode = document.getElementById("pin").value.trim();
      const container = document.getElementById("tableContainer");
      container.innerHTML = ""; // Clear previous result

      if (!pinCode) {
        container.innerHTML = `<div class="no-data">Please enter a valid pincode.</div>`;
        return;
      }

 
    let storedData = localStorage.getItem("ckey");
    if (!storedData) {
        alert("Account Configuration is Empty");
        return;
    }

    let data = JSON.parse(storedData);

    var login = data.loginid || "";
   
    var tracklis = data.skey || "";


      const myHeaders = new Headers();
      myHeaders.append("content-type", "application/json");
      myHeaders.append("JWTToken", localStorage.getItem("key")); // Ensure token is valid

      const raw = JSON.stringify({
        "pinCode": pinCode,
        "profile": {
          "LoginID": login ,
          "Api_type": "S",
          "LicenceKey": tracklis
        }
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("https://apigateway.bluedart.com/in/transportation/finder/v1/GetServicesforPincode", requestOptions)
        .then(response => response.json())
        .then(jsonData => {
          const result = jsonData.GetServicesforPincodeResult;

          if (!result || Object.keys(result).length === 0) {
            container.innerHTML = `<div class="no-data">No data found for the entered pincode.</div>`;
            return;
          }

          // Service-related keys prioritized
          const priorityKeys = [
            "PickupAvailable",
            "DeliveryAvailable",
            "CODFlag",
            "PrepaidFlag",
            "ReversePickupFlag",
            "ODAFlag",
            "City",
            "State",
            "Pincode"
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