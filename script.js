
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

// =====================================================
// SCRAPBOOK PAGE FLIP
// =====================================================

const scrapbookPages = document.querySelectorAll(".scrap-page");
const nextPageButton = document.getElementById("nextPage");
const prevPageButton = document.getElementById("prevPage");
const scrapbookCounter = document.getElementById("scrapbookCounter");
const scrapbookDots = document.querySelectorAll(".book-dot");

let currentScrapPage = 0;


// =========================
// SHOW SCRAPBOOK PAGE
// =========================

function showScrapPage(index) {

    if (!scrapbookPages.length) {
        console.log("No scrapbook pages found.");
        return;
    }

    // Keep index within limits
    if (index < 0) {
        index = 0;
    }

    if (index >= scrapbookPages.length) {
        index = scrapbookPages.length - 1;
    }


    // Hide/show pages
    scrapbookPages.forEach(function (page, i) {

        if (i === index) {
            page.classList.add("active-page");
        } else {
            page.classList.remove("active-page");
        }

    });


    // Update dots
    scrapbookDots.forEach(function (dot, i) {

        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }

    });


    // Update counter
    if (scrapbookCounter) {

        scrapbookCounter.textContent =
            String(index + 1).padStart(2, "0") +
            " / " +
            String(scrapbookPages.length).padStart(2, "0");

    }


    currentScrapPage = index;


    // Previous button
    if (prevPageButton) {
        prevPageButton.disabled = index === 0;
    }


    // Next button
    if (nextPageButton) {
        nextPageButton.disabled =
            index === scrapbookPages.length - 1;
    }

}


// =========================
// NEXT PAGE
// =========================

if (nextPageButton) {

    nextPageButton.addEventListener("click", function (event) {

        event.preventDefault();

        if (
            currentScrapPage <
            scrapbookPages.length - 1
        ) {

            showScrapPage(
                currentScrapPage + 1
            );

        }

    });

}


// =========================
// PREVIOUS PAGE
// =========================

if (prevPageButton) {

    prevPageButton.addEventListener("click", function (event) {

        event.preventDefault();

        if (currentScrapPage > 0) {

            showScrapPage(
                currentScrapPage - 1
            );

        }

    });

}


// =========================
// SCRAPBOOK DOTS
// =========================

scrapbookDots.forEach(function (dot, index) {

    dot.addEventListener("click", function (event) {

        event.preventDefault();

        showScrapPage(index);

    });

});


// =========================
// KEYBOARD CONTROLS
// =========================

document.addEventListener("keydown", function (event) {

    // Don't interfere while typing
    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) {
        return;
    }


    if (event.key === "ArrowRight") {

        if (
            currentScrapPage <
            scrapbookPages.length - 1
        ) {

            showScrapPage(
                currentScrapPage + 1
            );

        }

    }


    if (event.key === "ArrowLeft") {

        if (currentScrapPage > 0) {

            showScrapPage(
                currentScrapPage - 1
            );

        }

    }

});


// =========================
// START AT PAGE 1
// =========================

showScrapPage(0);
