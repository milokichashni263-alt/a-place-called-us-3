const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");

const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");

const correctPassword = "081929";

function unlock() {

    if (passwordInput.value === correctPassword) {

        // Hide password page
        container.style.display = "none";

        // Show welcome screen
        welcomeScreen.classList.add("show");

        // After welcome animation, show home
        setTimeout(function () {

            welcomeScreen.classList.remove("show");

            homePage.classList.add("show");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 2500);

    } else {

        passwordInput.value = "";

        passwordInput.placeholder = "Wrong password ♡ Try again";

        passwordInput.animate(
            [
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 350
            }
        );

        setTimeout(function () {
            passwordInput.placeholder = "Our little secret...";
        }, 2000);
    }
}


// Unlock button
unlockButton.addEventListener("click", unlock);


// Press Enter to unlock
passwordInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        unlock();
    }

});
