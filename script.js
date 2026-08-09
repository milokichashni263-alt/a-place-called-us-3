const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");

const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");

const backgroundMusic = document.getElementById("backgroundMusic");

const correctPassword = "081929";

unlockButton.addEventListener("click", unlock);

passwordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        unlock();
    }
});

function unlock() {

    if (passwordInput.value === correctPassword) {

        // Hide password page
        container.style.display = "none";

        // Show welcome screen
        welcomeScreen.classList.add("show");

        // Start background music
        if (backgroundMusic) {
            backgroundMusic.play().catch(function () {
                console.log("Music could not autoplay.");
            });
        }

        // Move to home page after welcome screen
        setTimeout(function () {

            welcomeScreen.classList.remove("show");

            homePage.classList.add("show");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 2500);

    } else {

        // Shake input
        passwordInput.animate(
            [
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(0px)" }
            ],
            {
                duration: 350
            }
        );

        passwordInput.value = "";
        passwordInput.placeholder = "Wrong password ♡ Try again";

        setTimeout(function () {
            passwordInput.placeholder = "Our little secret...";
        }, 2000);
    }
}
