const words = [
    "Web Developer",
    "Python Programmer",
    "UI Designer",
    "Computer Science Student"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const typing = document.getElementById("typing");
    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typing.textContent = currentWord.substring(0, charIndex);
        charIndex++;
    } else {
        typing.textContent = currentWord.substring(0, charIndex);
        charIndex--;
    }

    let speed = 120;

    if (!isDeleting && charIndex > currentWord.length) {
        isDeleting = true;
        speed = 1500;
    }

    if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();
// ================= DARK / LIGHT MODE =================

const themeButton = document.getElementById("theme-toggle");

if(themeButton){

themeButton.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        themeButton.innerHTML="☀️";
    }
    else{
        themeButton.innerHTML="🌙";
    }

});

}
// ================= SCROLL REVEAL =================


const revealElements = document.querySelectorAll(".reveal");


function revealOnScroll(){

    revealElements.forEach((element)=>{

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        const revealPoint = 100;


        if(elementTop < windowHeight - revealPoint){

            element.classList.add("active");

        }

    });

}


window.addEventListener("scroll", revealOnScroll);


revealOnScroll();