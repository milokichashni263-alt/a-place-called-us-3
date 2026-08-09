```javascript
const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");

const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");

const backgroundMusic = document.getElementById("backgroundMusic");

const correctPassword = "081929";

unlockButton.addEventListener("click", unlock);

passwordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        unlock();
    }
});

function unlock() {

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


/* =========================
QUIZ
HOW WELL DO YOU KNOW MALAI
========================= */

const quizQuestions = document.querySelectorAll(".quiz-question");

const nextButtons = document.querySelectorAll(".next-question");

const finishButton = document.querySelector(".finish-quiz");

let currentQuestion = 0;


/* =========================
OPTION QUESTIONS
========================= */

document.querySelectorAll(".quiz-option").forEach(function (option) {

    option.addEventListener("click", function () {

        const question = option.closest(".quiz-question");

        if (!question) return;

        // Remove previous selection
        question.querySelectorAll(".quiz-option").forEach(function (item) {
            item.classList.remove("selected");
        });

        // Select clicked answer
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


/* =========================
NEXT BUTTONS
========================= */

nextButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const current =
            quizQuestions[currentQuestion];

        const selected =
            current.querySelector(".quiz-option");

        const input =
            current.querySelector(".quiz-answer");


        // For multiple choice questions
        if (selected) {

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


        // For written answer questions
        if (input) {

            if (input.value.trim() === "") {

                const feedback =
                    current.querySelector(".quiz-feedback");

                if (feedback) {

                    feedback.textContent =
                        "Excuse me... answer the question. 👀";

                }

                return;

            }

        }


        // Move to next question
        current.classList.remove("active");

        currentQuestion++;

        if (quizQuestions[currentQuestion]) {

            quizQuestions[currentQuestion]
                .classList.add("active");

        }

    });

});


/* =========================
FINISH QUIZ
========================= */

if (finishButton) {

    finishButton.addEventListener("click", function () {

        const current =
            quizQuestions[currentQuestion];

        const input =
            current.querySelector(".quiz-answer");


        if (input && input.value.trim() === "") {

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
```
