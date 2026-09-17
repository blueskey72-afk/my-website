/* =========================================
   LOGIN SYSTEM
========================================= */


/* ---------- TEACHER LOGIN ---------- */

function teacherLogin() {

    const userId =
        document.getElementById("teacherUserId").value.trim();

    const password =
        document.getElementById("teacherPassword").value.trim();

    const message =
        document.getElementById("loginMessage");


    /*
       अभी demo login details रखी गई हैं।

       Teacher ID:
       teacher

       Password:
       teacher123
    */

    if (
        userId === "teacher" &&
        password === "teacher123"
    ) {

        localStorage.setItem(
            "loggedInUser",
            "teacher"
        );


        window.location.href =
            "teacher-dashboard.html";

        return;
    }


    if (message) {

        message.textContent =
            "Invalid Teacher ID or Password.";

        message.style.color =
            "#dc2626";
    }

}


/* ---------- STUDENT LOGIN ---------- */

function studentLogin() {

    const userId =
        document.getElementById("studentUserId").value.trim();

    const password =
        document.getElementById("studentPassword").value.trim();

    const message =
        document.getElementById("loginMessage");


    /*
       Demo Student Login:

       Student ID:
       student

       Password:
       student123
    */

    if (
        userId === "student" &&
        password === "student123"
    ) {

        localStorage.setItem(
            "loggedInUser",
            "student"
        );


        window.location.href =
            "student-dashboard.html";

        return;
    }


    if (message) {

        message.textContent =
            "Invalid Student ID or Password.";

        message.style.color =
            "#dc2626";
    }

}


/* ---------- LOGOUT ---------- */

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );


    window.location.href =
        "../index.html";

}


/* ---------- CHECK LOGIN ---------- */

function checkLogin(requiredUser) {

    const loggedInUser =
        localStorage.getItem("loggedInUser");


    if (
        loggedInUser !== requiredUser
    ) {

        window.location.href =
            "../index.html";

        return false;
    }


    return true;

}