/* =========================================
   STUDENT DASHBOARD
========================================= */


/* ---------- LOAD STUDENT TASKS ---------- */

function loadStudentTasks() {

    const tableBody =
        document.getElementById("studentTaskTableBody");

    if (!tableBody) {
        return;
    }


    /* Check missed tasks first */

    if (typeof checkMissedTasks === "function") {
        checkMissedTasks();
    }


    const tasks =
        typeof getTasks === "function"
            ? getTasks()
            : [];


    tableBody.innerHTML = "";


    if (tasks.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center;">

                    No tasks available.

                </td>

            </tr>

        `;

        return;
    }


    tasks.forEach(function(task) {

        let statusClass = "";

        let actionButton = "";


        /* ---------- STATUS ---------- */

        if (task.status === "Completed") {

            statusClass =
                "student-completed";

            actionButton = `
                <button
                    class="complete-task-btn"
                    disabled>

                    ✅ Completed

                </button>
            `;

        }


        else if (task.status === "Missed") {

            statusClass =
                "student-missed";

            actionButton = `
                <button
                    class="complete-task-btn"
                    disabled>

                    ❌ Missed

                </button>
            `;

        }


        else {

            statusClass =
                "student-pending";

            actionButton = `
                <button
                    class="complete-task-btn"
                    onclick="completeStudentTask(${task.id})">

                    ✅ Complete

                </button>
            `;

        }


        /* ---------- TABLE ---------- */

        tableBody.innerHTML += `

            <tr>

                <td>
                    ${escapeHTML(task.date || "-")}
                </td>

                <td>

                    <strong>
                        ${escapeHTML(task.title || "-")}
                    </strong>

                    ${
                        task.description
                            ? `
                                <br>
                                <small>
                                    ${escapeHTML(
                                        task.description
                                    )}
                                </small>
                              `
                            : ""
                    }

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

                <td>
                    ${actionButton}
                </td>

            </tr>

        `;

    });


    updateStudentStats(tasks);

}


/* ---------- COMPLETE STUDENT TASK ---------- */

function completeStudentTask(taskId) {

    if (typeof completeTask !== "function") {
        return;
    }


    completeTask(taskId);


    /* Refresh student tasks */

    loadStudentTasks();

}


/* ---------- STUDENT STATISTICS ---------- */

function updateStudentStats(tasks) {

    const total =
        tasks.length;


    const completed =
        tasks.filter(function(task) {

            return task.status === "Completed";

        }).length;


    const pending =
        tasks.filter(function(task) {

            return task.status === "Pending";

        }).length;


    const missed =
        tasks.filter(function(task) {

            return task.status === "Missed";

        }).length;


    setStudentElement(
        "studentTotalTasks",
        total
    );


    setStudentElement(
        "studentCompletedTasks",
        completed
    );


    setStudentElement(
        "studentPendingTasks",
        pending
    );


    setStudentElement(
        "studentMissedTasks",
        missed
    );

}


/* ---------- HELPER ---------- */

function setStudentElement(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent = value;

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


/* ---------- INITIALIZE ---------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            document.getElementById(
                "studentTaskTableBody"
            )
        ) {

            loadStudentTasks();

        }

    }
);