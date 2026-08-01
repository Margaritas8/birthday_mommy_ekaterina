/* ==========================================
   SUPABASE
========================================== */

const SUPABASE_URL = "https://ftjmteemqzzzblxcxamp.supabase.co";

const SUPABASE_KEY =
"sb_publishable_o-OKGT3xpOO6VjJg2bLAZQ_PAZzqpho";

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

if (envelope) {

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

}

/* ==========================================
   ТАЙМЕР
========================================== */

const targetDate =
new Date("2026-08-22T16:00:00").getTime();

function updateTimer() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if (distance < 0) return;

    const days =
    Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
    Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );

    const minutes =
    Math.floor(
        (distance % (1000 * 60 * 60))
        /
        (1000 * 60)
    );

    const seconds =
    Math.floor(
        (distance % (1000 * 60))
        /
        1000
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
   ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ
========================================== */

const sections =
document.querySelectorAll("section");

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:0.15

}

);

sections.forEach(section=>{

observer.observe(section);

});
/* ==========================================
   ОТПРАВКА RSVP В SUPABASE
========================================== */

const guestForm = document.getElementById("guestForm");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

if (guestForm) {

    guestForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const attendance =
            document.querySelector(
                'input[name="attendance"]:checked'
            )?.value;

        const comment =
            document.getElementById("comment").value;

        const { error } =
        await supabaseClient
        .from("guests")
        .insert([{

            name: name,
            attendance: attendance,
            comment: comment

        }]);

        if (error) {

            alert("Произошла ошибка. Попробуйте ещё раз.");
            console.error(error);

            return;

        }

        successModal.classList.add("active");

        guestForm.reset();

    });

}

/* ==========================================
   ЗАКРЫТИЕ ОКНА
========================================== */

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
   УВЕЛИЧЕНИЕ ФОТОГРАФИЙ
========================================== */

const images = document.querySelectorAll(
    ".gallery img, .mood-board img"
);

images.forEach(image => {

    image.addEventListener("click", () => {

        const overlay =
        document.createElement("div");

        overlay.className = "image-overlay";

        const bigImage =
        document.createElement("img");

        bigImage.src = image.src;

        overlay.appendChild(bigImage);

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {

            overlay.remove();

        });

    });

});

/* ==========================================
   КНОПКА НАВЕРХ
========================================== */

const topButton =
document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "top-button";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("visible");

    } else {

        topButton.classList.remove("visible");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================
   ПЛАВНОЕ УВЕЛИЧЕНИЕ ФОТО
========================================== */

const moodImages =
document.querySelectorAll(
".gallery img, .mood-board img"
);

moodImages.forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform =
        "scale(1.05)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform =
        "scale(1)";

    });

});

/* ==========================================
   ПЛАВНАЯ ПРОКРУТКА ПО САЙТУ
========================================== */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});