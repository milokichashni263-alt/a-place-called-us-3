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
        console.error("Password elements not found.");
        return;
    }

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === correctPassword) {

        // Hide password page
        container.style.display = "none";

        // Show welcome screen
        welcomeScreen.classList.add("show");

        // Start music
        if (backgroundMusic) {
            backgroundMusic.currentTime = 0;

            backgroundMusic.play().catch(function (error) {
                console.log("Music autoplay blocked:", error);
            });
        }

        // Open home page after welcome message
        setTimeout(function () {

            welcomeScreen.classList.remove("show");
            homePage.classList.add("show");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 2500);

    } else {

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

        passwordInput.value = "";
        passwordInput.placeholder = "Wrong password ♡ Try again";

        setTimeout(function () {
            passwordInput.placeholder = "Our little secret...";
        }, 2000);
    }
}


// =========================
// PASSWORD EVENTS
// =========================

if (unlockButton) {
    unlockButton.addEventListener("click", unlock);
}

if (passwordInput) {
    passwordInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            unlock();
        }

    });
}


// =========================
// QUIZ
// =========================

const quizQuestions = document.querySelectorAll(".quiz-question");
const nextButtons = document.querySelectorAll(".next-question");
const finishButton = document.querySelector(".finish-quiz");

let currentQuestion = 0;


// =========================
// QUIZ OPTIONS
// =========================

document.querySelectorAll(".quiz-option").forEach(function (option) {

    option.addEventListener("click", function () {

        const question = option.closest(".quiz-question");

        if (!question) {
            return;
        }

        question.querySelectorAll(".quiz-option").forEach(function (item) {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        const feedback = question.querySelector(".quiz-feedback");

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
// NEXT QUESTION
// =========================

nextButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const current =
            quizQuestions[currentQuestion];

        if (!current) {
            return;
        }

        // Check multiple choice question
        const hasOptions =
            current.querySelectorAll(".quiz-option").length > 0;

        if (hasOptions) {

            const selected =
                current.querySelector(".quiz-option.selected");

            if (!selected) {

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
        const answer =
            current.querySelector(".quiz-answer");

        if (answer && answer.value.trim() === "") {

            const feedback =
                current.querySelector(".quiz-feedback");

            if (feedback) {
                feedback.textContent =
                    "Excuse me... answer the question. 👀";
            }

            return;
        }

        // Hide current question
        current.classList.remove("active");

        // Move forward
        currentQuestion++;

        // Show next question
        if (quizQuestions[currentQuestion]) {

            quizQuestions[currentQuestion].classList.add("active");

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

        if (!current) {
            return;
        }

        const answer =
            current.querySelector(".quiz-answer");

        if (answer && answer.value.trim() === "") {

            const feedback =
                current.querySelector(".quiz-feedback");

            if (feedback) {
                feedback.textContent =
                    "You can't escape this one. Answer it. 😭";
            }

            return;
        }

        current.classList.remove("active");

        const result =
            document.querySelector(".quiz-result");

        if (result) {
            result.classList.add("show");
        }

    });

}


// =====================================================
// SCRAPBOOK
// =====================================================

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


// =========================
// SHOW SCRAPBOOK PAGE
// =========================

function showScrapPage(index) {

    if (scrapbookPages.length === 0) {
        return;
    }

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

    scrapbookDots.forEach(function (dot, i) {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

    if (scrapbookCounter) {

        scrapbookCounter.textContent =
            String(index + 1).padStart(2, "0") +
            " / " +
            String(scrapbookPages.length).padStart(2, "0");

    }

    currentScrapPage = index;

    if (prevPageButton) {
        prevPageButton.disabled = index === 0;
    }

    if (nextPageButton) {
        nextPageButton.disabled =
            index === scrapbookPages.length - 1;
    }
}


// =========================
// NEXT PAGE
// =========================

if (nextPageButton) {

    nextPageButton.addEventListener("click", function () {

        if (
            currentScrapPage <
            scrapbookPages.length - 1
        ) {

            showScrapPage(currentScrapPage + 1);

        }

    });

}


// =========================
// PREVIOUS PAGE
// =========================

if (prevPageButton) {

    prevPageButton.addEventListener("click", function () {

        if (currentScrapPage > 0) {

            showScrapPage(currentScrapPage - 1);

        }

    });

}


// =========================
// SCRAPBOOK DOTS
// =========================

scrapbookDots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        showScrapPage(index);

    });

});


// =========================
// KEYBOARD CONTROLS
// =========================

document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowRight") {

        if (
            currentScrapPage <
            scrapbookPages.length - 1
        ) {

            showScrapPage(currentScrapPage + 1);

        }

    }

    if (event.key === "ArrowLeft") {

        if (currentScrapPage > 0) {

            showScrapPage(currentScrapPage - 1);

        }

    }

});


// =========================
// START SCRAPBOOK
// =========================

showScrapPage(0);

// Stop background music when the Spotify playlist is opened
document.querySelectorAll(".spotify-button").forEach(button => {
    button.addEventListener("click", function () {
        const music = document.getElementById("backgroundMusic");

        if (music) {
            music.pause();
            music.currentTime = 0;
        }
    });
});

// ========================================
// OPEN WHEN LETTERS
// ========================================

const openWhenCards = document.querySelectorAll(".open-when-card");
const openWhenModal = document.getElementById("openWhenModal");
const openWhenTitle = document.getElementById("openWhenTitle");
const openWhenMessage = document.getElementById("openWhenMessage");
const closeOpenWhen = document.getElementById("closeOpenWhen");

openWhenCards.forEach(card => {

    card.addEventListener("click", () => {

        openWhenTitle.textContent = card.dataset.title;
        openWhenMessage.textContent = card.dataset.message;

        openWhenModal.classList.add("show");

    });

});


closeOpenWhen.addEventListener("click", () => {
    openWhenModal.classList.remove("show");
});


openWhenModal.addEventListener("click", (e) => {

    if (e.target === openWhenModal) {
        openWhenModal.classList.remove("show");
    }

});
