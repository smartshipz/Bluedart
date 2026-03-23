    function track() {
      const Awbno = document.getElementById("awbNum").value;
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "Loading...";

      const myHeaders = new Headers();
      myHeaders.append("JWTToken", localStorage.getItem("key"));

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };


let storedData = localStorage.getItem("ckey");
    if (!storedData) {
        alert("Account Configuration is Empty");
        return;
    }

    let data = JSON.parse(storedData);
    var login = data.loginid || "";
    var tracklis = data.tkey || "";



      const url = `https://apigateway.bluedart.com/in/transportation/tracking/v1?handler=tnt&loginid=${login}&awb=awb&numbers=${Awbno}&format=json&lickey=${tracklis}&scan=0&action=custawbquery&verno=1`;

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          resultDiv.innerHTML = "";

          const shipmentData = data.ShipmentData.Shipment && data.ShipmentData.Shipment[0] ? data.ShipmentData.Shipment[0] : null;
console.log(data)

         if (!shipmentData) {
            resultDiv.innerHTML = "<p class='error'>No tracking data found.</p>";
            return;
          }

          let table = `<table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>`;

          for (let key in shipmentData) {
            table += `<tr>
              <td>${key}</td>
              <td>${shipmentData[key]}</td>
            </tr>`;
          }

          table += `</tbody></table>`;
          resultDiv.innerHTML = table;
        })
        .catch(error => {
          console.error("Error:", error);
          resultDiv.innerHTML = `<p class='error'>Error fetching data: ${error}</p>`;
        });
    }