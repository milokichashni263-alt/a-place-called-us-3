
document.addEventListener("DOMContentLoaded", function () {

    const passwordInput = document.getElementById("password");
    const unlockButton = document.getElementById("unlockButton");

    const container = document.querySelector(".container");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const homePage = document.getElementById("homePage");

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    const correctPassword = "081929";


    // =========================
    // PASSWORD UNLOCK
    // =========================

    function unlock() {

        if (!passwordInput) {
            console.error("Password input not found");
            return;
        }

        if (passwordInput.value.trim() === correctPassword) {

            // Hide password page
            if (container) {
                container.style.display = "none";
            }

            // Show welcome
            if (welcomeScreen) {
                welcomeScreen.classList.add("show");
            }

            // Start music
            if (backgroundMusic) {
                backgroundMusic.play().catch(function () {
                    console.log("Music autoplay was blocked.");
                });
            }

            // Open website
            setTimeout(function () {

                if (welcomeScreen) {
                    welcomeScreen.classList.remove("show");
                }

                if (homePage) {
                    homePage.classList.add("show");
                }

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 2500);

        } else {

            // Wrong password
            passwordInput.value = "";

            passwordInput.placeholder =
                "Wrong password ♡ Try again";

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

                passwordInput.placeholder =
                    "Our little secret...";

            }, 2000);

        }

    }


    // =========================
    // UNLOCK BUTTON
    // =========================

    if (unlockButton) {

        unlockButton.addEventListener(
            "click",
            unlock
        );

    }


    // =========================
    // ENTER KEY
    // =========================

    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    unlock();

                }

            }
        );

    }


});
