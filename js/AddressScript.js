    const dbName = "LogisticsDB";
    const dbVersion = 2; // Increased to 2 to force the update

    function handleFileUpload() {
        const fileInput = document.getElementById('csvFile');
        if (fileInput.files.length === 0) return alert("Please select a file!");

        const reader = new FileReader();
        reader.onload = (e) => importCSV(e.target.result);
        reader.readAsText(fileInput.files[0]);
    }

    function importCSV(csvText) {
        // Re-open with the new version number
        const dbRequest = indexedDB.open(dbName, dbVersion);

        dbRequest.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("consignees")) {
                db.createObjectStore("consignees", { keyPath: "CONSIGNEECODE" });
                console.log("Store created successfully");
            }
        };

        dbRequest.onsuccess = (event) => {
            const db = event.target.result;
            const lines = csvText.trim().split(/\r?\n/);
            
            // Start transaction ONLY after success
            const transaction = db.transaction("consignees", "readwrite");
            const store = transaction.objectStore("consignees");

            let count = 0;
            for (let i = 1; i < lines.length; i++) {
                const row = lines[i].split("\t"); 
                if (row.length < 6) continue;

                store.put({
                    CONSIGNEECODE: row[0].trim(), 
                    CONSIGNEE_NAME: btoa(row[1]?.trim() || ""),
                    ADDRESS1:      btoa(row[2]?.trim() || ""),
                    ADDRESS2:      btoa(row[3]?.trim() || ""),
                    ADDRESS3:      btoa(row[4]?.trim() || ""),
                    CPINCODE:      btoa(row[5]?.trim() || ""),
                    PHONE:         btoa(row[6]?.trim() || "")
                });
                count++;
            }

            transaction.oncomplete = () => alert(`Success: ${count} records saved.`);
            transaction.onerror = () => console.error("Transaction failed");
        };
    }