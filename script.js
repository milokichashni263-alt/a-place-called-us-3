const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");

const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");

const correctPassword = "081929";


/* =========================
   PASSWORD UNLOCK
========================= */

unlockButton.addEventListener("click", unlock);


passwordInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        unlock();
    }

});


function unlock() {

    if (passwordInput.value === correctPassword) {

        /* Hide password page */

        container.style.display = "none";


        /* Start music */

        backgroundMusic.volume = 0.35;

        backgroundMusic.play()
            .then(function () {

                if (musicButton) {
                    musicButton.textContent = "Ⅱ Pause Our Song";
                }

                if (musicStatus) {
                    musicStatus.textContent = "playing softly for us ♡";
                }

            })
            .catch(function () {

                /*
                    If browser blocks autoplay,
                    the playlist button can still start it.
                */

                if (musicStatus) {
                    musicStatus.textContent = "press play when you're ready ♡";
                }

            });


        /* Show welcome screen */

        welcomeScreen.classList.add("show");


        /* Move to home page */

        setTimeout(function () {

            welcomeScreen.classList.remove("show");

            homePage.classList.add("show");

        }, 2500);


    }

    else {

        /* Wrong password animation */

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
        passwordInput.placeholder = "Wrong password ♡";

    }

}


/* =========================
   PLAY / PAUSE MUSIC
========================= */

if (musicButton) {

    musicButton.addEventListener("click", function () {

        if (backgroundMusic.paused) {

            backgroundMusic.play()
                .then(function () {

                    musicButton.textContent = "Ⅱ Pause Our Song";

                    if (musicStatus) {
                        musicStatus.textContent = "playing softly for us ♡";
                    }

                })
                .catch(function () {

                    if (musicStatus) {
                        musicStatus.textContent =
                            "Couldn't play the song — check the file name ♡";
                    }

                });

        }

        else {

            backgroundMusic.pause();

            musicButton.textContent = "♫ Play Our Song";

            if (musicStatus) {
                musicStatus.textContent = "paused for now ♡";
            }

        }

    });

}


/* =========================
   UPDATE BUTTON WHEN SONG ENDS
========================= */

backgroundMusic.addEventListener("pause", function () {

    if (
        backgroundMusic.currentTime > 0 &&
        !backgroundMusic.ended &&
        musicButton
    ) {

        musicButton.textContent = "♫ Play Our Song";

    }

});


backgroundMusic.addEventListener("play", function () {

    if (musicButton) {
        musicButton.textContent = "Ⅱ Pause Our Song";
    }

});
