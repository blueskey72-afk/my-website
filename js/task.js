/* =========================================
   TASK MANAGEMENT
========================================= */


/* ---------- GET TASKS ---------- */

function getTasks() {

    const tasks = localStorage.getItem("tasks");

    if (!tasks) {
        return [];
    }

    try {
        return JSON.parse(tasks);
    } catch (error) {
        return [];
    }
}


/* ---------- SAVE TASKS ---------- */

function saveTasks(tasks) {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


/* ---------- CREATE TASK ---------- */

function createTask() {

    const title =
        document.getElementById("taskTitle").value.trim();

    const description =
        document.getElementById("taskDescription").value.trim();

    const date =
        document.getElementById("taskDate").value;

    const deadline =
        document.getElementById("taskDeadline").value;

    const duration =
        document.getElementById("taskDuration").value;


    /* ---------- VALIDATION ---------- */

    if (!title) {

        showTaskMessage(
            "Please enter task title.",
            "error"
        );

        return;
    }


    if (!date) {

        showTaskMessage(
            "Please select task date.",
            "error"
        );

        return;
    }


    if (!deadline) {

        showTaskMessage(
            "Please select deadline.",
            "error"
        );

        return;
    }


    if (!duration) {

        showTaskMessage(
            "Please enter task duration.",
            "error"
        );

        return;
    }


    /* ---------- CREATE TASK OBJECT ---------- */

    const task = {

        id: Date.now(),

        title: title,

        description: description,

        date: date,

        deadline: deadline,

        duration: Number(duration),

        status: "Pending",

        consequenceAdded: false,

        consequence: "",

        createdAt: new Date().toISOString()

    };


    /* ---------- GET OLD TASKS ---------- */

    const tasks = getTasks();


    /* ---------- ADD NEW TASK ---------- */

    tasks.push(task);


    /* ---------- SAVE ---------- */

    saveTasks(tasks);


    /* ---------- SUCCESS MESSAGE ---------- */

    showTaskMessage(
        "Task created successfully!",
        "success"
    );


    /* ---------- CLEAR FORM ---------- */

    clearTaskForm();

}


/* ---------- CLEAR TASK FORM ---------- */

function clearTaskForm() {

    const title =
        document.getElementById("taskTitle");

    const description =
        document.getElementById("taskDescription");

    const date =
        document.getElementById("taskDate");

    const deadline =
        document.getElementById("taskDeadline");

    const duration =
        document.getElementById("taskDuration");


    if (title) {
        title.value = "";
    }

    if (description) {
        description.value = "";
    }

    if (date) {
        date.value = "";
    }

    if (deadline) {
        deadline.value = "";
    }

    if (duration) {
        duration.value = "";
    }

}


/* ---------- TASK MESSAGE ---------- */

function showTaskMessage(message, type) {

    const messageBox =
        document.getElementById("taskMessage");


    if (!messageBox) {
        return;
    }


    messageBox.textContent = message;


    if (type === "success") {

        messageBox.style.color = "#15803d";

    } else {

        messageBox.style.color = "#dc2626";

    }

}


/* ---------- COMPLETE TASK ---------- */

function completeTask(taskId) {

    const tasks = getTasks();


    const task =
        tasks.find(function(item) {

            return item.id === taskId;

        });


    if (!task) {
        return;
    }


    const now = new Date();

    const deadline =
        new Date(task.deadline);


    /* ---------- CHECK DEADLINE ---------- */

    if (now > deadline) {

        alert(
            "This task cannot be completed because its deadline has passed."
        );

        return;
    }


    /* ---------- MARK COMPLETED ---------- */

    task.status = "Completed";

    task.completedAt =
        new Date().toISOString();


    /* ---------- IMPORTANT ---------- */

    task.consequenceAdded = false;

    task.consequence = "";


    /* ---------- SAVE ---------- */

    saveTasks(tasks);


    /* ---------- REFRESH ---------- */

    if (typeof loadStudentTasks === "function") {

        loadStudentTasks();

    }

}


/* ---------- CHECK MISSED TASKS ---------- */

function checkMissedTasks() {

    const tasks = getTasks();

    const now = new Date();


    tasks.forEach(function(task) {

        if (
            task.status === "Pending" &&
            new Date(task.deadline) < now
        ) {

            task.status = "Missed";

        }

    });


    saveTasks(tasks);

}


/* ---------- INITIAL CHECK ---------- */

checkMissedTasks();