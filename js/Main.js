    function loadPage(pageUrl) {
      const iframe = document.getElementById("contentFrame");
      iframe.style.display = "block";
      iframe.src = pageUrl;
      closeAllDropdowns();
    }

    function handleSelection() {
      alert("Functionality coming soon!");
      closeAllDropdowns();
    }

    function token() {
      const myHeaders = new Headers();
//      myHeaders.append("ClientID", "cLj7QV7JwsicX9oMCAJ73AfKcALkgCE7");
 //   myHeaders.append("clientSecret", "Cz3JUn43A7EjBlO5");
     myHeaders.append("ClientID", "8h77KkLGHM95pXOqlDPwSmaRyoEkM7MB");
     myHeaders.append("clientSecret", "HGrnepHEU2eHWm93");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

     //fetch("https://apigateway-sandbox.bluedart.com/in/transportation/token/v1/login", requestOptions)
fetch("https://apigateway.bluedart.com/in/transportation/token/v1/login", requestOptions)
        .then((response) => response.json())
        .then((result) => localStorage.setItem("key", result.JWTToken))
        .catch((error) => console.error("Token fetch error:", error));
    }

    function openDropdown(event) {
      const dropdown = event.currentTarget;
      const content = dropdown.querySelector(".dropdown-content");
      closeAllDropdowns();
      content.style.display = "block";
    }

    function closeDropdown(event) {
      const dropdown = event.currentTarget;
      const content = dropdown.querySelector(".dropdown-content");
      content.style.display = "none";
    }

    function closeAllDropdowns() {
      document.querySelectorAll(".dropdown-content").forEach(el => el.style.display = "none");
    }

    // Highlight active nav
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", function () {
        document.querySelectorAll(".nav-links a").forEach(el => el.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Optional: close dropdown on outside click (if clicked not on dropdown)
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".dropdown")) {
        closeAllDropdowns();
      }
    });