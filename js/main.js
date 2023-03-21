// signip html element
let upName = document.getElementById("upName");
let upEmail = document.getElementById("upEmail");
let upPassword = document.getElementById("upPassword");
let signUpBtm = document.getElementById("signUpBtm");
let sucSpan = document.getElementById("suc-span");
let ValidNameUp = document.getElementById("ValidNameUp");
let ValidEmailUp = document.getElementById("ValidEmailUp");
let ValidpassUp = document.getElementById("ValidpassUp");


// login html element
let logEmail = document.getElementById("logEmail");
let logPass = document.getElementById("logPass");
let loging = document.getElementById("loging");
let inputRequried = document.getElementById("inputRequried");
let validRequried = document.getElementById("validRequried");

// array of signup
let userDAta = [];
if (localStorage.getItem("userData") != null) {
    userDAta = JSON.parse(localStorage.getItem("userData"));
}

// Get user info when sign up
function saveDate() {
    if (
        validSignUpName() == true &&
        validSignUpEmail() == true &&
        validSignUpPass() == true
    ) {
        if (sameEmail() == true) {
            let user = {
                name: upName.value,
                email: upEmail.value,
                pass: upPassword.value,
            };
            userDAta.push(user);
            localStorage.setItem("userData", JSON.stringify(userDAta));
            sucSpan.classList.replace("d-none", "d-block");
            console.log(userDAta);
            clearForm();
        }
    }
}

// same email

function sameEmail() {
    let result = userDAta.find((el) => {
        return el.email.toLowerCase() == upEmail.value.toLowerCase();
    });
    if (result == undefined) {
        document
            .getElementById("exit-span")
            .classList.replace("d-block", "d-none");

        return true;
    } else {
        document
            .getElementById("exit-span")
            .classList.replace("d-none", "d-block");
        sucSpan.classList.replace("d-block", "d-none");
        return false;
    }
}

// clear data of signUp form
function clearForm() {
    upName.value = "";
    upEmail.value = "";
    upPassword.value = "";
}

// call function when sign up
if (signUpBtm != null) {
    signUpBtm.addEventListener("click", saveDate);
}

// validation of name input
if (upName != null) {
    upName.addEventListener("blur", validSignUpName);
}

function validSignUpName() {
    let reg = /^[A-z][a-z]{2,10}( )?([A-z][a-z]{2,10})?$/;

    if (reg.test(upName.value) == true) {
        ValidNameUp.classList.replace("d-block", "d-none");
        upName.classList.add("is-valid");
        upName.classList.remove("is-invalid");
        return true;
    } else {
        ValidNameUp.classList.replace("d-none", "d-block");
        upName.classList.add("is-invalid");
        upName.classList.remove("is-valid");

        return false;
    }
}

// validation of email input
if (upEmail != null) {
    upEmail.addEventListener("blur", validSignUpEmail);
}
function validSignUpEmail() {
    let reg = /^[a-z]{3,10}@[a-z]{2,10}\.[a-z]{2,4}$/;

    if (reg.test(upEmail.value) == true) {
        ValidEmailUp.classList.replace("d-block", "d-none");
        upEmail.classList.add("is-valid");
        upEmail.classList.remove("is-invalid");

        return true;
    } else {
        ValidEmailUp.classList.replace("d-none", "d-block");
        upEmail.classList.add("is-invalid");
        upEmail.classList.remove("is-valid");
        return false;
    }
}
// validation of password` input
if (upPassword != null) {
    upPassword.addEventListener("blur", validSignUpPass);
}

function validSignUpPass() {
    let reg = /^@?#?\w{3,9}@?#?$/;

    if (reg.test(upPassword.value) == true) {
        ValidpassUp.classList.replace("d-block", "d-none");
        upPassword.classList.add("is-valid");
        upPassword.classList.remove("is-invalid");

        return true;
    } else {
        ValidpassUp.classList.replace("d-none", "d-block");
        upPassword.classList.add("is-invalid");
        upPassword.classList.remove("is-valid");
        return false;
    }
}

// start login

if (logEmail != null) {
    loging.addEventListener("click", function () {
        if (logEmailValidate() == false) {
            validRequried.classList.replace("d-none", "d-block");
            inputRequried.classList.replace("d-block", "d-none");
            userDAta.forEach((element) => {
                if (
                    element.email.toLowerCase() ==
                        logEmail.value.toLowerCase() &&
                    element.pass == logPass.value
                ) {
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(element.name)
                    );
                    validRequried.classList.replace("d-block", "d-none");
                    window.location.href = "home.html";
                    return true;
                } else {
                    validRequried.classList.replace("d-none", "d-block");
                }
            });
            // }
        }
    });
}

function logEmailValidate() {
    if (logEmail.value == "" && logPass.value == "") {
        inputRequried.classList.replace("d-none", "d-block");
        return true;
    } else {
        return false;
    }
}

// home page
let welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser != null) {
    var username = JSON.parse(localStorage.getItem("currentUser"));
    welcomeUser.innerHTML = `Welcome ${username}`;
}
