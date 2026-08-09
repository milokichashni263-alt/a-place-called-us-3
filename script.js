```javascript
const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");
const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");
const backgroundMusic = document.getElementById("backgroundMusic");

const correctPassword = "081929";


// =========================
// PASSWORD + MUSIC
// =========================

function unlock() {

    if (passwordInput.value.trim() === correctPassword) {

        container.style.display = "none";

        welcomeScreen.classList.add("show");

        if (backgroundMusic) {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play().catch(function(error) {
                console.log("Music error:", error);
            });
        }

        setTimeout(function() {

            welcomeScreen.classList.remove("show");
            homePage.classList.add("show");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

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


// =========================
// QUIZ
// =========================

const quizQuestions =
    document.querySelectorAll(".quiz-question");

const nextButtons =
    document.querySelectorAll(".next-question");

const finishButton =
    document.querySelector(".finish-quiz");

let currentQuestion = 0;


// Quiz options
document.querySelectorAll(".quiz-option").forEach(function(option) {

    option.addEventListener("click", function() {

        const question =
            option.closest(".quiz-question");

        if (!question) return;

        question.querySelectorAll(".quiz-option").forEach(function(item) {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        const feedback =
            question.querySelector(".quiz-feedback");

        if (feedback) {

            if (question.dataset.question === "5") {

                feedback.textContent =
                    "Interesting choice... 👀";

            } else {

                if (option.dataset.correct === "true") {

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


// Next question
nextButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const current =
            quizQuestions[currentQuestion];

        if (!current) return;


        const options =
            current.querySelectorAll(".quiz-option");

        if (options.length > 0) {

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


        current.classList.remove("active");

        currentQuestion++;

        if (quizQuestions[currentQuestion]) {
            quizQuestions[currentQuestion].classList.add("active");
        }

    });

});


// Finish quiz
if (finishButton) {

    finishButton.addEventListener("click", function() {

        const current =
            quizQuestions[currentQuestion];

        if (!current) return;

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


// =========================
// SCRAPBOOK
// =========================

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


    scrapbookPages.forEach(function(page, i) {

        page.classList.toggle(
            "active-page",
            i === index
        );

    });


    scrapbookDots.forEach(function(dot, i) {

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


// Scrapbook buttons
if (nextPageButton) {

    nextPageButton.addEventListener("click", function() {

        showScrapPage(currentScrapPage + 1);

    });

}


if (prevPageButton) {

    prevPageButton.addEventListener("click", function() {

        showScrapPage(currentScrapPage - 1);

    });

}


// Scrapbook dots
scrapbookDots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        showScrapPage(index);

    });

});


// Keyboard
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {
        showScrapPage(currentScrapPage + 1);
    }

    if (event.key === "ArrowLeft") {
        showScrapPage(currentScrapPage - 1);
    }

});


// Start scrapbook
showScrapPage(0);
```
