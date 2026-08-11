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

    if (!passwordInput) {
        console.error("Password input not found");
        return;
    }

    if (!container) {
        console.error("Container not found");
        return;
    }

    if (!welcomeScreen) {
        console.error("Welcome screen not found");
        return;
    }

    if (!homePage) {
        console.error("Home page not found");
        return;
    }


    const enteredPassword = passwordInput.value.trim();

    console.log("Entered:", enteredPassword);


    if (enteredPassword === correctPassword) {

        console.log("PASSWORD CORRECT");


        // Hide password screen
        container.style.display = "none";


        // Show welcome screen
        welcomeScreen.classList.add("show");


        // Try music
        if (backgroundMusic) {

            backgroundMusic.currentTime = 0;

            backgroundMusic.play().catch(function(error) {
                console.log("Music autoplay blocked:", error);
            });

        }


        // Open home page
        setTimeout(function() {

            welcomeScreen.classList.remove("show");

            homePage.classList.add("show");

            window.scrollTo(0, 0);

        }, 2500);


    } else {

        console.log("PASSWORD WRONG");


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


        setTimeout(function() {

            passwordInput.placeholder =
                "Our little secret...";

        }, 2000);

    }

}


// =========================
// PASSWORD BUTTON
// =========================

if (unlockButton) {

    unlockButton.addEventListener("click", unlock);

}


// =========================
// ENTER KEY
// =========================

if (passwordInput) {

    passwordInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            unlock();

        }

    });

}


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


document.querySelectorAll(".quiz-option").forEach(function(option) {

    option.addEventListener("click", function() {

        const question =
            option.closest(".quiz-question");

        if (!question) return;


        question
            .querySelectorAll(".quiz-option")
            .forEach(function(item) {

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


nextButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const current =
            quizQuestions[currentQuestion];

        if (!current) return;


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

            quizQuestions[currentQuestion]
                .classList.add("active");

        }

    });

});


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
// OPEN WHEN LETTERS
// =========================

document.querySelectorAll(".open-letter").forEach(function(button) {

    button.addEventListener("click", function() {

        const card =
            button.closest(".open-card");

        if (!card) return;


        const content =
            card.querySelector(".open-content");

        if (!content) return;


        const alreadyOpen =
            content.classList.contains("letter-open");


        document
            .querySelectorAll(".open-content")
            .forEach(function(item) {

                item.classList.remove("letter-open");

            });


        document
            .querySelectorAll(".open-letter")
            .forEach(function(item) {

                item.textContent = "Open ♡";

            });


        if (!alreadyOpen) {

            content.classList.add("letter-open");

            button.textContent = "Close ♡";

        }

    });

});


// =========================
// SONG / SPOTIFY
// =========================

const spotifyLinks =
    document.querySelectorAll(
        'a[href*="spotify.com"], iframe[src*="spotify.com"]'
    );


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

    if (scrapbookPages.length === 0) {
        return;
    }


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

        prevPageButton.disabled =
            index === 0;

    }


    if (nextPageButton) {

        nextPageButton.disabled =
            index === scrapbookPages.length - 1;

    }

}


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


scrapbookDots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        showScrapPage(index);

    });

});


document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {

        showScrapPage(currentScrapPage + 1);

    }


    if (event.key === "ArrowLeft") {

        showScrapPage(currentScrapPage - 1);

    }

});


showScrapPage(0);
