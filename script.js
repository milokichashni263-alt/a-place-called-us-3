document.addEventListener("DOMContentLoaded", function () {

    const passwordInput = document.getElementById("password");
    const unlockButton = document.getElementById("unlockButton");

    const container = document.querySelector(".container");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const homePage = document.getElementById("homePage");

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    const correctPassword = "081929";


    function unlock() {

        if (!passwordInput) {
            console.error("Password input not found");
            return;
        }

        if (passwordInput.value.trim() !== correctPassword) {

            passwordInput.value = "";
            passwordInput.placeholder =
                "Wrong password ♡ Try again";

            setTimeout(function () {
                passwordInput.placeholder =
                    "Our little secret...";
            }, 2000);

            return;
        }


        /* PASSWORD PAGE OFF */

        if (container) {
            container.style.display = "none";
        }


        /* WELCOME SCREEN ON */

        if (welcomeScreen) {
            welcomeScreen.classList.add("show");
        }


        /* MUSIC */

        if (backgroundMusic) {
            backgroundMusic.play().catch(function () {
                console.log("Music needs user interaction.");
            });
        }


        /* HOME PAGE */

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

    }


    /* BUTTON */

    if (unlockButton) {
        unlockButton.addEventListener("click", unlock);
    }


    /* ENTER KEY */

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
