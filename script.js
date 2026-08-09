```javascript
const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");

const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");
const backgroundMusic = document.getElementById("backgroundMusic");


const correctPassword = "081929";

function unlock() {
    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === correctPassword) {

        container.style.display = "none";

        welcomeScreen.classList.add("show");

        if (backgroundMusic) {
            backgroundMusic.play().catch(function(error) {
                console.log("Music:", error);
            });
        }

        setTimeout(function() {
            welcomeScreen.classList.remove("show");
            homePage.classList.add("show");
        }, 2500);

    } else {

        passwordInput.value = "";
        passwordInput.placeholder = "Wrong password ♡ Try again";

        setTimeout(function() {
            passwordInput.placeholder = "Our little secret...";
        }, 2000);
    }
}

unlockButton.addEventListener("click", unlock);

passwordInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        unlock();
    }
});
```
