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



    /* =========================
       SCRAPBOOK
    ========================= */

    const pages =
        document.querySelectorAll(".scrap-page");

    const nextButton =
        document.getElementById("nextPage");

    const prevButton =
        document.getElementById("prevPage");

    const counter =
        document.getElementById("scrapbookCounter");

    const dots =
        document.querySelectorAll(".book-dot");

    let currentPage = 0;


    function showPage(index) {

        if (!pages.length) {
            console.log("Scrapbook pages not found.");
            return;
        }

        if (index < 0) {
            index = 0;
        }

        if (index >= pages.length) {
            index = pages.length - 1;
        }


        pages.forEach(function (page, i) {

            page.classList.remove("active-page");

            if (i === index) {
                page.classList.add("active-page");
            }

        });


        dots.forEach(function (dot, i) {

            dot.classList.remove("active");

            if (i === index) {
                dot.classList.add("active");
            }

        });


        currentPage = index;


        if (counter) {

            counter.textContent =
                String(index + 1).padStart(2, "0") +
                " / " +
                String(pages.length).padStart(2, "0");

        }


        if (prevButton) {
            prevButton.disabled = index === 0;
        }

        if (nextButton) {
            nextButton.disabled =
                index === pages.length - 1;
        }

    }


    /* NEXT */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showPage(currentPage + 1);

            }
        );

    }


    /* PREVIOUS */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showPage(currentPage - 1);

            }
        );

    }


    /* DOTS */

    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showPage(index);

            }
        );

    });


    /* KEYBOARD */

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
                showPage(currentPage + 1);
            }


            if (event.key === "ArrowLeft") {
                showPage(currentPage - 1);
            }

        }
    );


    /* START */

    showPage(0);

});
