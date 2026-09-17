/* =========================================
   CUSTOM CONSEQUENCE MANAGEMENT
========================================= */


/* ---------- GET CONSEQUENCES ---------- */

function getConsequences() {

    const data =
        localStorage.getItem("consequences");

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}


/* ---------- SAVE CONSEQUENCES ---------- */

function saveConsequences(consequences) {

    localStorage.setItem(
        "consequences",
        JSON.stringify(consequences)
    );
}


/* ---------- ADD CONSEQUENCE ---------- */

function addConsequence() {

    const nameInput =
        document.getElementById("consequenceName");

    const valueInput =
        document.getElementById("consequenceValue");


    if (!nameInput) {
        return;
    }


    const name =
        nameInput.value.trim();


    const value =
        valueInput
            ? valueInput.value.trim()
            : "";


    /* ---------- VALIDATION ---------- */

    if (!name) {

        showConsequenceMessage(
            "Please enter a consequence.",
            "error"
        );

        return;
    }


    /* ---------- CREATE OBJECT ---------- */

    const consequence = {

        id: Date.now(),

        name: name,

        value: value,

        createdAt: new Date().toISOString()

    };


    /* ---------- GET OLD CONSEQUENCES ---------- */

    const consequences =
        getConsequences();


    /* ---------- ADD ---------- */

    consequences.push(consequence);


    /* ---------- SAVE ---------- */

    saveConsequences(consequences);


    /* ---------- MESSAGE ---------- */

    showConsequenceMessage(
        "Consequence added successfully!",
        "success"
    );


    /* ---------- CLEAR ---------- */

    clearConsequenceForm();


    /* ---------- DISPLAY ---------- */

    displayConsequences();

}


/* ---------- DISPLAY CONSEQUENCES ---------- */

function displayConsequences() {

    const list =
        document.getElementById("consequenceList");


    if (!list) {
        return;
    }


    const consequences =
        getConsequences();


    list.innerHTML = "";


    if (consequences.length === 0) {

        list.innerHTML = `
            <div class="empty-message"
                 style="display:block;">

                No custom consequences added yet.

            </div>
        `;

        return;
    }


    consequences.forEach(function(consequence) {

        let valueText = "";


        if (consequence.value) {

            valueText =
                `<p>
                    Duration / Count:
                    <strong>
                        ${escapeHTML(consequence.value)}
                    </strong>
                </p>`;

        } else {

            valueText =
                `<p>
                    Duration / Count:
                    <strong>Not specified</strong>
                </p>`;

        }


        list.innerHTML += `

            <div class="consequence-card">

                <h3>
                    ⚠️
                    ${escapeHTML(consequence.name)}
                </h3>

                ${valueText}

                <button
                    type="button"
                    onclick="deleteConsequence(${consequence.id})">

                    🗑️ Delete

                </button>

            </div>

        `;

    });

}


/* ---------- DELETE CONSEQUENCE ---------- */

function deleteConsequence(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this consequence?"
        );


    if (!confirmDelete) {
        return;
    }


    let consequences =
        getConsequences();


    consequences =
        consequences.filter(function(consequence) {

            return consequence.id !== id;

        });


    saveConsequences(consequences);


    displayConsequences();


    showConsequenceMessage(
        "Consequence deleted.",
        "success"
    );

}


/* ---------- CLEAR FORM ---------- */

function clearConsequenceForm() {

    const nameInput =
        document.getElementById("consequenceName");

    const valueInput =
        document.getElementById("consequenceValue");


    if (nameInput) {
        nameInput.value = "";
    }


    if (valueInput) {
        valueInput.value = "";
    }

}


/* ---------- MESSAGE ---------- */

function showConsequenceMessage(message, type) {

    const messageBox =
        document.getElementById("consequenceMessage");


    if (!messageBox) {
        return;
    }


    messageBox.textContent =
        message;


    if (type === "success") {

        messageBox.style.color = "#15803d";

    } else {

        messageBox.style.color = "#dc2626";

    }

}


/* ---------- HTML SAFETY ---------- */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ---------- LOAD CONSEQUENCES ---------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayConsequences();

    }
);