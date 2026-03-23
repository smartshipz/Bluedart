window.onload = function() {
    displayConfig();
}

function displayConfig() {
    let storedData = localStorage.getItem("ckey");
    if (!storedData) {
        alert("Account Configuration is Empty");
        return;
    }

    let data = JSON.parse(storedData);

    document.getElementById("loginid").value = data.loginid || "";
    document.getElementById("skey").value = data.skey || "";
    document.getElementById("tkey").value = data.tkey || "";
    document.getElementById("area").value = data.area || "";
    document.getElementById("code").value = data.code || "";
    document.getElementById("cname").value = data.cname || "";
    document.getElementById("cadr1").value = data.cadr1 || "";
    document.getElementById("cadr2").value = data.cadr2 || "";
    document.getElementById("cadr3").value = data.cadr3 || "";
    document.getElementById("cpin").value = data.cpin || "";
    document.getElementById("phone").value = data.phone || "";
    document.getElementById("autoRef").value = data.refauto || "";
    document.getElementById("oarea").value = data.orgmps || "";
    document.getElementById("lalign").value = data.mpsleft || "";
    document.getElementById("talign").value = data.mpstop || "";
}

function saveConfig() {
    let data = {
        loginid: document.getElementById("loginid").value,
        skey: document.getElementById("skey").value,
        tkey: document.getElementById("tkey").value,
        area: document.getElementById("area").value,
        code: document.getElementById("code").value,
        cname: document.getElementById("cname").value,
        cadr1: document.getElementById("cadr1").value,
        cadr2: document.getElementById("cadr2").value,
        cadr3: document.getElementById("cadr3").value,
        cpin: document.getElementById("cpin").value,
        phone: document.getElementById("phone").value,
	refauto: document.getElementById("autoRef").value,
 	orgmps: document.getElementById("oarea").value,
 	mpsleft: document.getElementById("lalign").value,
 	mpstop: document.getElementById("talign").value


    };

    localStorage.setItem("ckey", JSON.stringify(data));
    alert("Account Configuration Saved Successfully!");
}
