let storedData = localStorage.getItem("ckey");
 //   if (!storedData) {
    //    alert("Account Configuration is Empty");
   //     return;
  //  }

    let data = JSON.parse(storedData);
    var org = data.orgmps || "";
    var addleft = data.mpsleft || "";
    var addtop = data.mpstop || "";


  let allOutput = "";

  function clearForm() {
    document.getElementById("num").value = "";
  
    document.getElementById("dst").value = "";
    document.getElementById("num1").value = "";
    document.getElementById("ref").value = "";
    document.querySelector('input[name="answer"][value="no"]').checked = true;
  }

  function mps() {
    let a = document.getElementById("num").value;
    let b = parseInt(document.getElementById("num1").value);
  
    let dst = document.getElementById("dst").value;
    let ref = document.getElementById("ref").value;

    if (!a || !b) {
      alert("Please enter AWB Number and Pieces count.");
      return;
    }

    let printWithLogo = document.querySelector('input[name="answer"]:checked').value;
const l1=31+parseInt(addleft)
const l2=128+parseInt(addleft)
const l3=110+parseInt(addleft)
const t1=30+parseInt(addtop)
const t2=168+parseInt(addtop)
const t3=188+parseInt(addtop)
const t4=110+parseInt(addtop)
const t5=250+parseInt(addtop)
const t6=300+parseInt(addtop)
const t7=350+parseInt(addtop)
const t8=400+parseInt(addtop)

    allOutput = "";

    for (let i = 1; i <= b; i++) {
      let k = a + "-" + i.toString().padStart(4, '0');

      let logoBlock = printWithLogo === "yes"
        ? `TEXT ${l1},${t1},"3",0,2,2,"BLUE DART"
BAR 31,55,500,3
`
        : "";

      allOutput += `REFERENCE 0,0
DIRECTION 1
SPEED 3.0
GAP 0.12,0
SIZE 89mm 60mm
SET PEEL OFF
DENSITY 8
CLS
CLS
${logoBlock}
TEXT ${l2},${t2},"2",0,2,2,"${k}"
BAR ${l1},${t3},500,3
BARCODE ${l3},${t4},"128",46,0,0,3,0,"${k}"
TEXT ${l1},${t5},"2",0,2,2,"Dstn: ${org.toUpperCase()} - ${dst.toUpperCase()}"
TEXT ${l1},${t6},"2",0,2,2,"Pcs : ${i} of ${b}"
TEXT ${l1},${t7},"2",0,2,2,"Awb : ${a}"
TEXT ${l1},${t8},"2",0,2,2,"Ref : ${ref}"
PRINT 1,1

`;


    }


 document.getElementById("printSection").innerHTML = `<pre>${allOutput}</pre>`;

    // CLEAR FORM AFTER GENERATE
    clearForm();
  }

  function printOutput() {
    if (!allOutput) {
      alert("Please generate labels first.");
      return;
    }

    window.print();

    // CLEAR FORM AFTER PRINT
    clearForm();
  }

  function downloadOutput() {
    if (!allOutput) {
      alert("Please generate labels first.");
      return;
    }

    const blob = new Blob([allOutput], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.txt";
    link.click();
  }