const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");

const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");

const correctPassword = "081929";

function unlock() {

    const password = passwordInput.value.trim();

    if (password === correctPassword) {

        container.style.display = "none";

        welcomeScreen.classList.add("show");

        setTimeout(function () {

            welcomeScreen.classList.remove("show");
            homePage.classList.add("show");

            window.scrollTo(0, 0);

        }, 2500);

    } else {

        passwordInput.value = "";
        passwordInput.placeholder = "Wrong password ♡ Try again";

        setTimeout(function () {
            passwordInput.placeholder = "Our little secret...";
        }, 2000);

    }
}

unlockButton.addEventListener("click", unlock);

passwordInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        unlock();
    }

});
