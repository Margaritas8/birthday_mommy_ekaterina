/* ================================================= */
/* ОТКРЫТИЕ КОНВЕРТА */
/* ================================================= */

const openButton = document.getElementById("openInvitation");
const envelope = document.querySelector(".envelope");
const invitation = document.getElementById("invitation");

if (openButton) {

    openButton.addEventListener("click", () => {

        envelope.classList.add("open");

        setTimeout(() => {

            document.body.classList.add("fade-transition");

        }, 650);

        setTimeout(() => {

            invitation.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }, 1000);

        setTimeout(() => {

            document.body.classList.remove("fade-transition");

        }, 1700);

    });

}

/* ================================================= */
/* ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ */
/* ================================================= */

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

},

{

    threshold:0.15

}

);

sections.forEach(section => {

    observer.observe(section);

});
/* ================================================= */
/* ТАЙМЕР */
/* ================================================= */

const eventDate = new Date("2026-08-22T16:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = eventDate - now;

    if(distance <= 0){

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(

        (distance % (1000 * 60 * 60 * 24))

        / (1000 * 60 * 60)

    );

    const minutes = Math.floor(

        (distance % (1000 * 60 * 60))

        / (1000 * 60)

    );

    const seconds = Math.floor(

        (distance % (1000 * 60))

        / 1000

    );

    document.getElementById("days").textContent =
        String(days).padStart(2,"0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2,"0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2,"0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);

/* ================================================= */
/* ПРОСМОТР ФОТО НА ВЕСЬ ЭКРАН */
/* ================================================= */

const galleryImages = document.querySelectorAll(

".memory-gallery img, .mood-board img"

);

galleryImages.forEach(image=>{

    image.addEventListener("click",()=>{

        const overlay =
        document.createElement("div");

        overlay.className="image-overlay";

        const bigImage =
        document.createElement("img");

        bigImage.src=image.src;

        bigImage.alt=image.alt;

        overlay.appendChild(bigImage);

        document.body.appendChild(overlay);

        overlay.addEventListener("click",()=>{

            overlay.remove();

        });

    });

});

/* ================================================= */
/* ПЛАВНАЯ ПРОКРУТКА */
/* ================================================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener("click",function(e){

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
/* ================================================= */
/* SUPABASE */
/* ================================================= */

const SUPABASE_URL = "https://ftjmteemqzzzblxcxamp.supabase.co";

const SUPABASE_ANON_KEY =
"sb_publishable_o-OKGT3xpOO6VjJg2bLAZQ_PAZzqpho";

const supabaseClient = supabase.createClient(

    SUPABASE_URL,

    SUPABASE_ANON_KEY

);

/* ================================================= */
/* ФОРМА RSVP */
/* ================================================= */

const form = document.getElementById("guestForm");

const modal = document.getElementById("successModal");

const closeModal = document.getElementById("closeModal");

if(form){

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const name =
    document.getElementById("name").value.trim();

    const attendance =
    document.querySelector(
    'input[name="attendance"]:checked'
    )?.value;

    const comment =
    document.getElementById("comment").value.trim();

    if(!name || !attendance){

        alert("Пожалуйста, заполните обязательные поля.");

        return;

    }

    const { error } = await supabaseClient

    .from("guests")

    .insert([{

    name: name,

    answer: attendance,

    comment: comment

}]);

    if(error){

        console.error(error);

        alert("Не удалось отправить ответ. Попробуйте ещё раз.");

        return;

    }

    form.reset();

    modal.classList.add("active");

});

}

/* ================================================= */
/* ЗАКРЫТЬ ОКНО */
/* ================================================= */

if(closeModal){

closeModal.addEventListener("click",()=>{

    modal.classList.remove("active");

});

}

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("active");

    }

});

/* ================================================= */
/* ESC */
/* ================================================= */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        modal.classList.remove("active");

    }

});