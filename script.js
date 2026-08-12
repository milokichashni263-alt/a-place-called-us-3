document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PASSWORD
    ===================================================== */

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



    /* =====================================================
       SCRAPBOOK
    ===================================================== */

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

        if (!scrapbookPages.length) return;

        if (index < 0) {
            index = 0;
        }

        if (index >= scrapbookPages.length) {
            index = scrapbookPages.length - 1;
        }


        scrapbookPages.forEach(function (page, i) {

            page.classList.toggle(
                "active-page",
                i === index
            );

        });


        if (scrapbookCounter) {

            scrapbookCounter.textContent =
                String(index + 1).padStart(2, "0") +
                " / " +
                String(scrapbookPages.length).padStart(2, "0");

        }


        scrapbookDots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === index
            );

        });


        if (prevPageButton) {
            prevPageButton.disabled = index === 0;
        }

        if (nextPageButton) {
            nextPageButton.disabled =
                index === scrapbookPages.length - 1;
        }


        currentScrapPage = index;
    }


    if (nextPageButton) {

        nextPageButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

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


    if (prevPageButton) {

        prevPageButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (currentScrapPage > 0) {

                    showScrapPage(
                        currentScrapPage - 1
                    );

                }

            }
        );

    }


    scrapbookDots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showScrapPage(index);

            }
        );

    });


    showScrapPage(0);



    /* =====================================================
       QUIZ
    ===================================================== */

    const quizQuestions =
        document.querySelectorAll(".quiz-question");

    const quizOptions =
        document.querySelectorAll(".quiz-option");

    const nextQuestions =
        document.querySelectorAll(".next-question");

    const finishQuiz =
        document.querySelector(".finish-quiz");

    const quizResult =
        document.querySelector(".quiz-result");

    let currentQuestion = 0;


    function showQuestion(index) {

        if (!quizQuestions.length) return;

        quizQuestions.forEach(function (question, i) {

            question.classList.toggle(
                "active",
                i === index
            );

        });

        currentQuestion = index;
    }


    /* OPTIONS */

    quizOptions.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                const question =
                    option.closest(".quiz-question");

                if (!question) return;


                const feedback =
                    question.querySelector(".quiz-feedback");


                const allOptions =
                    question.querySelectorAll(".quiz-option");


                // Stop changing answer after selection
                allOptions.forEach(function (button) {

                    button.disabled = true;

                });


                const answer =
                    option.dataset.correct;


                if (answer === "true") {

                    option.classList.add("correct");

                    if (feedback) {
                        feedback.textContent =
                            "I knew you'd know this one 😭🤍";
                    }

                } else if (answer === "false") {

                    option.classList.add("wrong");

                    if (feedback) {
                        feedback.textContent =
                            "WRONGGG 😭 come here, we need to talk.";
                    }


                    // Show correct answer
                    allOptions.forEach(function (button) {

                        if (
                            button.dataset.correct === "true"
                        ) {

                            button.classList.add("correct");

                        }

                    });

                } else {

                    // For "depends" question

                    option.classList.add("correct");

                    if (feedback) {
                        feedback.textContent =
                            "Honestly... depends on the day 😭";
                    }

                }

            }
        );

    });



    /* NEXT QUESTION */

    nextQuestions.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (
                    currentQuestion <
                    quizQuestions.length - 1
                ) {

                    showQuestion(
                        currentQuestion + 1
                    );

                }

            }
        );

    });



    /* FINISH QUIZ */

    if (finishQuiz) {

        finishQuiz.addEventListener(
            "click",
            function () {

                if (quizQuestions.length) {

                    quizQuestions.forEach(function (question) {

                        question.classList.remove("active");

                    });

                }

                if (quizResult) {

                    quizResult.classList.add("active");

                    quizResult.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            }
        );

    }


    /* Start quiz on Question 1 */

    showQuestion(0);



    /* =====================================================
       OPEN WHEN LETTERS
    ===================================================== */

    const openWhenCards =
        document.querySelectorAll(".open-when-card");

    const openWhenModal =
        document.getElementById("openWhenModal");

    const openWhenTitle =
        document.getElementById("openWhenTitle");

    const openWhenMessage =
        document.getElementById("openWhenMessage");

    const closeOpenWhen =
        document.getElementById("closeOpenWhen");


    openWhenCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                if (!openWhenModal) return;

                const title =
                    card.dataset.title || "Open when...";

                const message =
                    card.dataset.message || "";


                if (openWhenTitle) {
                    openWhenTitle.textContent = title;
                }

                if (openWhenMessage) {
                    openWhenMessage.textContent = message;
                }


                openWhenModal.classList.add("show");

            }
        );

    });


    if (closeOpenWhen) {

        closeOpenWhen.addEventListener(
            "click",
            function () {

                if (openWhenModal) {
                    openWhenModal.classList.remove("show");
                }

            }
        );

    }


    if (openWhenModal) {

        openWhenModal.addEventListener(
            "click",
            function (event) {

                if (event.target === openWhenModal) {

                    openWhenModal.classList.remove("show");

                }

            }
        );

    }



    /* =====================================================
       SPOTIFY / BACKGROUND MUSIC
    ===================================================== */

    const spotifyButton =
        document.querySelector(".spotify-button");


    if (spotifyButton) {

        spotifyButton.addEventListener(
            "click",
            function () {

                if (backgroundMusic) {

                    backgroundMusic.pause();

                }

            }
        );

    }



    /* =====================================================
       KEYBOARD SCRAPBOOK CONTROLS
    ===================================================== */

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

});
