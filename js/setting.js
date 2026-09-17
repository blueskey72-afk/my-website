/* =========================================
   SETTINGS
========================================= */


/* ---------- DEFAULT SETTINGS ---------- */

const defaultSettings = {

    taskReminder: true,

    reminderTime: 10,

    missedTaskNotification: true,

    darkMode: false

};


/* ---------- GET SETTINGS ---------- */

function getSettings() {

    const savedSettings =
        localStorage.getItem("settings");


    if (!savedSettings) {

        return {
            ...defaultSettings
        };

    }


    try {

        return {
            ...defaultSettings,
            ...JSON.parse(savedSettings)
        };

    } catch (error) {

        return {
            ...defaultSettings
        };

    }

}


/* ---------- SAVE SETTINGS ---------- */

function saveSettings() {

    const taskReminder =
        document.getElementById("taskReminder");

    const reminderTime =
        document.getElementById("reminderTime");

    const missedTaskNotification =
        document.getElementById(
            "missedTaskNotification"
        );

    const darkMode =
        document.getElementById("darkMode");


    const settings = {

        taskReminder:
            taskReminder
                ? taskReminder.checked
                : true,

        reminderTime:
            reminderTime
                ? Number(reminderTime.value)
                : 10,

        missedTaskNotification:
            missedTaskNotification
                ? missedTaskNotification.checked
                : true,

        darkMode:
            darkMode
                ? darkMode.checked
                : false

    };


    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );


    applyDarkMode(settings.darkMode);


    const message =
        document.getElementById(
            "settingsMessage"
        );


    if (message) {

        message.textContent =
            "Settings saved successfully!";

        message.style.color =
            "#15803d";

    }

}


/* ---------- LOAD SETTINGS ---------- */

function loadSettings() {

    const settings =
        getSettings();


    const taskReminder =
        document.getElementById("taskReminder");

    const reminderTime =
        document.getElementById("reminderTime");

    const missedTaskNotification =
        document.getElementById(
            "missedTaskNotification"
        );

    const darkMode =
        document.getElementById("darkMode");


    if (taskReminder) {

        taskReminder.checked =
            settings.taskReminder;

    }


    if (reminderTime) {

        reminderTime.value =
            settings.reminderTime;

    }


    if (missedTaskNotification) {

        missedTaskNotification.checked =
            settings.missedTaskNotification;

    }


    if (darkMode) {

        darkMode.checked =
            settings.darkMode;

    }


    applyDarkMode(settings.darkMode);

}


/* ---------- DARK MODE ---------- */

function applyDarkMode(enabled) {

    if (enabled) {

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

    }

}


/* ---------- DARK MODE TOGGLE ---------- */

function handleDarkModeChange() {

    const darkMode =
        document.getElementById("darkMode");


    if (!darkMode) {
        return;
    }


    applyDarkMode(
        darkMode.checked
    );

}


/* ---------- INITIALIZE ---------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadSettings();


        const darkMode =
            document.getElementById("darkMode");


        if (darkMode) {

            darkMode.addEventListener(
                "change",
                handleDarkModeChange
            );

        }

    }
);