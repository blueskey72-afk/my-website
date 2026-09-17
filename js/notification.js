/* =========================================
   TASK NOTIFICATION SYSTEM
========================================= */


/* ---------- GET SAVED SETTINGS ---------- */

function getNotificationSettings() {

    const saved =
        localStorage.getItem("settings");


    if (!saved) {

        return {

            taskReminder: true,

            reminderTime: 10,

            missedTaskNotification: true

        };

    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        return {

            taskReminder: true,

            reminderTime: 10,

            missedTaskNotification: true

        };

    }

}


/* ---------- CHECK TASK NOTIFICATIONS ---------- */

function checkTaskNotifications() {

    const settings =
        getNotificationSettings();


    /* Reminder disabled */

    if (!settings.taskReminder) {
        return;
    }


    const tasks =
        typeof getTasks === "function"
            ? getTasks()
            : [];


    const now =
        new Date();


    tasks.forEach(function(task) {

        /* Only pending tasks */

        if (task.status !== "Pending") {
            return;
        }


        const deadline =
            new Date(task.deadline);


        const remainingMilliseconds =
            deadline - now;


        const remainingMinutes =
            Math.floor(
                remainingMilliseconds /
                (1000 * 60)
            );


        /* ---------- TASK STILL HAS TIME ---------- */

        if (
            remainingMinutes > 0 &&
            remainingMinutes <=
            Number(settings.reminderTime)
        ) {

            showTaskNotification(
                task,
                remainingMinutes
            );

        }


        /* ---------- DEADLINE PASSED ---------- */

        if (
            remainingMilliseconds <= 0 &&
            settings.missedTaskNotification
        ) {

            showMissedTaskNotification(task);

        }

    });

}


/* ---------- REMINDER MESSAGE ---------- */

function showTaskNotification(
    task,
    remainingMinutes
) {

    const message =

        "⚠️ Task Reminder\n\n" +

        "Task: " +
        task.title +
        "\n\n" +

        "Your task is not completed yet.\n" +

        "You have approximately " +
        remainingMinutes +
        " minutes remaining.";

    
    showNotificationBox(message);

}


/* ---------- MISSED TASK MESSAGE ---------- */

function showMissedTaskNotification(task) {

    const message =

        "⚠️ Task Deadline Passed\n\n" +

        "Task: " +
        task.title +
        "\n\n" +

        "This task has not been completed " +
        "and its deadline has passed.";

    
    showNotificationBox(message);

}


/* ---------- SHOW NOTIFICATION ---------- */

function showNotificationBox(message) {

    /* Browser notification */

    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {

        new Notification(
            "Smart Task Tracker",
            {
                body: message
            }
        );

    }


    /* Website notification */

    showWebsiteNotification(message);

}


/* ---------- WEBSITE NOTIFICATION ---------- */

function showWebsiteNotification(message) {

    let box =
        document.getElementById(
            "taskNotification"
        );


    if (!box) {
        return;
    }


    box.textContent =
        message;


    box.style.display =
        "block";

}


/* ---------- REQUEST NOTIFICATION PERMISSION ---------- */

function requestNotificationPermission() {

    if (
        "Notification" in window &&
        Notification.permission === "default"
    ) {

        Notification.requestPermission();

    }

}


/* ---------- INITIALIZE ---------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        requestNotificationPermission();


        checkTaskNotifications();


        /*
           Check every minute
           so the remaining time
           stays updated.
        */

        setInterval(
            checkTaskNotifications,
            60000
        );

    }
);