
```javascript
// =========================
// PASSWORD
// =========================

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

        container.style.display = "none";

        welcomeScreen.classList.add("show");

        if (backgroundMusic) {
            backgroundMusic.play().catch(function () {
                console.log("Music could not autoplay.");
            });
        }

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
// QUIZ OPTIONS
// =========================

document.querySelectorAll(".quiz-option").forEach(function (option) {

    option.addEventListener("click", function () {

        const question =
            option.closest(".quiz-question");

        if (!question) return;


        // Remove old selection
        question.querySelectorAll(".quiz-option").forEach(function (item) {
            item.classList.remove("selected");
        });


        // Select clicked option
        option.classList.add("selected");


        // Feedback
        const feedback =
            question.querySelector(".quiz-feedback");

        if (!feedback) return;


        const questionNumber =
            question.dataset.question;


        // Question 5 has no correct answer
        if (questionNumber === "5") {

            feedback.textContent =
                "Interesting choice... 👀";

            return;
        }


        // Other questions
        if (option.dataset.correct === "true") {

            feedback.textContent =
                "Okayyy, you actually know me. 🤍";

        } else {

            feedback.textContent =
                "Hmm... we might have to discuss this one. 😭";
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


        // Check MCQ
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


        // Hide current
        current.classList.remove("active");


        // Next question
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


        // Show result
        const result =
            document.querySelector(".quiz-result");


        if (result) {

            result.classList.add("show");

        }

    });

}
