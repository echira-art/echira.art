const wrapper = document.querySelector(".support-chibi-wrapper");

const hearts = [
    "images/hearts/heart1.svg",
    "images/hearts/heart2.svg",
    "images/hearts/heart3.svg",
    "images/hearts/heart4.svg",
    "images/hearts/heart5.svg"
];

wrapper.addEventListener("mouseenter", () => {

    const amount = Math.floor(Math.random() * 3) + 2;

    for(let i = 0; i < amount; i++){

        createHeart();

    }

});

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart-particle";

    const img = document.createElement("img");

    img.src = hearts[Math.floor(Math.random()*hearts.length)];

    heart.appendChild(img);

    const size = 22 + Math.random()*18;

    heart.style.width = size + "px";
    heart.style.height = size + "px";

    heart.style.left = (40 + Math.random()*260) + "px";
    heart.style.top = (20 + Math.random()*250) + "px";

    heart.style.setProperty(
        "--drift",
        (Math.random()*80-40)+"px"
    );

    heart.style.setProperty(
        "--rotate",
        (Math.random()*60-30)+"deg"
    );

    wrapper.appendChild(heart);

    heart.addEventListener("animationend", () => {

        heart.remove();

    });

}

const heroButton = document.querySelector(".hero-button");
const orderSection = document.querySelector("#order");

heroButton.addEventListener("click", (e) => {

    e.preventDefault();

    orderSection.scrollIntoView({
        behavior: "smooth"
    });

    history.replaceState(null, "", window.location.pathname);

});

// ---------- Scroll Reveal ----------

document.querySelectorAll("section, footer").forEach(section => {

    const reveals = section.querySelectorAll(".reveal");

    reveals.forEach((item, index) => {

        item.style.transitionDelay = `${index * 120}ms`;

    });

});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting){

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.2
});

reveals.forEach(item => observer.observe(item));

// ---------- Back To Top ----------

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});

// ---------- Price Image Modal ----------

const priceCard = document.querySelector(".price-card");
const imageModal = document.querySelector(".image-modal");
const closeModal = document.querySelector(".close-modal");

priceCard.addEventListener("click", () => {

    imageModal.classList.add("show");

});

closeModal.addEventListener("click", () => {

    imageModal.classList.remove("show");

});

imageModal.addEventListener("click", (e) => {

    if(e.target === imageModal){

        imageModal.classList.remove("show");

    }

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        imageModal.classList.remove("show");

    }

});

// ---------- Loader ----------

const loader = document.querySelector(".loader");
const loaderImage = document.querySelector(".loader-chibi");
const loaderText = document.querySelector(".loader-text");
const main = document.querySelector("main");

const loaderScenes = [

    {
        image:"images/loader/sleep.png",
        text:"Waking up..."
    },

    {
        image:"images/loader/coffee.png",
        text:"Brewing inspiration..."
    },

    {
        image:"images/loader/work.png",
        text:"Preparing your artwork..."
    },

    {
        image:"images/loader/finish.png",
        text:"Adding the finishing touches..."
    },

    {
        image:"images/loader/burrito.png",
        text:"One cozy moment..."
    }

];

// Welcome screen only once per browser session

if(!sessionStorage.getItem("visited")){

    loaderImage.src = "images/loader/welcome.png";
    loaderText.textContent = "Ready! Welcome! 💙";

    sessionStorage.setItem("visited","true");

}else{

    const scene =
        loaderScenes[
            Math.floor(Math.random()*loaderScenes.length)
        ];

    loaderImage.src = scene.image;
    loaderText.textContent = scene.text;

}

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

        main.style.opacity = "1";

    },1000 + Math.random()*400);

});

// ---------- Hero Mouse Parallax ----------

const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

hero.addEventListener("mousemove", (e) => {

    const rect = hero.getBoundingClientRect();

    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 12;

});

hero.addEventListener("mouseleave", () => {

    mouseX = 0;
    mouseY = 0;

});

function animateHero() {

    // Smooth interpolation
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    heroImage.style.transform = `
        translate(${currentX}px, ${currentY}px)
        rotate(${currentX * 0.3}deg)
    `;

    requestAnimationFrame(animateHero);

}

requestAnimationFrame(animateHero);