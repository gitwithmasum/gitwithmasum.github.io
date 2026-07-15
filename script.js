/* ==========================================
   Developer LinkHub
   Author : Masum Billah
========================================== */

// ==============================
// PAGE FADE-IN
// ==============================

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// ==============================
// BUTTON RIPPLE EFFECT
// ==============================

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const x = e.clientX - this.offsetLeft;
        const y = e.clientY - this.offsetTop;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

    });

});

// ==============================
// SCROLL REVEAL
// ==============================

const cards = document.querySelectorAll(".project-card");

const reveal = () => {

    const trigger = window.innerHeight * 0.85;

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < trigger) {

            card.classList.add("show");

        }

    });

};

window.addEventListener("scroll", reveal);

reveal();

// ==============================
// COPY EMAIL
// ==============================

const emailButton = document.querySelector('a[href^="mailto"]');

if (emailButton) {

    emailButton.addEventListener("contextmenu", (e) => {

        e.preventDefault();

        navigator.clipboard.writeText("masumtheinvincible@gmail.com");

        alert("Email copied!");

    });

}

// ==============================
// CURRENT YEAR
// ==============================

const footer = document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} Muhammad Masum Billah`;

}