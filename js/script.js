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

/* ============================== smooth scroll animation ============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* ============================== hamburger animation ============================ */
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const headerNav = document.querySelector('.header-nav');

    mobileMenuToggle.addEventListener('click', function() {
        headerNav.classList.toggle('active');
    });
});

/* ============================== morph animation ============================ */
const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
        "# Hello.",
        "# Hola.",
        "# 您好.",
        "# Bonjour.",
        "# Guten Tag.",
        "# Salve.",
        "# こんにちは.",
        "# 안녕하세요.",
        "# olá.",
        "# Namaste.",
        "# Ciao.",
        "# G'day.",
        "# Salam.",
        "# Ahoy."
];

const morphTime = 1;
const cooldownTime = 3;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();

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
