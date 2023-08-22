/* ============================== typing animation ============================ */
var typed = new Typed(".typing",{
    strings:["","a Computer Science Student", "a Computer hardware enthusiast", "a hobbyist programmer", "a potential internship candidate"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
})

/* ============================== language animation ============================ */
const helloText = document.getElementById("hello-text");
const languages = [
  "Hola.",
  "Bonjour.",
  "Guten Tag.",
  "Salve.",
  "您好.",
  "こんにちは.",
  "안녕하세요.",
  "olá.",
  "namaste.",
];

let currentIndex = 0;

function cycleLanguages() {
  helloText.textContent = languages[currentIndex];
  currentIndex = (currentIndex + 1) % languages.length;
}

setInterval(cycleLanguages, 2000);
