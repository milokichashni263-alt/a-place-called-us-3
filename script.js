const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");

const container = document.querySelector(".container");
const welcomeScreen = document.getElementById("welcomeScreen");
const homePage = document.getElementById("homePage");

const correctPassword = "081929";


unlockButton.addEventListener("click", unlock);


passwordInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        unlock();
    }
});


function unlock(){

    if(passwordInput.value === correctPassword){

        // hide password page
        container.style.display = "none";


        // show welcome screen
        welcomeScreen.classList.add("show");


        // move to home page after welcome
        setTimeout(function(){

            welcomeScreen.classList.remove("show");

            homePage.classList.add("show");

        },2500);


    }

    else{

        passwordInput.animate(
        [
            {transform:"translateX(-8px)"},
            {transform:"translateX(8px)"},
            {transform:"translateX(-8px)"},
            {transform:"translateX(8px)"},
            {transform:"translateX(0px)"}
        ],
        {
            duration:350
        });


        passwordInput.value="";
        passwordInput.placeholder="Wrong password ♡";

    }

}
