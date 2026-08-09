const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");

const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");

const backgroundMusic = document.getElementById("backgroundMusic");

const correctPassword = "081929";


// =========================
// PASSWORD UNLOCK
// =========================

function unlock() {

    if (!passwordInput || !container || !welcomeScreen || !homePage) {
        return;
    }

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


// Attach password events safely

if (unlockButton) {
    unlockButton.addEventListener("click", unlock);
}

if (passwordInput) {
    passwordInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            unlock();
        }
    });
}


// =========================
// QUIZ
// HOW WELL DO YOU KNOW MALAI
// =========================

const quizQuestions =
    document.querySelectorAll(".quiz-question");

const nextButtons =
    document.querySelectorAll(".next-question");

const finishButton =
    document.querySelector(".finish-quiz");

let currentQuestion = 0;


// =========================
// OPTION QUESTIONS
// =========================

document.querySelectorAll(".quiz-option").forEach(function (option) {

    option.addEventListener("click", function () {

        const question =
            option.closest(".quiz-question");

        if (!question) return;


        // Remove previous selection
        question.querySelectorAll(".quiz-option").forEach(function (item) {
            item.classList.remove("selected");
        });


        // Select clicked answer
        option.classList.add("selected");


        // Feedback
        const feedback =
            question.querySelector(".quiz-feedback");

        if (feedback) {

            const isQuestionFive =
                question.dataset.question === "5";


            if (isQuestionFive) {

                feedback.textContent =
                    "Interesting choice... 👀";

            } else {

                const correct =
                    option.dataset.correct === "true";


                if (correct) {

                    feedback.textContent =
                        "Okayyy, you actually know me. 🤍";

                } else {

                    feedback.textContent =
                        "Hmm... we might have to discuss this one. 😭";
                }
            }
        }
    });
});


// =========================
// NEXT BUTTONS
// =========================

nextButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const current =
            quizQuestions[currentQuestion];

        if (!current) return;


        // Check multiple choice question
        const hasOptions =
            current.querySelectorAll(".quiz-option").length > 0;


        if (hasOptions) {

            const hasSelected =
                current.querySelector(".quiz-option.selected");


            if (!hasSelected) {

                const feedback =
                    current.querySelector(".quiz-feedback");

                if (feedback) {

                    feedback.textContent =
                        "You have to choose one first, Humpty. 😭";
                }

                return;
            }
        }


        // Check written answer
        // IMPORTANT: HTML uses .quiz-answer
        const answer =
            current.querySelector(".quiz-answer");


        if (answer) {

            if (answer.value.trim() === "") {

                const feedback =
                    current.querySelector(".quiz-feedback");

                if (feedback) {

                    feedback.textContent =
                        "Excuse me... answer the question. 👀";
                }

                return;
            }
        }


        // Hide current question
        current.classList.remove("active");


        // Move to next question
        currentQuestion++;


        // Show next question
        if (quizQuestions[currentQuestion]) {

            quizQuestions[currentQuestion]
                .classList.add("active");
        }

    });
});


// =========================
// FINISH QUIZ
// =========================

if (finishButton) {

    finishButton.addEventListener("click", function () {

        const current =
            quizQuestions[currentQuestion];

        if (!current) return;


        // HTML uses .quiz-answer
        const answer =
            current.querySelector(".quiz-answer");


        // Make sure final answer isn't empty
        if (answer && answer.value.trim() === "") {

            const feedback =
                current.querySelector(".quiz-feedback");

            if (feedback) {

                feedback.textContent =
                    "You can't escape this one. Answer it. 😭";
            }

            return;
        }


        // Hide final question
        current.classList.remove("active");


        // Show quiz result
        const result =
            document.querySelector(".quiz-result");


        if (result) {

            result.classList.add("show");

        }

    });
}
/* =====================================================
   SCRAPBOOK PAGE FLIP
===================================================== */

const scrapbookPages = document.querySelectorAll(".scrap-page");
const nextPageButton = document.getElementById("nextPage");
const prevPageButton = document.getElementById("prevPage");
const scrapbookCounter = document.getElementById("scrapbookCounter");
const scrapbookDots = document.querySelectorAll(".book-dot");

let currentScrapPage = 0;

function showScrapPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= scrapbookPages.length) {
        index = scrapbookPages.length - 1;
    }

    scrapbookPages.forEach((page, i) => {

        page.classList.toggle(
            "active-page",
            i === index
        );

    });

    scrapbookDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

    scrapbookCounter.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(scrapbookPages.length).padStart(2, "0");

    currentScrapPage = index;

    prevPageButton.disabled = index === 0;
    nextPageButton.disabled =
        index === scrapbookPages.length - 1;
}


nextPageButton.addEventListener("click", () => {

    if (currentScrapPage < scrapbookPages.length - 1) {

        showScrapPage(currentScrapPage + 1);

    }

});


prevPageButton.addEventListener("click", () => {

    if (currentScrapPage > 0) {

        showScrapPage(currentScrapPage - 1);

    }

});


/* dots clickable */

scrapbookDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showScrapPage(index);

    });

});


/* keyboard */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        if (currentScrapPage < scrapbookPages.length - 1) {
            showScrapPage(currentScrapPage + 1);
        }

    }

    if (event.key === "ArrowLeft") {

        if (currentScrapPage > 0) {
            showScrapPage(currentScrapPage - 1);
        }

    }

});


/* =====================================================
   SCRAPBOOK PAGE FLIP
===================================================== */

const scrapbookPages = document.querySelectorAll(".scrap-page");
const nextPageButton = document.getElementById("nextPage");
const prevPageButton = document.getElementById("prevPage");
const scrapbookCounter = document.getElementById("scrapbookCounter");
const scrapbookDots = document.querySelectorAll(".book-dot");

let currentScrapPage = 0;

function showScrapPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= scrapbookPages.length) {
        index = scrapbookPages.length - 1;
    }

    scrapbookPages.forEach((page, i) => {

        page.classList.toggle(
            "active-page",
            i === index
        );

    });

    scrapbookDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

    scrapbookCounter.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(scrapbookPages.length).padStart(2, "0");

    currentScrapPage = index;

    prevPageButton.disabled = index === 0;
    nextPageButton.disabled =
        index === scrapbookPages.length - 1;
}


nextPageButton.addEventListener("click", () => {

    if (currentScrapPage < scrapbookPages.length - 1) {

        showScrapPage(currentScrapPage + 1);

    }

});


prevPageButton.addEventListener("click", () => {

    if (currentScrapPage > 0) {

        showScrapPage(currentScrapPage - 1);

    }

});


/* dots clickable */

scrapbookDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showScrapPage(index);

    });

});


/* keyboard */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        if (currentScrapPage < scrapbookPages.length - 1) {
            showScrapPage(currentScrapPage + 1);
        }

    }

    if (event.key === "ArrowLeft") {

        if (currentScrapPage > 0) {
            showScrapPage(currentScrapPage - 1);
        }

    }

});

/* =====================================================
   SCRAPBOOK PAGE FLIP
===================================================== */

const scrapbookPages = document.querySelectorAll(".scrap-page");
const nextPageButton = document.getElementById("nextPage");
const prevPageButton = document.getElementById("prevPage");
const scrapbookCounter = document.getElementById("scrapbookCounter");
const scrapbookDots = document.querySelectorAll(".book-dot");

let currentScrapPage = 0;

function showScrapPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= scrapbookPages.length) {
        index = scrapbookPages.length - 1;
    }

    scrapbookPages.forEach((page, i) => {

        page.classList.toggle(
            "active-page",
            i === index
        );

    });

    scrapbookDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

    scrapbookCounter.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(scrapbookPages.length).padStart(2, "0");

    currentScrapPage = index;

    prevPageButton.disabled = index === 0;
    nextPageButton.disabled =
        index === scrapbookPages.length - 1;
}


nextPageButton.addEventListener("click", () => {

    if (currentScrapPage < scrapbookPages.length - 1) {

        showScrapPage(currentScrapPage + 1);

    }

});


prevPageButton.addEventListener("click", () => {

    if (currentScrapPage > 0) {

        showScrapPage(currentScrapPage - 1);

    }

});


/* dots clickable */

scrapbookDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showScrapPage(index);

    });

});


/* keyboard */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        if (currentScrapPage < scrapbookPages.length - 1) {
            showScrapPage(currentScrapPage + 1);
        }

    }

    if (event.key === "ArrowLeft") {

        if (currentScrapPage > 0) {
            showScrapPage(currentScrapPage - 1);
        }

    }

});


showScrapPage(0);
