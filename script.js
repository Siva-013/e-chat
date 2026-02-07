const loginBtn = document.getElementById("log1");
const registerBtn = document.getElementById("reg1");
const getstartloginBtn = document.getElementById("logbut");

const loginForm = document.querySelector(".loginform");
const regForm = document.querySelector(".regform");

const rlf = document.querySelector(".reglogform");
const lrf = document.querySelector(".logregform");

// Hide both forms
function hideAllForms() {
    loginForm.style.display = "none";
    regForm.style.display = "none";
}

// LOGIN button
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllForms();
    loginForm.style.display = "flex";
    loginForm.scrollIntoView({ behavior: "smooth" });
});

// GET STARTED → REGISTER
getstartloginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllForms();
    regForm.style.display = "flex";
    regForm.scrollIntoView({ behavior: "smooth" });
});

// REGISTER button
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllForms();
    regForm.style.display = "flex";
    regForm.scrollIntoView({ behavior: "smooth" });
});

// Register → Login
rlf.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllForms();
    loginForm.style.display = "flex";
    loginForm.scrollIntoView({ behavior: "smooth" });
});

// Login → Register
lrf.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllForms();
    regForm.style.display = "flex";
    regForm.scrollIntoView({ behavior: "smooth" });
});

// Click outside to close
loginForm.addEventListener("click", (e) => {
    if (e.target === loginForm) hideAllForms();
});

regForm.addEventListener("click", (e) => {
    if (e.target === regForm) hideAllForms();
});
