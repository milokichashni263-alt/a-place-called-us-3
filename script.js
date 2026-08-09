const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");

const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const correctPassword = "081929";



/* =========================
   UNLOCK BUTTON
========================= */

unlockButton.addEventListener("click", unlock);



/* =========================
   ENTER KEY
========================= */

passwordInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        unlock();
    }

});



/* =========================
   UNLOCK FUNCTION
========================= */

function unlock() {

    if (passwordInput.value === correctPassword) {

        /* Hide password page */

        container.style.display = "none";


        /* Show welcome screen */

        welcomeScreen.classList.add("show");


        /*
            Start music immediately after
            the user's button click.

            Because this function is triggered
            by the user's click, browsers are
            more likely to allow the audio.
        */

        if (backgroundMusic) {

            backgroundMusic.volume = 0.55;

            backgroundMusic.play()
                .then(function () {

                    updateMusicButton(true);

                })
                .catch(function (error) {

                    console.log("Music could not autoplay:", error);

                });

        }


        /* Move to home page */

        setTimeout(function () {

            welcomeScreen.classList.remove("show");

            homePage.classList.add("show");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

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
   MUSIC BUTTON
========================= */

if (musicButton) {

    musicButton.addEventListener("click", function () {

        if (!backgroundMusic) return;


        if (backgroundMusic.paused) {

            backgroundMusic.play()
                .then(function () {

                    updateMusicButton(true);

                })
                .catch(function (error) {

                    console.log("Music could not play:", error);

                });

        }

        else {

            backgroundMusic.pause();

            updateMusicButton(false);

        }

    });

}



/* =========================
   MUSIC BUTTON TEXT
========================= */

function updateMusicButton(isPlaying) {

    if (!musicButton) return;


    if (isPlaying) {

        musicButton.textContent = "❚❚ Pause our song";

        musicButton.classList.add("playing");

    }

    else {

        musicButton.textContent = "♫ Play our song";

        musicButton.classList.remove("playing");

    }

}



/* =========================
   MUSIC STATE
========================= */

if (backgroundMusic) {

    backgroundMusic.addEventListener("play", function () {

        updateMusicButton(true);

    });


    backgroundMusic.addEventListener("pause", function () {

        updateMusicButton(false);

    });

}
