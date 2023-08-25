/* ============================== typing animation ============================ */
var typed = new Typed(".typing",{
    strings:["","a Computer Science Student", "a Computer hardware enthusiast", "a hobbyist programmer", "a potential internship candidate"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
})

/* ============================== button animation ============================ */
var backToTopButton = document.getElementById("back-to-top-button");
var isScrolling = false;

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}

function handleScroll() {
    if (window.scrollY >= 200) {
        backToTopButton.style.display = "block";
        backToTopButton.style.animationName = "fadeIn";
    } else {
        backToTopButton.style.animationName = "fadeOut";
        setTimeout(function() {
            backToTopButton.style.display = "none";
        }, 300);
    }
}

window.addEventListener("scroll", debounce(function() {
    if (!isScrolling) {
        handleScroll();
        isScrolling = true;
        setTimeout(function() {
            isScrolling = false;
        }, 20); // Adjust the timeout value as needed
    }
}, 20)); // Adjust the debounce time as needed

backToTopButton.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================== language animation ============================ */
// document.addEventListener("DOMContentLoaded", function() {
//     const greetings = [
//         "Hola.",
//         "您好.",
//         "Bonjour.",
//         "Guten Tag.",
//         "Salve.",
//         "こんにちは.",
//         "안녕하세요.",
//         "olá.",
//         "Namaste.",
//         "Ciao.",
//         "G'day.",
//         "Salam.",
//         "Ahoy."
//     ];

//     const greetingElement = document.getElementById("greeting");
//     let index = 0;

//     function changeGreeting() {
//         greetingElement.textContent = greetings[index];
//         index = (index + 1) % greetings.length;
//     }

//     setInterval(changeGreeting, 5000);
// });
