document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PASSWORD
    ========================= */

    const passwordInput = document.getElementById("password");
    const unlockButton = document.getElementById("unlockButton");

    const container = document.querySelector(".container");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const homePage = document.getElementById("homePage");

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    const correctPassword = "081929";


    function unlock() {

        if (!passwordInput) return;

        if (passwordInput.value.trim() === correctPassword) {

            if (container) {
                container.style.display = "none";
            }

            if (welcomeScreen) {
                welcomeScreen.classList.add("show");
            }

            if (backgroundMusic) {
                backgroundMusic.play().catch(function () {});
            }

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


    if (unlockButton) {
        unlockButton.addEventListener("click", unlock);
    }


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



   // =====================================================
// SCRAPBOOK PAGE FLIP
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const scrapbookPages =
        document.querySelectorAll(".scrap-page");

    const nextPageButton =
        document.getElementById("nextPage");

    const prevPageButton =
        document.getElementById("prevPage");

    const scrapbookCounter =
        document.getElementById("scrapbookCounter");

    const scrapbookDots =
        document.querySelectorAll(".book-dot");

    let currentScrapPage = 0;


    function showScrapPage(index) {

        if (!scrapbookPages.length) {
            console.log("No scrapbook pages found.");
            return;
        }

        // Keep page number within limits
        if (index < 0) {
            index = 0;
        }

        if (index >= scrapbookPages.length) {
            index = scrapbookPages.length - 1;
        }


        // Show only selected page
        scrapbookPages.forEach(function (page, i) {

            if (i === index) {
                page.classList.add("active-page");
            } else {
                page.classList.remove("active-page");
            }

        });


        // Update counter
        if (scrapbookCounter) {

            scrapbookCounter.textContent =
                String(index + 1).padStart(2, "0") +
                " / " +
                String(scrapbookPages.length).padStart(2, "0");

        }


        // Update dots
        scrapbookDots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === index
            );

        });


        // Disable arrows at beginning/end
        if (prevPageButton) {
            prevPageButton.disabled = index === 0;
        }

        if (nextPageButton) {
            nextPageButton.disabled =
                index === scrapbookPages.length - 1;
        }


        currentScrapPage = index;

    }


    // =========================
    // NEXT
    // =========================

    if (nextPageButton) {

        nextPageButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    currentScrapPage <
                    scrapbookPages.length - 1
                ) {

                    showScrapPage(
                        currentScrapPage + 1
                    );

                }

            }
        );

    }


    // =========================
    // PREVIOUS
    // =========================

    if (prevPageButton) {

        prevPageButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (currentScrapPage > 0) {

                    showScrapPage(
                        currentScrapPage - 1
                    );

                }

            }
        );

    }


    // =========================
    // DOTS
    // =========================

    scrapbookDots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showScrapPage(index);

            }
        );

    });


    // =========================
    // KEYBOARD
    // =========================

    document.addEventListener(
        "keydown",
        function (event) {

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

        }
    );


    // =========================
    // INITIAL PAGE
    // =========================

    showScrapPage(0);

});
