/* =========================================
   TASK HISTORY
========================================= */


/* ---------- LOAD HISTORY ---------- */

function loadTaskHistory() {

    const tableBody =
        document.getElementById("historyTableBody");

    const emptyMessage =
        document.getElementById("emptyHistoryMessage");


    if (!tableBody) {
        return;
    }


    const tasks =
        typeof getTasks === "function"
            ? getTasks()
            : [];


    tableBody.innerHTML = "";


    if (tasks.length === 0) {

        if (emptyMessage) {
            emptyMessage.style.display = "block";
        }

        return;
    }


    if (emptyMessage) {
        emptyMessage.style.display = "none";
    }


    tasks.forEach(function(task) {

        let statusClass = "";


        if (task.status === "Completed") {

            statusClass = "status-completed";

        } else if (task.status === "Missed") {

            statusClass = "status-missed";

        } else {

            statusClass = "status-pending";

        }


        let consequenceText =
            "None";


        if (task.consequenceAdded && task.consequence) {

            consequenceText =
                task.consequence;

        }


        tableBody.innerHTML += `

            <tr>

                <td>
                    ${escapeHTML(task.date || "-")}
                </td>

                <td>
                    ${escapeHTML(task.title || "-")}
                </td>

                <td>
                    ${escapeHTML(task.deadline || "-")}
                </td>

                <td>
                    ${escapeHTML(
                        String(task.duration || "-")
                    )} min
                </td>

                <td>

                    <span class="${statusClass}">
                        ${escapeHTML(task.status || "Pending")}
                    </span>

                </td>

                <td>
                    ${escapeHTML(consequenceText)}
                </td>

            </tr>

        `;

    });

}


/* ---------- FILTER HISTORY ---------- */

function filterTaskHistory() {

    const statusFilter =
        document.getElementById("historyFilter");

    const dateFilter =
        document.getElementById("historyDate");

    const tableBody =
        document.getElementById("historyTableBody");


    if (!tableBody) {
        return;
    }


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const selectedDate =
        dateFilter
            ? dateFilter.value
            : "";


    const tasks =
        typeof getTasks === "function"
            ? getTasks()
            : [];


    tableBody.innerHTML = "";


    let filteredTasks =
        tasks.filter(function(task) {

            let statusMatch = true;

            let dateMatch = true;


            /* STATUS FILTER */

            if (selectedStatus !== "all") {

                if (
                    selectedStatus === "completed" &&
                    task.status !== "Completed"
                ) {

                    statusMatch = false;

                }


                if (
                    selectedStatus === "pending" &&
                    task.status !== "Pending"
                ) {

                    statusMatch = false;

                }


                if (
                    selectedStatus === "missed" &&
                    task.status !== "Missed"
                ) {

                    statusMatch = false;

                }

            }


            /* DATE FILTER */

            if (
                selectedDate &&
                task.date !== selectedDate
            ) {

                dateMatch = false;

            }


            return statusMatch && dateMatch;

        });


    const emptyMessage =
        document.getElementById("emptyHistoryMessage");


    if (filteredTasks.length === 0) {

        if (emptyMessage) {
            emptyMessage.style.display = "block";
        }

        return;
    }


    if (emptyMessage) {
        emptyMessage.style.display = "none";
    }


    filteredTasks.forEach(function(task) {

        let statusClass = "";


        if (task.status === "Completed") {

            statusClass = "status-completed";

        } else if (task.status === "Missed") {

            statusClass = "status-missed";

        } else {

            statusClass = "status-pending";

        }


        let consequenceText =
            "None";


        if (task.consequenceAdded && task.consequence) {

            consequenceText =
                task.consequence;

        }


        tableBody.innerHTML += `

            <tr>

                <td>
                    ${escapeHTML(task.date || "-")}
                </td>

                <td>
                    ${escapeHTML(task.title || "-")}
                </td>

                <td>
                    ${escapeHTML(task.deadline || "-")}
                </td>

                <td>
                    ${escapeHTML(
                        String(task.duration || "-")
                    )} min
                </td>

                <td>

                    <span class="${statusClass}">
                        ${escapeHTML(task.status || "Pending")}
                    </span>

                </td>

                <td>
                    ${escapeHTML(consequenceText)}
                </td>

            </tr>

        `;

    });

}


/* ---------- INITIALIZE HISTORY ---------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            document.getElementById(
                "historyTableBody"
            )
        ) {

            if (typeof checkMissedTasks === "function") {
                checkMissedTasks();
            }

            loadTaskHistory();

        }

    }
);