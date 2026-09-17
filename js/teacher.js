/* =========================================
   TEACHER DASHBOARD
========================================= */


/* ---------- LOAD DASHBOARD ---------- */

function loadTeacherDashboard() {

    const tasks =
        typeof getTasks === "function"
            ? getTasks()
            : [];


    /* ---------- COUNTS ---------- */

    const totalTasks =
        tasks.length;


    const completedTasks =
        tasks.filter(function(task) {
            return task.status === "Completed";
        }).length;


    const pendingTasks =
        tasks.filter(function(task) {
            return task.status === "Pending";
        }).length;


    const missedTasks =
        tasks.filter(function(task) {
            return task.status === "Missed";
        }).length;


    /* ---------- DISPLAY COUNTS ---------- */

    setElementText(
        "totalTasks",
        totalTasks
    );


    setElementText(
        "completedTasks",
        completedTasks
    );


    setElementText(
        "pendingTasks",
        pendingTasks
    );


    setElementText(
        "missedTasks",
        missedTasks
    );


    /* ---------- RECENT TASKS ---------- */

    displayRecentTasks(tasks);

}


/* ---------- DISPLAY RECENT TASKS ---------- */

function displayRecentTasks(tasks) {

    const tableBody =
        document.getElementById(
            "recentTaskTableBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    if (tasks.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="5"
                    style="text-align:center;">

                    No tasks available.

                </td>

            </tr>

        `;

        return;
    }


    /* Show latest 5 tasks */

    const recentTasks =
        [...tasks]
            .reverse()
            .slice(0, 5);


    recentTasks.forEach(function(task) {

        let statusClass = "";


        if (task.status === "Completed") {

            statusClass =
                "status-completed";

        } else if (task.status === "Missed") {

            statusClass =
                "status-missed";

        } else {

            statusClass =
                "status-pending";

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
                        task.duration
                            ? String(task.duration)
                            : "-"
                    )} min
                </td>

                <td>

                    <span class="${statusClass}">

                        ${escapeHTML(
                            task.status || "Pending"
                        )}

                    </span>

                </td>

            </tr>

        `;

    });

}


/* ---------- HELPER ---------- */

function setElementText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent = value;

    }

}


/* ---------- ESCAPE HTML ---------- */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ---------- INITIALIZE ---------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            document.getElementById(
                "totalTasks"
            )
        ) {

            if (
                typeof checkMissedTasks ===
                "function"
            ) {

                checkMissedTasks();

            }


            loadTeacherDashboard();

        }

    }
);