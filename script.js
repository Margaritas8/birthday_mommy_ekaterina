// ===========================
// SUPABASE
// ===========================

const SUPABASE_URL = "https://ftjmteemqzzzblxcxamp.supabase.co";

const SUPABASE_KEY = "sb_publishable_o-OKGT3xpOO6VjJg2bLAZQ_PAZzqpho";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// ===============================
// ОТКРЫТИЕ ПРИГЛАШЕНИЯ
// ===============================

const envelope = document.getElementById("openEnvelope");
const invitation = document.getElementById("invitation");

if (envelope && invitation) {

    envelope.addEventListener("click", () => {

        invitation.classList.remove("hidden");

        setTimeout(() => {
            invitation.classList.add("visible");
        }, 100);

        invitation.scrollIntoView({
            behavior: "smooth"
        });

    });

}

// ===============================
// ТАЙМЕР
// ===============================

const eventDate = new Date("2026-08-22T16:00:00").getTime();

function updateTimer() {

    const now = new Date().getTime();

    const distance = eventDate - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateTimer();
setInterval(updateTimer, 1000);

// ===============================
// ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ
// ===============================

const sections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: 0.15

});

sections.forEach(section => {

    observer.observe(section);

});

// ===============================
// ФОРМА RSVP
// ===============================

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const name = document.getElementById("guestName").value;

    const answer =
        document.querySelector('input[name="answer"]:checked')?.value;

    const comment =
        document.getElementById("comment").value;

    const button = form.querySelector("button");

    button.disabled = true;
    button.textContent = "Отправляем...";

    const { error } = await supabase
        .from("guests")
        .insert([
            {
                name,
                answer,
                comment
            }
        ]);

    if(error){

        alert("Ошибка 😢\n\n" + error.message);

        console.log(error);

    }else{

        alert(
`Спасибо, ${name}! ❤️

Ваш ответ сохранён.`
        );

        form.reset();

    }

    button.disabled = false;
    button.textContent = "Отправить";

});
}

// ===============================
// ПЛАВНАЯ ПРОКРУТКА
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});
