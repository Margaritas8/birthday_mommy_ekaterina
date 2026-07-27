/* ==========================================
   НАСТРОЙКИ SUPABASE
========================================== */

const SUPABASE_URL = "https://ftjmteemqzzzblxcxamp.supabase.co";

const SUPABASE_KEY = "sb_publishable_o-OKGT3xpOO6VjJg2bLAZQ_PAZzqpho";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

/* ==========================================
   КОНВЕРТ
========================================== */

const envelope =
document.getElementById("envelope");

const invitation =
document.getElementById("invitation");

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

    setTimeout(() => {

        invitation.classList.remove("hidden");
        invitation.classList.add("show");

        invitation.scrollIntoView({
            behavior: "smooth"
        });

    }, 900);

});

/* ==========================================
   ТАЙМЕР
========================================== */

const targetDate =
new Date("2026-08-22T16:00:00").getTime();

function updateTimer() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }

    const days =
    Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
    Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes =
    Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds =
    Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent =
    String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}

updateTimer();

setInterval(updateTimer, 1000);
/* ==========================================
   МОДАЛЬНОЕ ОКНО
========================================== */

const successModal =
document.getElementById("successModal");

const closeModal =
document.getElementById("closeModal");

if (closeModal) {

    closeModal.addEventListener("click", () => {

        successModal.classList.remove("active");

    });

}

window.addEventListener("click", (event) => {

    if (event.target === successModal) {

        successModal.classList.remove("active");

    }

});

/* ==========================================
   ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ
========================================== */

const hiddenBlocks =
document.querySelectorAll("section");

const observer =
new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold:0.15

});

hiddenBlocks.forEach(section => {

    observer.observe(section);

});

/* ==========================================
   КНОПКА ВВЕРХ
========================================== */

             const topButton =
             document.createElement("button");

             topButton.innerHTML = "↑";

             topButton.className = "top-button";

             document.body.appendChild(topButton);

              window.addEventListener("scroll", () => {

             if (window.scrollY > 600) {

              topButton.classList.add("visible");

             } else {

              topButton.classList.remove("visible");

              }

               });

              topButton.addEventListener("click", () => {

             window.scrollTo({

                top:0,
 
                behavior:"smooth"

             });

});